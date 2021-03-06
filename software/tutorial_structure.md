TITLE The right programming tutorial structure
NAV The right programming tutorial structure
DESC I've read a lot of programming tutorials and most I think teach their concepts in a very poorly-thought-out order.

I want to start a movement to more or less standardize the order of concepts in programming tutorials. I've read a lot of programming tutorials and most I think teach their concepts in a very poorly-thought-out order.

What prompted me to write this was reading [the D tutorial](https://tour.dlang.org/tour/en). They introduce pointers, array operations, and complex stuff about memory safety before *loops*. I found that quite jarring.

It'll be up to you to decide what to think of my ideas should you ever write a programming tutorial, but for your consideration I will propose these thoughts.

# Preliminary considerations

1. We should put easier concepts before harder ones to prevent discouragement and maximize learner retention.

2. We should order concepts so that the learner's ability to practically use the language increases as fast as possible.

	This doesn't necessarily mean putting the concepts used more often in the real world first. In particular, text input may not be used that often in the real world, but it's essential since it's the simplest form of interaction. My most common gripe with tutorials is that they defer this for too long. It's very discouraging for a newcomer (it was for me when I tried to learn Java as a young teen) to spend their first several hours of learning doing things that are literally better done on pencil and paper. What's the point of a program if it only solves one math problem you hard-coded in?

3. We should make lessons roughly equal in length and difficulty.

# Outline

To the above ends, I declare that the following loose outline should generally be followed:

1. Arithmetic, variables and IO
2. `if`/`else` and `while` (and `elif` and `do..while` if the language has them)
3. Sequence types, iterating and indexing and whatever else you can do with sequences
4. Functions
5. Exceptions (if it has them), file IO
6. The rest of the type system, be it classes and inheritance, structs and interfaces, generics and sum types and whatever else there is

Obviously, different languages have different concepts to teach, so adhering exactly to this won't make sense for every language. That outline was mostly geared toward higher-level languages. For a lower level language (particularly one with pointers) I'd suggest something more like:

1. Arithmetic, variables and IO
2. `if`/`else` and `while` (and `elif` and `do..while` if the language has them)
3. Functions
4. Whatever error/exception system there is
5. Pointers
6. Sequence types
7. Structs and the rest of the type system

[The Concise Python Tutorial](https://yujiri.xyz/software/pythontut1) (mine) follows the above outline for pointerless languages; tailored to Python, it came out as (it's meant specifically for those with no programming experience):

1. Arithmetic, variables, strings (including conversion), and IO
2. `if`, `else`, `elif`, all sorts of Boolean crap
3. Tuples, indexing, slicing, `in`, `len`, `for` (and how all this applies to strings), `break`/`continue`
4. Shared reference and mutability, lists and dicts; and methods of sequence types
5. Functions and imports
6. Exception crap and file IO
7. Classes
8. Generators, comprehensions, context managers, and other informal interfaces (this is as far as I've finished it)
9. Some discussion of real-world applications, and probably a preliminary dive with a GUI app using a toolkit like GTK, TCP chat server, or similar project

I thought it through carefully and I'm convinced it's a pretty good order, but hey, my tutorial's still lacking in feedback, so I'd much appreciate it if you'd go check it out. Especially if you're a beginner!

[The official Python tutorial](https://docs.python.org/3/tutorial/index.html) has a fairly similar structure to mine, but it's a bad move to introduce lists, indexing and slicing, the `end` parameter of `print`, and *raw strings* (seriously how often do we use those?) before the basic `if`/`else` structure. And worst of all they teach the source encoding directive before pretty much any actual code. That's a baffling decision for a tutorial whose intro suggests it's supposed to be for people new to programming.

The book that taught me, Michael Dawson's [Python Programming for the Absolute Beginner](https://www.amazon.com/Python-Programming-Absolute-Beginner-3rd/dp/1435455002), is also pretty similar to mine (I took some inspiration from it). I could make a few criticisms (comments and line continuations taught before variables, string methods before `if`), but it's a good book.

[Learn You A Haskell](http://learnyouahaskell.com/chapters) is a fairly good one (my only huge gripe is, again, how long it defers text input). As a pure functional language, Haskell is very different, so it goes like:

1. Arithmetic and Booleans (with the prompt); functions; `if`/`then`/`else`; lists (and a whole bunch of relatively advanced list crap, like comprehensions), then tuples
2. Types and typeclasses
3. Pattern matching, type signatures, guards and `case`, `where` and `let`
4. Recursion (which is critical because it's the only way to loop in Haskell)
5. Higher-order functions, currying, `map` and `filter`, lambdas, function composition
6. Modules and stdlib
7. Custom types and record syntax and classes, then Functor, kinds
8. Text IO (this isn't as essential in a language with an interactive mode, but it still should've been earlier); files and streams; randomness (which is a monster in a pure language!); bytestrings and exceptions
9. More about functors, applicatives, and monads (and monoids)
