TITLE Python Review
NAV Review: Python
TEMPLATE DEFAULT
DESC Python is concise, streamlined, and has lots of powerful features. Its only real downside is the lack of type checking.

## How Python and I met

I'm going to go on a pretty long tangent here. The first time I tried to learn programming, I was 10 and immature on top of having a bad teacher and the incredible misfortune of starting out with C++ in JGrasp on Windows. I enjoyed it at first but after the frustration of inscrutable error messages, my own lack of diligence, some arguments with my teacher about indentation and him giving me assignments I wasn't interested in, and never being able to see how the calculator and rock paper scissors programs I was writing could relate to anything practical, I quit.

Some time later, probably between 2 and 3 years, I tried again, this time with Java, using the BlueJ IDE. That lasted an even shorter time. Actually my memories are a bit blurred around this time period - I remember trying to learn Java on my own and lasting less than a week but also the same teacher trying to teach it to me, and getting far enough that we started working on a game we came up with called City Wars in the Netbeans IDE (but I still dropped it; we took on the project solely as a result of him being grossly overconfident in my abilities and doing 90% of the work because I couldn't understanding a thing he was doing). I'm not exactly sure how all that fits together; there might have been a few days or a year's gap between the two forays into Java.

Fast-forward to when I'm 15, my old teacher sent me a book: *Python Programming For The Absolute Beginner* by Michael Dawson. He told me I might like Python because "it does a lot *for* you". And lo and behold, was he right. Before long I had written a Hangman game and a Tic Tac Toe game almost completely on my own (and not too long after that [Pixeldodge](https://github.com/yujiri8/pixeldodge)) and grown to like Python far more than I ever had C++ or Java.

Obviously this wasn't entirely the languages' fault; me being much older and more mature was also a big factor as was having a book specifically geared toward my sweet tooth of game programming. But to this day I feel a sense of allegiance to Python, since it was the third language to try to teach me programming and the first to succeed. And Python was the only one that had to do it almost entirely without human guidance (my teacher was no longer over my shoulder).

---

## Modes of use

Python is an interactive language with a REPL, but it goes a few extra miles. The `-i` flag to the interpreter makes it open the REPL after a program exits, which I've used for post-mortem debugging (although the usefulness is somewhat limited by that only global names are still in scope), and recent versions even have the `breakpoint` function that lets you *pause a running program and get an interactive shell inside it*.

## Type system

My only huge gripe with Python - and it's a huge one - is the total lack of type checking. It's costed me almost as much time and happiness as [Go's error handling](https://yujiri.xyz/software/go#error-handling), to a point that I can no longer believe dynamic typing is not the devil. Despite loving Python, I [don't think there are any major downsides of static typing if it's done right](https://dev.to/yujiri8/what-are-the-benefits-of-dynamic-typing-211).

It feels like a cruel taunt that Python has type annotations, but they don't do anything, not even at runtime (although libraries like Pydantic use them, it's not at all as if they solve the problem).

As a dynamic language though, Python has excellent metaprogramming facilities. All the operators use dunder methods, so you can give custom types behavior for `<`/`>`, `in`, indexing, iteration (generators are amazing!), you name it. There's basically no "magic" that only works for builtin types. Libraries like [Pydantic](https://pydantic-docs.helpmanual.io) and [SQLAlchemy](https://www.sqlalchemy.org) leverage these features to implement incredible stuff like syntactic suport for ORM queries and a vestige of runtime type-checking.

Class boilerplate is pretty bad with the basic way of implementing constructors: each attribute name has to be written three times (listed in the constructor parameters and then `self.field = field` in the body), inheritance is nasty if your subclass needs its own constructor (you have to invoke the parent's dunder method directly, which looks like a hack, and repeat the whole argument list), and you don't even get a sane `__repr__` implementation for free - objects will just print like `<MyClass object at 0x801434f50>` by default.

Luckily, `dataclasses.dataclass` comes to the rescue and cuts out all that boilerplate for two lines. It even lets you set non-zero default field values without any repetition!

I wish the community did a better job of teaching newcomes about dataclasses - I didn't know about them until I'd been using Python for about 5 years.

## Error handling

Python uses exceptions like most dynamic languages, but it has markedly better facilities for them than some others (Javascript and Julia): an exception hierarchy and multiple `except` clauses to catch different types, and the `finally` clause, which executes on the way out regardless of exceptions. `finally` is quite flexible as it can be used even without any `except` clauses (it just needs a `try`). There's also the fringe `else` clause which executes only if no exception was raised but still before `finally`.

An uncaught error comes with a full stack trace by default, with filenames, function names, line numbers, and the line text for each stack frame. It can be a bit verbose, but too much information is better than too little. I've never had a better time with error handling than with Python.

Pretty much my only dissatisfaction with Python's error handling is that `NameError` is a subtype of `Exception` instead of `BaseException`, meaning you can't [have an `except` clause that matches all "normal" error types but not typos](https://dev.to/yujiri8/why-do-all-the-dynamic-languages-catch-name-errors-by-default-5317). That's just stupid.

## Syntax

Python's syntax is great for a lot of reasons.

* **Uses indentation to mark code blocks.** You always want to indent code anyway in a brace language, so why not just have the parser use that to tell where a block ends?

	It's not just parsimony though, significant indentation leads to better error messages than braces. Error messages about brace mistakes frequently point to a line that isn't causing the problem. Those don't usually take more than a minute to track down, but they're annoying. Error messages about indentation mistakes usually point right to the line that needs to change and tell you explicitly that it's an indentation error.

* **No semicolons and parentheses around conditions.** The reason I think `\` line continuation is better than semicolons is because line continuation is needed on a minority of lines, therefore it's better to need extra noise to continue lines than to need extra noise to end a line. As for parentheses around conditions, as far as I'm aware the argued benefit is that they make it possible to elide the braces for one-line blocks (as if that's even worth this cost), but Python's got that covered with colons and indentation.

* _**English.**_ Python's boolean operators are `and`, `or`, and `not`, instead of `&&`, `||`, and `!`. Humans read English, so a language that uses English words for concepts that correspond easily to them is more readable. The faster we can parse the concept out of the characters on our screen, the more efficient we are. Especially the for loop: what alien in the universe would rather read `for (let i = 0; i < seq.length; i++) {` than `for elem in seq:`? The line literally says what it does instead of making you parse out three separate statements each full of non-English symbols. And if you want the counter you can do `for i, elem in enumerate(seq):`.

### String literal sugars

There are a lot of handy syntactic sugars that involve prefixing string literals with a letter.

* f-strings opt into interpolation: `f'text {var} text' == 'text' + str(var) + 'text'`. You can embed arbitrary expressions inside f-string braces, and they're automatically converted to strings, so they're quite powerful (though not quite as powerful as [Javascript template strings](https://yujiri.xyz/software/javascript#template-strings) because you can't embed loops).

* Raw strings let you opt out of interpreting escape sequences: `r'\n' == '\\n'`. These are extremely handy for regex.

* Bytes: `b'text'` makes a bytes object instead of a unicode string. This is more readable than the `bytes('text')` you'd have to do in some other languages.

### Keyword arguments

Another handy little feature that improves readability and plays well with default arguments:
```python
def func(arg1, arg2):
	print('arg1 is', arg1, 'and arg2 is', arg2)
func(arg2 = True, arg1 = False) # prints "arg1 is False and arg2 is True"
```
Keyword arguments provide the benefits of an argument dictionary (`func({'arg2': True, 'arg1': False})`) without the drawbacks: arguments attached to parameter names, order insignificant, parameters still listed in the function header (instead of `def func(args):`), and without the syntactic noise of braces and quotes.

### Generators and comprehensions

Generators and comprehensions are a pretty nifty pair of features with a lot of advantages. Generators provide *lazy evaluation* in a language that doesn't otherwise have it, so you can use generators to deal with a large or even infinite sequence without storing it all in memory. The end of [this article](https://www.programiz.com/python-programming/generator) shows a great example of how useful this can be. And they're trivial to write with the `yield` keyword.

Apparently, generators are actually coroutines. You can catch a return value from `yield` and use `gen.send()` on the calling end to feed it values. I haven't gotten to use this yet, but it sounds really cool.

The inline generator expressions and comprehensions are a fantastic innovation. In a lot of ways they function like a more readable version of map/filter (which are both implemented as returning iterators in Python 3). For example:
```python
l = [num*100 for num in range(10) if num % 2 == 0]
```
That's equivalent to:
```python
l = list(map(lambda num: num*100, filter(lambda num: num % 2 == 0, range(10))))
```
Not only does the comprehension do both operations in one, but again the familiar English words *in* and *if* are more readable than "list... map... lambda... filter... lambda... wait what is this doing again?". And then that nauseating stack of parentheses that you'd probably miscount the first time and get a syntax error. They also have [performance benefits over `map` and `filter`](https://dev.to/yujiri8/python-performance-benefits-of-generator-expressions-49od).

Now list comprehensions aren't that uncommon, but Python also has set and even dictionary comprehensions! I love refactoring some ugly ten-line block that builds a sequence imperatively into a single statement that almost reads like an English sentence.

## Sequence operations

Python has great built-in helpers for almost all common sequence type operations:

* Search a sequence: `seq.index(item)` (`item in seq` for just a Boolean test)

* Count occurrences: `seq.count(item)`

* Insert into a list: `l.insert(index, item)`

* Delete an element from a list by value: `l.remove(item)`

* Delete an element from a list by index (and return it!): `l.pop(index)`

* Negative indices, slice steps? You got it. `l[-2:-6:-1]` (Though I've never once found an occasion to use slice steps.)

* Reverse a sequence: `reversed(seq)`, or `l.reverse()`

* Sort a sequence: `sorted(seq)`, or `l.sort()` to sort a list in-place

* Find the max or min value of a sequence of any type? `max()`, `min()`

I don't know any other language that has all of these.

## Concurrency

Python has serious problems with concurrency that compound the performance drawbacks of interpretation. Asynchronous IO is not bad, but you actually *can't* do parallel processing even with native threads, because the Global Interpreter Lock only allows one thread to execute Python code at a time. The only way around it is to stoop to multiprocessing or something.

Mitigating performance issues, there exists [PyPy](https://pypy.org), an alternative interpreter for the language (the standard one being [CPython](https://en.wikipedia.org/wiki/CPython)). PyPy runs a *lot* faster - within a reasonable factor of statically compiled languages, and [pypy-stm](https://doc.pypy.org/en/latest/stm.html) is an attempt (I'm not sure about its current status). But PyPy has some compatibility issues: it [doesn't use reference counting in its garbage collection which can cause resource leaks for some programs written for CPython](https://doc.pypy.org/en/latest/cpython_differences.html), and can't use certain modules that are actually written in C (like [Pygame](https://www.pygame.org), and therefore [Renpy](https://yujiri.xyz/software/renpy)). It's also a pain because CPython and PyPy have separate module search paths, etc.

PyPy also isn't *always* faster; it uses [JIT compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) instead of being a true interpreter, so on short scripts that execute in less than a second anyway it can actually be slower.

## Resource management

Python's main solution for resource management is the context manager interface and the `with` keyword that uses it. The most common example is with files:
```python
with open(filename) as f:
	# Use the file
# ...
```
The file is automatically closed when the `with` block exits, even if an exception's thrown.

And this isn't just a special case for builtin types - you can implement the interface on custom types, or as a function with [`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html).

## Tooling

There are lots of code analysis tools, but nothing outstanding. There's [mypy](http://www.mypy-lang.org) as a TypeScript-like solution, but the same drawbacks of it not being part of the language apply. I've tried about 8 different linters, all of which were terrible. They all either output primarily noise about how inlining single-line `if` statements is evil and that I should have *2* blank lines after a class definition, or there are some cases where they insist on doing awful things like reformatting `a = b = c`-type statements into some bizarre multiline parenthesis-fest that was almost certainly a bug (that was Black, the one with no configuration). So despite loving linters, I still don't have a Python linter I use.

## Documentation

Python has great online documentation and a solid CLI tool. But the documentation you get from `pydoc` isn't the same as the online docs and is often incomplete. The most common deficiency I've seen is not making argument types clear, without which of course I don't know how to call the function.

## Stdlib and ecosystem

Python has an enormous community that's written good libraries for everything. [The standard library](https://docs.python.org/3/library/index.html) itself is so extensive, CSV, JSON, HTTP, TLS, emails, regex, base64, and archive formats are just a tiny fraction of what it can do out of the box. If somehow you need something that isn't there, there's guaranteed to be a package for it on [PyPI](https://pypi.org).

From what I can tell Python's `ctypes` module is also quite effective at interfacing with C code without native Python bindings. I haven't used it for anything serious, but I did play with it a little bit and it looks amazing.

---

<br>

My overall opinion is that Python is an excellent language. Especially for learning, but by no means only for that. It deserves its popularity... something I don't say of many other things.
