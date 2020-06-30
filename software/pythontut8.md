TITLE The Concise Python Tutorial, part 8: Extras
NAV The Concise Python Tutorial, part 8: Extras
TEMPLATE DEFAULT
MARKDOWN
DESC Learn some of the amazing features Python offers and how they're implemented.

[Previous lesson: Classes](pythontut7)

Well, you've basically got all the core concepts of Python now. For this penultimate chapter, I'm going to go through a couple of less central, but extremely useful things that wouldn't really have made sense without understanding objects first.

# Generators

Generators are one of the most awesome applications of what I taught about classes in part 7. I use them every day I write Python. What they do is basically allow you to work with sequences without computing up-front exactly what's in the sequence. Instead, it's like iterating on a list but each element in the list is only computed when you ask for it. They're useful for dealing with huge amounts of data without using too much memory, and can even work with *infinite* sequences!

To really understand how generators work, it's useful to understand how iteration really works under the hood. Between all the things you can iterate on - tuples, lists, strings, dicts - there's a common interface or protocol, called *iterable*. An iterable is anything that has an `__iter__` method that returns an *iterator*. An *iterator* in turn is something that has a `__next__` method that returns the next item.

To see how all sequence types implement these, check this out (`iter` and `next` are builtin functions that call the `__iter__` and `__next__` methods, just for readability):
```
>>> nums = [4, 5, 6]
>>> # List are iterables. That means I can get an iterator from them.
>>> iterator = iter(nums)
>>> next(iterator)
4
>>> next(iterator)
5
>>> next(iterator)
6
>>> next(iterator)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```
It's almost like using a `for` loop, isn't it?

Yes. That is how for loops work. When I write `for num in nums:`, what's really happening is the above, with the one difference that the `for` loop automatically catches that `StopIteration` exception and silences it.

And that's why you can use `for` to iterate on all these different types. They all implement an `__iter__` method that returns a sort of transient object called an iterator which in turns implements a `__next__` method that gives the items in sequence.

With this knowledge... you could actually make your own iterable types. You could make a custom class that wasn't a subclass of tuple, list, or anything else and make it possible to iterate on it with `for`.

About the difference between an iterator and an iterable: an iteratable is something you can get an iterator out of. A list is *not* an iterator. Each time you loop over the list with `for`, you're making a new list iterator thingy that gives you the list elements in sequence. One thing that makes this confusing is that iterators *also* implement the `__iter__` method that returns an iterator - they just have it return themselves, for compatibility.

So back to generators. Generators are basically a special kind of iterator defined with the `yield` keyword, which lets you turn a function directly into a generator without the trouble of defining a class and both methods. Here's a demo of `yield`:
```
def first_5_nums():
	num = 0
	while num < 5:
		yield num
		num += 1
```
It kind of looks like `yield` is similar to `return` except it doesn't end the function, eh? Indeed that's pretty much how it works:
```
>>> generator = first_5_nums()
>>> next(generator)
0
>>> next(generator)
1
>>> next(generator)
2
>>> next(generator)
3
>>> next(generator)
4
>>> next(generator)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```
So to convert this to the `for` syntax:
```
>>> for num in first_5_nums():
>>>  print(num)
0
1
2
3
4
>>>
```
So what's the benefit of using `yield` instead of building a list and returning `[0, 1, 2, 3, 4]`? The benefit, of course, is that the generator doesn't compute the whole list up-front. Imagine you wanted to iterate on a series of a billion items. It'd be bad if you had to create the whole list up-front, as that would take a lot of memory and your CPU might stall the program for a while to compute all that. Better to use only one number at a time and compute them as needed. Another benefit is that if it turned out you only needed the first few, you wouldn't have to compute the remaining billion.

The builtin function `range` is basically my `first_5_nums`, but more general since you can tell it how many numbers:
```
>>> for x in range(10): print(x)
0
1
2
3
4
5
6
7
8
9
```
As you can see, `range` is handy for cases where you want to do something a specified number of times, but not necessarily iterate over a sequence while you do it.

Some python tutorials teach `range` a lot sooner than I did, but I chose to put it off because it looks like it returns a list of numbers, but it doesn't - it returns a generator - and I didn't want to introduce a function that relied on generators before introducing generators.

