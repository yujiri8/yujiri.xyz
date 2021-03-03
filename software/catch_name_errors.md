TITLE Why do all the dynamic languages catch name errors by default?
NAV Why do all the dynamic languages catch name errors by default?
DESC A name error is almost always a mistake, so why catch it by default?

For all my experience with the `try`-`catch` paradigm, I've *never* seen a situation where I wanted a *name error* in the `try` block to be caught. It's hard to imagine one. A name error is a typo 99% of the time, and a mistake 99% of the remainder. Catching it accidentally can lead to an especially frustrating debugging experience.

So why do *all* the dynamic languages have `catch` statements catch name errors by default?

Unlike Julia and [Javascript](https://yujiri.xyz/software/javascript), [Python](https://yujiri.xyz/software/python) and Ruby have real exception hierarchy systems and allow multiple `catch` clauses that catch different kinds. But both of them still include name errors in a bare `catch`.

And their designers obviously realized that there are some exceptions you don't usually want to catch, as they have a class you can catch that excludes other things in that category (like `KeyboardInterrupt`s): `StandardError` in Ruby, `Exception` in Python (with `BaseException` being the real progenitor). But for some reason both of them consider `NameError` a subclass of this!

Why do they do all this? And are there dynamic languages that don't?
