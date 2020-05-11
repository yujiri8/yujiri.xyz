TITLE Python Review
NAV Review: Python
TEMPLATE DEFAULT
DESC Python is a good language. Plenty of flaws, but it's concise, has good error handling, and of course the interactive prompt.

# How Python and I met

I'm going to go on a pretty long tangent here. The first time I tried to learn programming, I was 10 and immature on top of having a bad teacher and the incredible misfortune of starting out with C++ in JGrasp on Windows. I enjoyed it at first but after the frustration of inscrutable error messages, my own lack of diligence, some arguments with my teacher about indentation and him giving me assignments I wasn't interested in, and never being able to see how the calculator and rock paper scissors programs I was writing could relate to anything practical, I quit.

Some time later, probably between 2 and 3 years, I tried again, this time with Java, using the BlueJ IDE. That lasted an even shorter time. Actually my memories are a bit blurred around this time period - I remember trying to learn Java on my own and lasting less than a week but also the same teacher trying to teach it to me, and getting far enough that we started working on a game we came up with called City Wars in the Netbeans IDE (but I still dropped it; we took on the project solely as a result of him being grossly overconfident in my abilities and doing 90% of the work because I couldn't understanding a thing he was doing). I'm not exactly sure how all that fits together; there might have been a few days or a year's gap between the two forays into Java.

Fast-forward to when I'm 15, my old teacher sent me a book: *Python Programming For The Absolute Beginner* by Michael Dawson. He told me I might like Python because "it does a lot *for* you". And lo and behold, was he right. Before long I had written a Hangman game and a Tic Tac Toe game almost completely on my own (and not too long after that [Pixeldodge](https://github.com/yujiri8/pixeldodge)) and grown to like Python far more than I ever had C++ or Java. Obviously this wasn't entirely the languages' fault; me being much older and more mature was also a big factor as was having a book specifically geared toward my sweet tooth of game programming. But to this day I feel a sense of allegiance to Python, since it was the third language to try to teach me programming and the first to succeed. And Python was the only one that had to do it almost entirely without human guidance (my teacher was no longer over my shoulder).

To this day I retain the belief that, at least of the languages I've seen, Python is the one true language for learning to program. Every other language is a vastly inferior gateway into the art. The two main reasons are the ability to use it interactively and the general lack of boilerplate, which I'll discuss at greater length.

---

<h1 class="good">The Interactive Prompt!</h1>

Interactive interpretation, is, obviously, a huge advantage. It lets you try things out on the fly to learn more about the language or check that something works the way you think it does without writing a file and running it and then removing it, and sometimes it can even be used to aid debugging by passing the `-i` flag when running a program, which gets you a prompt after the program exits with any names in it still defined (although the usefulness is limited by that only global names will be accessible, but this has really helped me in real-world use).

<h1 class="good">Conciseness</h1>

A lot of common tasks that take for loops or verbose idioms in other languages are zinging one-liners in Python.

* Sort a sequence: `sorted(seq)`, or `l.sort()` to sort a list in-place

* Reverse a sequence: `reversed(seq)`, or `l.reverse()`

* Insert into a list: `l.insert(index, item)`

* Delete an element from a list by value: `l.remove(item)`

* Delete an element from a list by index (and return it!): `l.pop(index)`

* Negative indices, slice steps? You got it. `l[-2:-6:-1]` (Though I've never once found an occasion to use slice steps.)

* Generic functions for finding the max or min value of a sequence of any type? `max()`, `min()`

* Read a line of console input? `entry = input(prompt)`

I don't know any other language that handles all these tasks as elegantly as Python. It also doesn't require you to define a "main" function, nor to import a couple of modules before you can do really anything at all (like [Go](go) does). And I'm not saying those latter two things are pointless bad design, but they make it harder to write a simple test program quickly, which is part of what makes Python such a great tutorial language and the interactive prompt so useful.

<h1 class="good">Beautiful error handling</h1>

Python gives you nice stack traces and line numbers on exceptions without you lifting a finger. The `finally` statement is convenient for making sure something gets executed on the way out, like closing a file. It's not quite as versatile as Go's defer statement since you can only use finally in the context of `try` ... `except`, but given how many orders of magnitude easier it is to get good tracebacks in Python, you really can't complain. No other langage I've seen makes error handling anywhere near this easy. 90% of the time you don't even have to think about errors. Usually what you'd do in Go or C is just throw the error anyway, so Python saves you a tremendous amount of time and boilerplate in favor of sensible default behavior.

<h2 class="good">Streamlined and readable syntax</h2>

Python's syntax is great for a lot of reasons.

* **Uses indentation to mark code blocks.** You always want to indent your code anyway in a language that uses braces, so why not just have the parser use that to tell where a block ends?

Another advantage besides the parsimony appeal is that in a language that relies on braces for this, error messages about brace mistakes frequently point to a line that isn't causing the problem. Those don't usually take more than a minute to track down but they're annoying, and in Python they're a lot less common because indentation not only is more visually apparent but leads to far better error messages when you get it wrong.

* **No semicolons and parentheses around conditions.** The reason I think `\` line continuation is better than semicolons is because line continuation is needed on a minority of lines, therefore it's better to need extra noise to continue lines than to need extra noise to end a line. As for parentheses around conditions, as far as I'm aware the argued benefit is that they make it possible to elide the braces for one-line blocks (as if that's even worth this cost), but Python's got that covered with colons and indentation.

* ***English.*** Python's boolean operators are `and`, `or`, and `not`, instead of the more traditional `&&`, `||`, and `!`. Humans read English, so a programming language that uses English words to express concepts that correspond easily to them is always going to be more readable. The faster you parse the characters on the screen as a logical concept, the more efficient you'll be. Especially the for loop: what alien in the universe would rather read `for (let i = 0; i < seq.length; i++) {` than `for elem in seq:`? The line literally says what it does instead of making you parse out three separate statements each full of non-English symbols. And if you want the counter explicitly you can do `for i, elem in enumerate(seq):`.

<h2 class="good">Generators and comprehensions</h2>

Generators and comprehensions are a pretty nifty pair of features with a lot of advantages. In a lot of ways they function like a more readable version of map/filter from functional languages (although Python also has those functions). For example:
```
l = [num*100 for num in range(10) if num % 2 == 0]
```
That's equivalent to:
```
l = list(map(lambda num: num*100, filter(lambda num: num % 2 == 0, range(10))))
```
Not only does the generator/comprehension implementation do both operations in one, but again the familiar English words *in* and *if* are more readable than "list... map... lambda... filter... lambda... wait what is this doing again?". And then that nauseating stack of parentheses that you'd probably miscount the first time and get a syntax error.

Generators are also *lazy evaluation*. Since they don't compute the entire thing up-front but just let you iterate over the sequence, you can use generators to deal with a large (or even infinite) sequence without storing it all in memory. (And in fact map and filter are both implemented as returning iterators in Python 3.) The end of [this article](https://www.programiz.com/python-programming/generator) shows a great example of how useful this can be.

There's also the `yield` keyword to easily turn a function into a generator.

In fact, I didn't find this out until recently but generators are actually coroutines. You can catch a return value from `yield` and use `gen.send()` on the calling end to feed it values. I haven't gotten to use this yet, but it sounds really cool.

<h2 class="good">Ecosystem</h2>

Python is such a popular language that you can pretty much always find a library that does anything you need. [The standard library](https://docs.python.org/3/library/index.html) itself is so extensive, CSV, JSON, HTTP, TLS, emails, regex, base64 and almost any other encoding you can think of are just a tiny fraction of what it can do out of the box. If somehow you need something that isn't there it's probably pre-packaged in standard repositories for your operating system. In the worst case it's available through [pip](https://pypi.org/project/pip), Python's package manager.

From what I can tell Python's `ctypes` module is also quite effective at interfacing with C code without native Python bindings. I haven't used it for much in practice, but I did play with it a little bit and it looks amazing.

---

Of course, there are also a lot of things I don't like about Python.

<h1 class="bad">Lack of type checking</h1>

Python doesn't do any checking that values are of the correct types, or even that a referenced name exists until you get to it. Did you accidentally pass `var` to a function when you meant to pass `[var]`? Have fun crashing at runtime when you get to that line. Did you pass the arguments to a function in the wrong order? Have fun crashing at runtime. Hell, did you even misspell a name? Have fun crashing at runtime once more and being told "name 'comprehnesion' is not defined" and staring at it for 15 seconds before realizing what's wrong. Oh, and have fun with that you only find out about one of these each time the program crashes. If you have multiple errors like this, you have to run the code multiple times to find out. God help you if you're writing a game like [Spacestation Defense](https://github.com/yujiri8/spacestation-defense) and the function you just added with all these mistakes takes 30 seconds or more of clicking through menus and playing out the first couple turns to get to after game start.

Worse, the lack of type checking tends to lead to much less helpful error messages. Python'll happily let you assign a tuple to an object attribute that's supposed to be a list and then later in some unrelated function tell you `'tuple' object does not support item assignment` with a stack trace that doesn't include the line that caused the problem. Even worse when it *never* crashes, but instead causes some bizarre functionality breakage; this kind of bug can take hours to track down in the worst cases.

When I was new to Python I actually loved the lack of type checking and argued that other languages were badly designed for enforcing types. "What if you need to have values of multiple types in a list, or a function that takes a single argument of multiple types?" I asked. But is there actually *ever* a legitimate use case for that kind of practice? After six years of Python experience, I'm not sure that there is. The only one I've ever found was using values of different types to convey different meanings about what to do with the value (I used this technique frequently in past versions of Spacestation Defense), for example when sending actions to `gamestate.playout`, if the value is a bool then it means to toggle whether the component is powered, and if it's a list then it's information about what action that component should take this round. But using the type as part of the value contradicts the whole idea of a type. That kind of solution is just a less clear alternative to a struct/dictionary-based approach (and I did end up converting it to that).

The only real exception I can think of is a list of ints with `None` as a valid value, but other languages with static typing have ways of accomplishing that. In Haskell for example you could use the `Maybe` monad. Then the type system would provide you this flexibility while still making sure you won't have any type errors at runtime. In C you could use a struct with fields `int value` and `bool valid` (or more probably a union; I haven't used unions in C yet but from what I understand they exist to solve this very problem).

Of course, it's not as if this shortcoming could be easily removed from Python by adding compile-time type checks, because Python doesn't have [any concept of interfaces](oop). It relies on this duck typing to not suffer a major loss of polymorphism.

<h2 class="bad">Performance</h2>

Being interpreted at run-time instead of pre-compiled, Python is pretty much always going to be much slower than a compiled language (I benchmarked it doing some repetitive math once and found it to be over 120x slower than Go). I think this is just an acceptable loss when you decide to make an interactively interpretable language, although Haskell has shown that it's possible to be both compilable to native code and interactively usable.

But Python's case is worse, because you can't really even make use of threading to overcome this - the Global Interpreter Lock only allows one thread to execute Python code at a time. So you can have one thread doing computation and many other threads waiting on IO at once, but if you want to actually use the parallel computing power of more than one core, you're going to have to use multiprocessing or something. And that's a mess.

And to be fair, I'm not saying the GIL is a mistake Guido Van Rossum made. I read a little bit some time ago about the reasons for implementing it and they seemed defendable, but this symptom is certainly a drawback.

Mitigating Python's performance limitations, (and this is why I made it an h2 heading) there does exist [PyPy](https://pypy.org), an alternative interpreter for the language (the standard one being [CPython](https://en.wikipedia.org/wiki/CPython)). PyPy runs a *lot* faster - within a reasonable factor of Go and C by my benchmarks - but it has some issues with compatibility; it [doesn't use reference counting in its garbage collection which can cause resource leak issues for some programs written for CPython](https://doc.pypy.org/en/latest/cpython_differences.html), and can't use certain modules for CPython that are actually written in C (I ran into this with [Pygame](https://www.pygame.org) when I was making Spacestation Defense). PyPy also isn't *always* faster; it uses [JIT compilation](https://en.wikipedia.org/wiki/Just-in-time_compilation) instead of being a true interpreter, so on short scripts that execute in less than a second anyway it can actually be slower. And that's a lot of what Python gets used for.

<h3 class="bad">Always needs the interpreter</h3>

As an ancillary drawback of being unable to compile, every Python program will always depend on having the Python interpreter (and the right version of it) installed to run it. While this isn't a big problem in practice since seemingly every operating system comes with Python installed these days or can easily install it from standard repositories, I still don't like it on principle. If I made a programming language (which I'd like to do someday but not sure if I ever will) I would make it not depend on being standard everywhere in order to run code without dependencies.

Having it be standard everywhere also doesn't completely fix the problem. When releasing [Doki Doki Literature Club](/reviews/ddlc) (which is built on Python > Pygame > [Renpy](renpy)) Dan ended up shipping the Python installation to get around version issues. On a Unix operating system your package manager would probably take care of that for you, but in a world dominated by Windows we can't count on there being such a thing.

<h3 class="bad">Working with timestamps is a mess</h3>

I've had the displeasure of working with timestamps in Python. It was a displeasure. There are several different ways of representing them:

* `os.stat` returns a `stat_result`, which has the file timestamps stored as massive floats of the seconds since the epoch.

* `datetime.datetime` is a class with eight constructor parameters: year, month, day, hour, minute, second, *microsecond*, and time zone (which can be `None`).

	To get a `datetime.datetime` from the `os.stat_result`, the function you need is `datetime.datetime.utcfromtimestamp`. Yes... not the class constructor, not a function in the module, a method *of the class*. That's not even what a *class is*... if you designed your *class* to be used as if it were an object itself, then I have to say I think you misunderstand the point of the concept.

* Then there's `time.struct_time`, which is returned by `time.gmtime` and expected as input to `time.mktime`, which converts either one of those or a tuple to a numeric timestamp. Don't ask me why both this and `datetime.datetime` need to exist.

* Times are also sometimes represented as tuples. `email.utils.parsedate`, which I used to parse HTTP `if-modified-since` before I found out about `email.utils.parsedate_to_timestamp`, returns a tuple of nine elements. After the year, month, day, hour, minute, and second, it returns `0`, `1`, and `-1`, seemingly regardless of the input and the `pydoc3.6` output for the function doesn't say anything on it. (It literally just says "Convert a time string to a time tuple.")

	Well if you go to [the online docs](https://docs.python.org/3/library/email.utils.html#email.utils.parsedate), it explains that "Note that indexes 6, 7, and 8 of the result tuple are not usable." Great documentation, guys! They're not usable? What do you mean? What do they even represent? Apparently *not* timezone, since `email.utils.parsedate_tz` exists and returns a 10th element that represents that?

	Also, there's `email.utils.parsedate` and `email.utils.parsedate_tz` and `email.utils.parsedate_to_datetime` but no `email.utils.parsedate_to_datetime_tz`? Why?

<h3 class="bad">Mutable default arguments</h3>

I debated about putting this on here, but I think it's a sufficiently crazy gotcha to be counted as a criticism that default arguments persist if they're mutable data structures. If you have a function with an argument that defaults to `[]`, and you call the function in such a way that it ends up modifying that list, the next time you call the function it'll default to the damn modified version. I can't see when this would ever be the desired behavior and it's extremely counter-intuitive. I ended up getting around it by having the arg actually default to None and then `if arg == None: arg = []`. That's a hacky solution.

And yes, I do know why this is the case (functions are objects), but that doesn't make it a good behavior or not extremely confusing for people who haven't run into that yet. And moreover it's possible to become quite proficient in Python without acquiring the understanding that functions are objects (I sure didn't until I'd been using it for a few years).

<h3 class="bad">Single versus double quotes - meaningless decision</h3>

Okay, this is a *really* small nitpick, I admit. But it bothers me to have two options that are functionally equivalent but neither is obviously better (single-quotes are easier to type but more likely to require escaping). It raises the question of "which one should I use?" and so I have to spend time making that decision every time I type a string. And the decision never really matters, but inconsistency in coding style bugs the hell out of me, as I believe it does out of most programmers, so I wish strings just had to use one or the other and the other would have a different meaning. It's not entirely obvious what; maybe single-quotes could be byte strings (instead of `b'text'` being the literal syntax for byte strings) and double-quotes could be Unicode strings? IDK. But this violates the [Zen of Python](https://www.python.org/dev/peps/pep-0020) principle that "There should be one-- and preferably only one --obvious way to do it."

<br>

---

<br>

So in conclusion, yes, I do think Python is a good language. Especially for learning, but by no means only for that. It's even still my favorite, although I wouldn't be surprised if Haskell overtakes that position once I learn more about it.