Another handy built-in generator function, similar to `range`, is `enumerate`:
```
>>> for i, word in enumerate(('hello', 'goodbye', 'nevermind')):
...   print('word #' + str(i), 'is', word)
...
word #0 is hello
word #1 is goodbye
word #2 is nevermind
```
See how that works? `enumerate` took the tuple I passed it, iterated on the tuple, and yielded each element as a tuple containing the index it was at and the element itself. We've actually run into situations already where this would've been helpful: my Tic Tac Toe solution could've benefitted from it.

As an exercise, try implementing a function that generates [the fibonacci sequence](https://www.mathsisfun.com/numbers/fibonacci-sequence.html). It should keep going for as long as the program keeps iterating on it - theoretically generating an infinite sequence.

<expand-note closedtext="Show solution" opentext="Hide solution">

```
def fibonacci():
	current = (0, 1)
	while True:
		yield current[0]
		current = (current[1], current[0] + current[1])
```

</expand-note>

Generators are actually even more powerful that this: [they're coroutines](https://book.pythontips.com/en/latest/coroutines.html), and you can actually pass data in the other direction too (but I've honestly never used that in all my years of Python).

# Generator expressions and comprehensions

Python's generator *expressions* and comprehensions are another badass application of generators, but I think they're easier to grasp if we first go through a couple of features that are mostly outmoded by them.

## `lambda`

`lambda` is a keyword that defines an anonymous function. What they can do is limited - only return something - but here's an example:
```
>>> double = lambda x: x * 2
>>> double(6)
12
```
Lambdas are occasionally handy when you have a function that expects a function as an argument. Naturally, the main thing they're made for is...

## `map` and `filter`

`map` and `filter` are two functions that a lot of languages have for working with sequences.

* `map` takes a function and a sequence, calls the function on each element in the sequence, and returns a new sequence of the return values.

* `filter` takes a function and a sequence, calls the function on each element, and returns a new sequence of only the elements where the function returned a truthy value.

Well, actually, `map` and `filter` don't deal with sequences directly in Python, they take iterables and return generators so they can be more widely applicable. You can use them like this:
```
>>> nums = range(1, 10) # With two args, range starts at the first one and stops just before the second one.
>>> for num in map(lambda n: n ** 2, nums):
...  print(num)
1
4
9
16
25
36
49
64
81
```
And `filter` works like this:
```
>>> for num in map(lambda n: n > 5, range(1, 10)):
...  print(num)
6
7
8
9
```
So generator expressions basically improve on this by accomplishing the same tasks as `map` and `filter`, but being more readable. A generator expression version of `map(lambda n: n ** 2, nums)` would be `(n ** 2 for n in nums)`. The two are identical, but the generator expression uses English words instead of Greek words.

You can put an `if` clause in the generator expression too: the filter equivalent would be `(n for n in nums if n > 5)`. Admittedly, generators don't look as superior with `filter` as they do with `map` since you still have to write `for n in`. But the other great thing about generator expressions is you can do both in one. Imagine you wanted . Here are the two ways:
```
map(lambda n: n ** 2, filter(lambda n: n > 5, nums))
# Or...
(n ** 2 for n in nums if n > 5)
```
Take your pick.

I also mentioned *comprehensions* at the start of this section, and I left them for second because I think it's more intuitive to learn generator expressions first. A comprehension is basically a generator expression that eagerly evaluates the whole thing into a real sequence type. Here's an example of a list comprehension:
```
[n ** 2 for n in nums if n > 5]
```
It's the same thing as the generator above except you get a list. Despite the benefit of the "lazy evaluation" that generators provide, sometimes it's more convenient to just get a list.

There are comprehensions for some other types too! Sets and --

Oh wait, I haven't actually talked about sets yet have I? Short detour here.

Python features a "set" type which is like a list but can't have duplicates and the order of its elements doesn't matter - so it's a set in the mathematical sense. The constructor for them is called `set` and their literal syntax is just like lists, except they use `{` and `}` instead of `[` and `]`. (There's no *empty* set literal because `{}` is the empty dict literal; to make an empty set you can just use `set()`.)

With that out of the way, here are some comprehensions like the above that build a set or dict instead of a list:
```
{n ** 2 for n in nums if n > 5} # set
{n: n ** 2 for n in nums if n > 5} # dict. This one stores the original number as the key and its square as the value.
```
There aren't tuple comprehensions because the parenthesis syntax is used for generator expressions. But you can turn any iterable, including a generator, into a tuple by just passing it to the `tuple` constructor.

# Context managers

