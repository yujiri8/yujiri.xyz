TITLE Including library code in stack traces
NAV Including library code in stack traces
TEMPLATE DEFAULT
DESC We're almost never interested in stack frames from libraries, so they shouldn't be shown the same way.

One thing that bothers me a lot in stack traces is when they include library code, even standard library, and treat it the same as my code. The least helpful stack trace is one that clutters the actually useful information with frames from the bowels of a dependency I have nothing to do with and that certainly aren't responsible for the problem.

I've found it particularly bad with Python web frameworks (though maybe I just haven't used frameworks in any other language with stack traces). Who wants to debug this:
```
Traceback (most recent call last):
  File "/usr/local/lib/python3.7/site-packages/pydantic/validators.py", line 570, in find_validators
    if issubclass(type_, val_type):
TypeError: issubclass() arg 1 must be a class

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/usr/local/lib/python3.7/site-packages/fastapi/utils.py", line 125, in create_response_field
    return response_field(field_info=field_info)
  File "/usr/local/lib/python3.7/site-packages/pydantic/fields.py", line 272, in __init__
    self.prepare()
  File "/usr/local/lib/python3.7/site-packages/pydantic/fields.py", line 370, in prepare
    self.populate_validators()
  File "/usr/local/lib/python3.7/site-packages/pydantic/fields.py", line 508, in populate_validators
    *(get_validators() if get_validators else list(find_validators(self.type_, self.model_config))),
  File "/usr/local/lib/python3.7/site-packages/pydantic/validators.py", line 579, in find_validators
    raise RuntimeError(f'error checking inheritance of {type_!r} (type: {display_as_type(type_)})')
RuntimeError: error checking inheritance of Header(default='', extra={}) (type: Header)

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "/usr/local/bin/uvicorn", line 10, in <module>
    sys.exit(main())
  File "/usr/local/lib/python3.7/site-packages/click/core.py", line 829, in __call__
    return self.main(*args, **kwargs)
  File "/usr/local/lib/python3.7/site-packages/click/core.py", line 782, in main
    rv = self.invoke(ctx)
  File "/usr/local/lib/python3.7/site-packages/click/core.py", line 1066, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "/usr/local/lib/python3.7/site-packages/click/core.py", line 610, in invoke
    return callback(*args, **kwargs)
  File "/usr/local/lib/python3.7/site-packages/uvicorn/main.py", line 331, in main
    run(**kwargs)
  File "/usr/local/lib/python3.7/site-packages/uvicorn/main.py", line 354, in run
    server.run()
  File "/usr/local/lib/python3.7/site-packages/uvicorn/main.py", line 382, in run
    loop.run_until_complete(self.serve(sockets=sockets))
  File "uvloop/loop.pyx", line 1456, in uvloop.loop.Loop.run_until_complete
  File "/usr/local/lib/python3.7/site-packages/uvicorn/main.py", line 389, in serve
    config.load()
  File "/usr/local/lib/python3.7/site-packages/uvicorn/config.py", line 288, in load
    self.loaded_app = import_from_string(self.app)
  File "/usr/local/lib/python3.7/site-packages/uvicorn/importer.py", line 20, in import_from_string
    module = importlib.import_module(module_str)
  File "/usr/local/lib/python3.7/importlib/__init__.py", line 127, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "<frozen importlib._bootstrap>", line 1006, in _gcd_import
  File "<frozen importlib._bootstrap>", line 983, in _find_and_load
  File "<frozen importlib._bootstrap>", line 967, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 677, in _load_unlocked
  File "<frozen importlib._bootstrap_external>", line 728, in exec_module
  File "<frozen importlib._bootstrap>", line 219, in _call_with_frames_removed
  File "./main.py", line 5, in <module>
    import db, comments, users, spem, util
  File "./comments.py", line 52, in <module>
    env = Depends(env),
  File "/usr/local/lib/python3.7/site-packages/fastapi/routing.py", line 539, in decorator
    callbacks=callbacks,
  File "/usr/local/lib/python3.7/site-packages/fastapi/routing.py", line 479, in add_api_route
    callbacks=callbacks,
  File "/usr/local/lib/python3.7/site-packages/fastapi/routing.py", line 370, in __init__
    self.dependant = get_dependant(path=self.path_format, call=self.endpoint)
  File "/usr/local/lib/python3.7/site-packages/fastapi/dependencies/utils.py", line 282, in get_dependant
    param=param, default_field_info=params.Query, param_name=param_name
  File "/usr/local/lib/python3.7/site-packages/fastapi/dependencies/utils.py", line 376, in get_param_field
      field_info=field_info,
    File "/usr/local/lib/python3.7/site-packages/fastapi/utils.py", line 130, in create_response_field
      f"Invalid args for response field! Hint: check that {type_} is a valid pydantic field type"
  fastapi.exceptions.FastAPIError: Invalid args for response field! Hint: check that default='' extra={} is a valid pydantic field type
```
There are two frames here that are my code, and neither of them is the problem.

(If you're interested, the problem was that my route's header paramaters were flagged with type annotations: `x_forwarded_for: Header('')` when it should've been `x_forwarded_for = Header('')`. [FastAPI](https://fastapi.tiangolo.com) uses reflection a lot in the form of looking at route handlers' argument defaults and type annotations to know what to pass them, but I forgot which was for which kind of parameter: type annotations are used for getting the `Response`, `Request`, and a few other things, but not for `Header`s or most other kinds of "individual" parameters. Hence the above completely useless error.

In Rust and Julia, stack traces include *even the standard library* by default. At least Python doesn't do that.

I understand that in theory this information *could* be useful (though it's never been to me), but there are better ways to provide information that's significantly less likely to be useful than other information.

1. Visually distinguish the library frames. If stderr is a terminal, color them differently. Otherwise, set them apart with whitespace and/or a clear separator. Still makes the output large, but much more readable.

2. Use a compile-time or interpreter flag. Improves readability more, but may run the risk of introducing bugs that depend on such settings.

A possible objection: how can the language distinguish library code from user code? I think it's fairly straightforward: if it's imported from library search folders, it's library code. If it's imported from places that wouldn't be searched if not for the location of the code being run, it's user code. The person writing the user code is almost never interested in stack frames from libraries.
