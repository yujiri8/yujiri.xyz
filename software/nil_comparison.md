TITLE Nil comparisons of software
NAV Nil comparisons
TEMPLATE DEFAULT
DESC When people write "comparisons" of two things that say nothing of substance about either one.

Something that annoys me is when people write "comparisons" of two things that are very good things to compare, that tell you nothing of substance about either one. An example I found recently is <a rel="nofollow" href="https://www.differencebetween.com/difference-between-ruby-and-vs-python/">differencebetween.com's article on Ruby vs Python</a>.

The article seems to be written for novices, so I'll forgive a couple of watered-down, extremely [questionable](https://yujiri.xyz/software/oop) statements like "OOP methodology is helpful to model a program or a set of programs using objects". The very first sentence is objectionable:

> Ruby and Python are high-level programming languages because they follow a syntax similar to the English Language.

High-level-ness has nothing to do with syntax; it refers to conceptual zoom level. A language that uses pointers, manual memory management, and barely has a built-in concept of arrays is low-level (or mid-level if we're including assembly in the spectrum). A language that has automatic memory management, first-class functions, built-in lists and dictionaries, and can reverse, map and filter them in one line is high-level. Perl and Javascript are both high-level languages whose syntax isn't remotely similar to English. If C used `and`, `or`, `not`, and `:` instead of `&&`, `||`, `!`, and `{...}`, it wouldn't make it any higher-level.

> The **key difference** between Ruby and Python is that **Ruby is mostly used for web development while Python is mostly used for a variety of applications including web development.** Python is also commonly used for scientific computing, data science applications, embedded systems and also as an academic programming language.

Putting aside that common use is not a difference between the languages at all but likely a consequence of what's actually different about them, saying "mostly used for..." and then an open-ended category ("a variety of applications including...") is pointless, especially if the example you list is the same one you said Ruby was mostly about. These two sentences should've read "Ruby is mostly used for web development while Python is used for other things as well, such as ...".

To their credit, they do allude to a couple of legitimate semantic differences, such as "Ruby defines closures using blocks. Closures have read and write access to variables from the outer scope", and they indirectly say that Python has tuples and Ruby doesn't.

But eventually they get to their "Side by Side Comparison - Ruby vs Python in Tabular Form":

> ## Ruby vs Python
>
> Ruby is a dynamic, object-oriented, reflective general purpose programming language.
>
> Python is an interpreted high-level programming language for general purpose programming.

These descriptions amount to exactly the same thing (when you fill in that Python is also object-oriented and reflective and Ruby is also high-level), but they're worded very differently which gives the impression that they're saying something different. Terrible considering how the article seems to be aimed at novices, who wouldn't be able to tell that these descriptions are identical.

> ### Designer
>
> Ruby was designed by Yukihiro Matsumoto.
>
> Python was designed by Guido van Rossum.

Nothing whatsoever to do with a comparison of the languages.

> ### File extension
>
> Ruby files are saved with. rb extension.
>
> Python files are saved with .py extension.

Nothing whatsoever to do with a comparison of the languages.

> ### Data Types
>
>Ruby has data types such as numbers, strings, arrays, hashes.
>
> Python has data types such as numbers, strings, lists, dictionaries, tuples.

Why list the ones they both have?!? You didn't write that they both have Booleans, so why write that they both have numbers and strings? At least this one mentions *some* meaningful difference.

> ### Switch/Case
>
> Ruby supports switch case statements.
>
> Python does not support switch case statements.

This is a legitimate difference! A very small one given the alternative of `elif` chains, but legitimate.

> ### Functions
>
> In Ruby, methods cannot be directly passed to a method. Instead, use Procs.
>
> Python supports functions. Functions can be passed to another function.

It sounds like commenting on this would require knowledge of Ruby I don't have, but I can say that it's meaningless without explaining what a Proc is.

> ### Add Modules
>
> Ruby uses the keyword require to add modules.
>
> Python uses the keyword import to add necessary modules.

Nobody cares!

> ### Anonymous Functions
>
> Ruby contains blocks, Procs and lambdas.
>
> Python contains lambdas.

Again, this one sounds meaningful, although it requires me to look up elsewhere what the difference is.

> ### Major Web Frameworks
>
> Ruby on Rails is a Ruby-based web framework.
>
> Django, Flask is Python-based web frameworks.

...

[The official Ruby website's comparison](https://www.ruby-lang.org/en/documentation/ruby-from-other-languages/to-ruby-from-python/) is similar and has some of the same non-points, but also several legitimate ones and doesn't weigh it down with many paragraphs of irrelevant introduction.

When I look up a comparison of two languages, I'm asking what the difference in ideology is. An excellent quote from Paul Graham is ["Languages are half technology and half religion"](http://www.paulgraham.com/avg.html). No one cares what the name of the import keyword is. How does the language think about problems?

I can't speak on Python vs Ruby because I don't know Ruby, but as an example, here are some meaningful comparisons between [Python](https://yujiri.xyz/software/python) and [Javascript](https://yujiri.xyz/software/javascript) (both dynamically typed interpreted languages, so like Python and Ruby they have more in common than not):

* Browsers execute Javascript.

* Relatedly, Javascript is designed around the concept of a single-threaded event loop. Python does also have the GIL that makes it effectively single-threaded for CPU-bound purposes, `async`, `await`, and the `asyncio` module, but the event loop isn't the primal, intrinsic concept it is in Javascript. For one example, Javascript doesn't even have a built-in equivalent to `time.sleep`, since that's a blocking operation, but you can implement one with `setTimeout` and promises.

* A lot of things that are runtime errors in Python are silent in Javascript, such as assigning past the end of an array or passing the wrong number of argments to a function. Javascript also does implicit type conversions in many cases that should be TypeErrors. (Let's be honest, there's absolutely no defending `[] - {}` being `NaN`.)

* Python has much better built-in support for common array operations: negative indexing, slice syntax, etc.

* Javascript's standard library is much weaker.

* Javascript has variable declarations (`const`, `let`, and `var`).

* Javascript has some handy functional programming facilities Python doesn't, particularly arrow functions.

* Python supports passing parameters by name.

* Python has comprehensions.

And I make no apology for being obviously non-neutral; these two [just aren't equally good](https://yujiri.xyz/software/objectivism).

The takeaway: if you ever write a comparison of two languages or tools, compare what actually matters, not the names of keywords and the file extensions!