Context manager is another interface, like generators. They come in handy when you have something you need done at the end of a block regardless of how it exits. For example, you know how you're supposed to close files after reading or writing them? Files are context managers, so the keyword that takes advantage of the context manager interface, `with`, can make dealing with files easier:
```
with open('text.txt') as f:
	contents = f.read()
# more code...
```
That's all it takes - the file will be automatially closed after the `with` block.

The way it works is:

1. The expression you give `with` (in this case `open('text.txt')`) becomes the "context manager", and its `__enter__` method is invoked. If you put an `as` clause, the return value from `__enter__` is assigned to the name you give it.

2. The block is executed (in this case `contents = f.read()`).

3. The context manager's `__exit__` method is invoked. For file objects, that method calls `close`.

SQL database connections are another thing that usually implements the context manager interface. You can learn more about context managers and how to implement your own [here](https://book.pythontips.com/en/latest/context_managers.html).

# Bytes

We haven't dealt with the `bytes` type yet. In Python, strings are [unicode](https://www.smashingmagazine.com/2012/06/all-about-unicode-utf8-character-sets/) by default, as they're meant for representing text, not binary data. You'll get an error if you try to read the contents of a non-text file (like an image). To accomplish that, you need to know about `bytes`, which is a type that's basically the same as `str` except it's meant for dealing with binary data.

The syntax for bytes literals is putting `b` before the quote. `b'hello' is the same as 'hello'` excepts it's bytes instead of string. For converting between bytes and string, you can use `bytes.decode` and `str.encode`:
```
>>> text = 'hello'
>>> binary = b'hello'
>>> text == binary.decode('utf8') # The parameter specifies the character encoding. You want utf8 unless you know what you're doing.
True
>>> binary == text.encode('utf8')
True
```

Note that `open` by default returns its file objects in such a way that you read strings from them. To open a binary file and read bytes, you need to use the mode parameter (which I remind you is `r` by default for 'read'). `open(filename, 'rb')` opens the file in *binary read* mode, where it's open for reading but Python won't try to interpret the bytes in the file as text.

Fun fact: in Python 2, bytes was the default type of string literals. You had to use `u'hello'` to get a unicode string.

# f-strings

Another useful string feature is "f-strings", which can make concatenation with variables more readable. For example, if you want to say "My name is ..." and you're not passing it to `print` so you can't use the variadic argument feature, you would write `"My name is" + name`. With f-strings, you could write `f"My name is {name}"`. Prefixing the string literal with `f` makes brace expressions inside the quotes get evaluated as Python expressions instead of literal text.

This can be pretty useful with more complex examples, especially since it does the type conversion automatically: `f'The first number is {n1} and the second number is {n2}'` is certainly nicer than `'The first number is ' + str(n1) + ' and the second number is ' + str(n2)`.

# Raw strings

You can prefix a string's opening quote with `r` to make a "raw" string, which doesn't interpret backslash escapes. `r'\n' == '\\n'`. This is most useful with regular expressions.

# Conditional expressions (inline `if`/`else`)

Imagine you have a block like:
```
if cond: first_arg = 1
else: first_arg = 2
func(var, second_arg, third_arg, fourth_arg, fifth_arg)
```
and you thought it was too long and wished you could shorten it. Well, you can. There's actually a way to put that `if`/`else` expression *in* the function call - you don't even need a variable. Here's how it's done:
```
func(1 if cond else 2, second_arg, third_arg, fourth_arg, fifth_arg)
```
The expression `1 if cond else 2` evaluates to 1 if `cond`, and else, it's `2`. Admittedly it's kinda confusing because in the normal form of Python conditionals, the result when the condition is true comes *after* the if, whereas with inline conditionals it goes before. But this is good to know.

# Decorators

Decorators let you wrap a function with another one. To illustrate what I mean, let's say I have three functions called `func1`, `func2`, and `func3`, and I want to make each one of them do something before and after it executes. But I don't want to put the code inside each one. One thing I could do without decorators is:
```
# Accepts a bare function and returns it with the setup and exit code wrapped around it.
def funcwrapper(func):
	# Use the variadic argument and variadic keyword arguments
	# placeholder to make sure all arguments are passed through.
	def newfunc(*args, **kwargs):
		print("Entering a function")
		func(*args, **kwargs)
		print("Exiting a function")
	return newfunc

func1 = funcwrapper(func1)
func2 = funcwrapper(func2)
func3 = funcwrapper(func3)
```
Decorators are syntactic sugar for this. With a decorator, I would go to the places the functions are defined and put `@funcwrapper` before them:
```
@funcwrapper
def func1():
	# func1 code
# Et cetera
```
By just adding that `@funcwrapper`, `func1`'s definition would be replaced with the `newfunc` returned from calling `funcwrapper` with `func1` as its argument.

This wasn't a very interesting demo, but there's a lot you can do with decorators. One useful decorator in the standard library is [`contextlib.contextmanager`](https://docs.python.org/3/library/contextlib.html).

# Type annotations and reflection

Type annotations are a way of specifying what the type of a variable should be, although Python won't enforce it. For example:
```
# Why would you want such a useless function?
def increment(num: int):
	return num + 1
```
That `: int` part is the type annotation, and tells us that the function `increment` expects `num` to be an `int`. But Python still doesn't complain if you pass a different type. So what's even the point of this? Well the point is that we can build on it using some features that would be classified as [**reflection**](https://en.wikipedia.org/wiki/Reflection_(computer_programming)). You've seen how we can use things like the `__dict__` attribute of objects to inspect their "insides". Type annotations are similarly discoverable:
```
# A pretty meaningless function
>>> def increment(num: int = 0):
...	 return num + 1
>>> increment.__annotations__
{'num': <class 'int'>}
>>> increment.__defaults__ # And while we're at it...
(0,)
```
Holy cool, right? You can find out the default values and type annotations of a function's parameters. There are a lot of Python libraries that make use of this in clever ways to implement features that are almost like new syntax. I'll mention one of them in a minute (one that's in fact the main reason I'm introducing type annotations). You can find out more about type annotations at [the official documentation for the `typing` module](https://docs.python.org/3/library/typing.html).

It's also worth knowing about the `dir` builtin function, which tells you all the attributes something has. Try out `dir('')` or `dir(str)` to see what methods strings have that I haven't told you about.

`dir()`, no arguments, tells you all the names defined in the current scope.

# Dataclasses

Dataclasses are a thing in the standard library module `dataclasses` that helps reduce the boilerplate of declaring classes by making the dunder methods (the `__...__` ones like `__init__` and `__str__`) automatically. They're pretty awesome, and a good explanation is avilable [over at realpython](https://realpython.com/python-data-classes/).

# Pydoc and docstrings

This is the last thing. `pydoc` is a command-line tool for viewing Python documentation, so you don't always have to resort to Google. You can run `pydoc open` to get documentation on the `open` function. You can also access it from the Python prompt by typing `help(open)`.

It's even better than that - pydoc can generate equivalent documentation on *your* code. It's not referencing pre-written docuentation, it's actually autogenerating it from looking at the sources. To see documentation on a file called `test.py`, for example, run `pydoc(test)` in the folder or import it and then `help(test)`.

Pydoc will save your life.

There's one other thing you need to know about it though: it uses *docstrings* to generate the documentation. Docstrings are something I've left until now because there's no real point to them outside of pydoc, but they're a different kind of comment meant for generating documentation. They're written as triple-quoted strings at the beginning of a function or class. You won't get much on a function defined like:
```
# Takes a number and doubles it.
def f(num): return num * 2
```
But if you define it like:
```
def f(num):
	"""Takes a number and doubles it."""
	return num * 2
```
Then you'll see that help text in pydoc.

Some of the info you see in pydoc has to do with super advanced stuff about how Python's memory management works under the hood (like the `__weakref__` attribute it usually lists on classes), so feel free to ignore things you don't understand. It also makes use of type annotations, and a feature I haven't explored: you know how function arguments can be passed positionally or by name? Well, they decided there should be a way to define a function so that certain parameters *must* to be passed by position and certain ones *must* be passed by name. I think it's a questionable feature, but you'll see the syntax in pydoc, and the spec for it is [PEP 570](https://www.python.org/dev/peps/pep-0570/#syntax-and-semantics).

---

Well.

With all those concepts down, The Concise Python Tutorial is just about over. There's tons of stuff I haven't taught. There's tons of stuff I don't know. But these 8 chapters have gone through pretty much everything you need to pick up the rest as you go. Go forth and use Python.

I am planning to make a part 9 still, because I realize it's probably dissatisfying to someone who came into Python the way I did, that we haven't left the command-line all this time. Leaving it before this chapter would've been a terrible idea, I think. But now is a good time. So at some point I'll hopefully post a part 9 where I walk the reader through some non-CLI projects, like a GUI app, a chat server, and something that uses the general CLI interfaces like standard streams and command-line arguments.
