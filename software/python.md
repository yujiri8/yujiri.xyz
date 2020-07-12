TITLE Python Review
NAV Review: Python
TEMPLATE DEFAULT
DESC Python is concise, streamlined, and has lots of powerful features. Its only real downside is the lack of type checking.

# How Python and I met

I'm going to go on a pretty long tangent here. The first time I tried to learn programming, I was 10 and immature on top of having a bad teacher and the incredible misfortune of starting out with C++ in JGrasp on Windows. I enjoyed it at first but after the frustration of inscrutable error messages, my own lack of diligence, some arguments with my teacher about indentation and him giving me assignments I wasn't interested in, and never being able to see how the calculator and rock paper scissors programs I was writing could relate to anything practical, I quit.

Some time later, probably between 2 and 3 years, I tried again, this time with Java, using the BlueJ IDE. That lasted an even shorter time. Actually my memories are a bit blurred around this time period - I remember trying to learn Java on my own and lasting less than a week but also the same teacher trying to teach it to me, and getting far enough that we started working on a game we came up with called City Wars in the Netbeans IDE (but I still dropped it; we took on the project solely as a result of him being grossly overconfident in my abilities and doing 90% of the work because I couldn't understanding a thing he was doing). I'm not exactly sure how all that fits together; there might have been a few days or a year's gap between the two forays into Java.

Fast-forward to when I'm 15, my old teacher sent me a book: *Python Programming For The Absolute Beginner* by Michael Dawson. He told me I might like Python because "it does a lot *for* you". And lo and behold, was he right. Before long I had written a Hangman game and a Tic Tac Toe game almost completely on my own (and not too long after that [Pixeldodge](https://github.com/yujiri8/pixeldodge)) and grown to like Python far more than I ever had C++ or Java.

Obviously this wasn't entirely the languages' fault; me being much older and more mature was also a big factor as was having a book specifically geared toward my sweet tooth of game programming. But to this day I feel a sense of allegiance to Python, since it was the third language to try to teach me programming and the first to succeed. And Python was the only one that had to do it almost entirely without human guidance (my teacher was no longer over my shoulder).

To this day I retain the belief that, at least of the languages I've seen, Python is the one true language for learning to program. Every other language is a vastly inferior gateway into the art. The two main reasons are the ability to use it interactively and the general lack of boilerplate.

---

<h1 class="good">Conciseness</h1>

A lot of common tasks that take for loops or verbose idioms in other languages are zinging one-liners in Python, especially sequence operations. Here are a few examples:

* Search a sequence: `seq.index(item)`

* Count occurrences: `seq.count(item)`

* Insert into a list: `l.insert(index, item)`

* Delete an element from a list by value: `l.remove(item)`

* Delete an element from a list by index (and return it!): `l.pop(index)`

* Negative indices, slice steps? You got it. `l[-2:-6:-1]` (Though I've never once found an occasion to use slice steps.)

* Reverse a sequence: `reversed(seq)`, or `l.reverse()`

* Sort a sequence: `sorted(seq)`, or `l.sort()` to sort a list in-place

* Find the max or min value of a sequence of any type? `max()`, `min()`

* Read a line of console input? `entry = input(prompt)`

I used to think Python's class declarations were very crufty, what with having to write each field name three times and not getting even getting a sane `__repr__` implementation for free. But then I found out about `dataclasses.dataclass`, a stdlib decorator that can save you from all that for just 2 lines. The result is almost as compact as a C or Go struct definition, and allows for non-zero default values!

<h2 class="good">Streamlined and readable syntax</h2>

Python's syntax is great for a lot of reasons.

* **Uses indentation to mark code blocks.** You always want to indent your code anyway in a language that uses braces, so why not just have the parser use that to tell where a block ends?

	It's not just parsimony though, significant indentation leads to better error messages than braces. Error messages about brace mistakes frequently point to a line that isn't causing the problem. Those don't usually take more than a minute to track down, but they're annoying. Error messages about indentation mistakes usually point right to the line that needs to change and tell you exactly what's wrong.

* **No semicolons and parentheses around conditions.** The reason I think `\` line continuation is better than semicolons is because line continuation is needed on a minority of lines, therefore it's better to need extra noise to continue lines than to need extra noise to end a line. As for parentheses around conditions, as far as I'm aware the argued benefit is that they make it possible to elide the braces for one-line blocks (as if that's even worth the cost), but Python's got that covered with colons and indentation.

* _**English.**_ Python's boolean operators are `and`, `or`, and `not`, instead of the traditional `&&`, `||`, and `!`. Humans read English, so a language that uses English words for concepts that correspond easily to them is more readable. The faster we can parse the concept out of the characters on our screen, the more efficient we are. Especially the for loop: what alien in the universe would rather read `for (let i = 0; i < seq.length; i++) {` than `for elem in seq:`? The line literally says what it does instead of making you parse out three separate statements each full of non-English symbols. And if you want the counter explicitly you can do `for i, elem in enumerate(seq):`.

<h2 class="good">Generators and comprehensions</h2>

Generators and comprehensions are a pretty nifty pair of features with a lot of advantages. Generators provide *lazy evaluation* in a language that doesn't otherwise have it, so you can use generators to deal with a large or even infinite sequence without storing it all in memory. The end of [this article](https://www.programiz.com/python-programming/generator) shows a great example of how useful this can be. And they're trivial to write with the `yield` keyword.

Apparently, generators are actually coroutines. You can catch a return value from `yield` and use `gen.send()` on the calling end to feed it values. I haven't gotten to use this yet, but it sounds really cool.

The inline generator expressions and comprehensions are a fantastic innovation. In a lot of ways they function like a more readable version of map/filter (which are both implemented as returning iterators in Python 3). For example:
```
l = [num*100 for num in range(10) if num % 2 == 0]
```
That's equivalent to:
```
l = list(map(lambda num: num*100, filter(lambda num: num % 2 == 0, range(10))))
```
Not only does the comprehension do both operations in one, but again the familiar English words *in* and *if* are more readable than "list... map... lambda... filter... lambda... wait what is this doing again?". And then that nauseating stack of parentheses that you'd probably miscount the first time and get a syntax error. They also have [performance benefits over `map` and `filter`](https://dev.to/yujiri8/python-performance-benefits-of-generator-expressions-49od).

Now list comprehensions aren't that uncommon, but Python also has set and even dictionary comprehensions! I love refactoring some ugly ten-line block that builds a sequence imperatively into a single statement that almost reads like an English sentence.

<h2 class="good">Ecosystem</h2>

There's pretty much noting Python doesn't have libraries for. [The standard library](https://docs.python.org/3/library/index.html) itself is so extensive, CSV, JSON, HTTP, TLS, emails, regex, and base64 and almost any other encoding you can think of are just a tiny fraction of what it can do out of the box. If somehow you need something that isn't there, there's almost certainly a package for it on [PyPI](https://pypi.org).

From what I can tell Python's `ctypes` module is also quite effective at interfacing with C code without native Python bindings. I haven't used it for anything serious, but I did play with it a little bit and it looks amazing.

<h2 class="good">Exception handling</h2>

Although I consider the basic concept of exceptions [a baseline feature](https://yujiri.xyz/software/lang_baseline), Python has extra handy facilities for dealing with them, including multiple `except` clauses for different exception types and the `finally` clause, which executes on the way out regardless of exceptions. `finally` is quite flexible as it can be used even without any `except` clauses (it just needs a `try`). There's also the fringe `else` clause which executes only if no exception was raised but still before `finally`.

<h3 class="good"><code>with</code></h3>

The `with` keyword and the context manager interface simplify resource cleanup. The most common example is with files:
```
with open(filename) as f:
	# Use the file
# ...
```
The file is automatically closed when the `with` block exits, even if an exception's thrown.

And this isn't just a special case for builtin types - it uses the context manager interface which you can implement on custom types, or as a function with [`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html).

<h3 class="good">String literal sugars</h3>

Python has a lot of handy syntactic sugars that involve prefixing string literals with a letter.

* f-strings opt into interpolation: `f'text {var} text' == 'text' + str(var) + 'text'`. You can embed arbitrary expressions inside f-string braces, and they're automatically converted to strings, so they're quite powerful (though not quite as powerful as [Javascript template strings](https://yujiri.xyz/software/javascript#template-strings-are-pretty-useful) because you can't embed loops).

* Raw strings let you opt out of interpreting escape sequences: `r'\n' == '\\n'`. These are extremely handy for regex.

* Bytes: `b'text'` makes a bytes object instead of a unicode string. This is more readable than the `bytes('text')` you'd have to do in some other languages.

<h3 class="good">Keyword arguments</h3>

Another handy little feature that improves readability and plays well with default arguments:
```
def func(arg1, arg2):
	print('arg1 is', arg1, 'and arg2 is', arg2)
func(arg2 = True, arg1 = False) # prints "arg1 is False and arg2 is True"
```
Keyword arguments provide the benefits of an argument dictionary (`func({'arg2': True, 'arg1': False})`) without the drawbacks: arguments attached to parameter names, order insignificant, parameters still listed in the function header (instead of `def func(args):`), and without the syntactic noise of braces and quotes.

<h3 class="good"><code>breakpoint</code></h3>

Python isn't just an interactive language (which I don't mention the pros or cons of because I don't think I need they need to be said on every language review); newer versions have the `breakpoint` function that lets you pause a running program and get an interactive shell inside it.

---

It's actually hard for me to come up with many criticisms of Python. There's only one thing that regularly annoys me, and that's something I actually expect from a language.

<qh1 class="bad">No type checking</h1>

Even with Python's above-average debugging experience, the lack of type checking has cost me almost as much time and happiness as [Go's error handling](https://yujiri.xyz/software/go#error-handling-is-verbose-tedious-and-mistake-prone).

It feels like a cruel taunt that Python has type annotations, but they don't do anything, not even at runtime (although libraries like Pydantic use them, it's not at all as if they solve the problem).

<h3 class="bad">Performance</h3>

It wouldn't be very interesting to criticize an interpreted language for not running as fast as compiled languages. That's part of [the deal](https://yujiri.xyz/software/interpret_vs_compile). But Python's case is worse, because you can't really even use threads to mitigate it: the Global Interpreter Lock only allows one thread to execute Python code at a time. So you can have one thread doing computation and many other threads waiting on IO at once, but if you want to actually use the parallel computing power of more than one core, you're going to have to use multiprocessing or something. And that's a mess.

And to be fair, I'm not saying the GIL is a mistake by Guido Van Rossum. I read a little bit about the reasons for implementing it and they seemed defendable, but this symptom is certainly a drawback.

Mitigating this, there exists [PyPy](https://pypy.org), an alternative interpreter for the language (the standard one being [CPython](https://en.wikipedia.org/wiki/CPython)). PyPy runs a *lot* faster - within a reasonable factor of Go and C by my benchmarks - but it has some issues with compatibility; it [doesn't use reference counting in its garbage collection which can cause resource leaks for some programs written for CPython](https://doc.pypy.org/en/latest/cpython_differences.html), and can't use certain modules for CPython that are actually written in C (like [Pygame](https://www.pygame.org), and therefore [Renpy](https://yujiri.xyz/software/renpy)). It's also a pain because CPython and PyPy have separate module search paths.

PyPy also isn't *always* faster; it uses [JIT compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) instead of being a true interpreter, so on short scripts that execute in less than a second anyway it can actually be slower.

---

<br>

I think Python is an excellent language; especially for learning, but by no means only for that. It deserves its popularity... something I don't say of many other things.
