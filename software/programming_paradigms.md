TITLE An Overview of Programming Paradigms
NAV Programming paradigms
TEMPLATE DEFAULT
DESC A basic overview of different approaches to thinking about programming problems.

There are a lot of buzzwords in the programming industry describing approaches to how to write code. Of course, none of these paradigms are any specific way of solving any specific problem; they're extremely broad, general ways of thinking about problems. And not all of them are exclusive. The ones I talk about here aren't necessarily the only ones, just some commonly discussed ones that I've experienced.

# Procedural programming

Procedural programming means thinking about a program as a sequence of steps that completely describe what to do. In some sense, everything boils down to procedural programming because everything [gets compiled to processor instructions](programming) which are inherently procedural. But this way of thinking about programming, while it's sort of inherently true, isn't normally the best way to think about a complicated problem.

# Object-oriented programming

The idea of object-oriented programming, at least as I understand it (this one is by far the hardest to pin down), is to think about a program as a model of objects interacting. An object here is a data structure that represents something concrete; and a *class* is like a template for objects.

For example, to implement a typical [JPRG-like battle system](/game_design/ff13_interactive), you would have a Character class to represent a character in a battle. A Character object would have certain *attributes* or *fields*, like life, strength, mana; and certain *methods*, which are like procedures that are attached to a particular object because they deal with that object.

Depending on how your damage calculation works, the Character class might have a `take_damage` method that's called whenever they get attacked. This method would internally account for whatever resistances or on-hit effects the character might have. It might have a `start_round` method that would be called on every Character at the start of every round, which might do things like progress status effects toward wearing off, activate poison or regeneration effects, or whatever else needs to happen at the start of a turn.

There are a lot of potential benefits to thinking this way. One is that it helps keep everything related to a specific object clearly attached to that object. Code in the main battle loop would never have to worry about how damage is calculated, only about the steps of a round (get each character's action; then call the method for each one in sequence).

Object-oriented programming is the topic of some fierce debate, where a lot of people [think it's wonderful](https://www.roberthalf.com/blog/salaries-and-skills/4-advantages-of-object-oriented-programming) and [other people](https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53) think it's terrible. [I came to my ideas on it some time ago](oop).

# Event-driven programming

Event-driven programming is a way of thinking about programming that mainly applies to interactive applications. To understand it you kind of need to understand how procedural programming approaches such a thing.

If you were to write a program with a graphical interface, say something like a web application, in a procedural paradigm, you would have a loop that the program spent most of its time in. The loop would be basically, in pseudocode:
```
> Check if there's been any input from the mouse or keyboard or whatever input device.
> Get an "event" data structure describing that input.
> Look at the event, and see what action needs to happen based on it, if any.
> Take the necessary action.
> Update the display.
```
That's some extremely ugly logic to be all in the mainloop. Programs written like that quickly become hard to follow, and [that means hard to avoid bugs](readability).

Event-driven programming thinks about a user interface by making this "mainloop" a core concept instead of something you write manually. You set up the interface elements as objects or something, declare how each one should respond to input, and then call the mainloop function, which is just a single line from your code's perspective, and all the steps of the mainloop are encapsulated (hidden inside the opaque call to start the mainloop) so you don't have to think about them.

Event-driven programming is heavily beneficial in its intended arena because this is the natural way to think about that type of problem. The program's code is centered on describing the interface and how it behaves rather than every step of how that behavior is achieved. Usually you specify behavior with "callback" functions. For example you might have a `Button` object and you would define its `handleClick` method, which the mainloop calls whenever the button is clicked on.

By encapsulating the mainloop, event-driven programming can save you from having to worry about bugs like the display not updating or forgetting to pass a click event to the element that was clicked. If you're thinking about the internals of how the mainloop works, then you're doing it wrong.

[Javascript](javascript) is basically an event-driven language. Since it's intended specifically for interactive web applications, it's designed with that in mind, and so a lot of stuff is accomplished with `addEventListener` and stuff. In Javascript even calling the mainloop is implicit. The event loop runs in the user's browser and is started on page load. In a language that wasn't specifically designed for this, like if you're using [Python](python) or C with GTK (a GUI library that's both object-oriented and event-driven), you'll still be doing some procedural setup and calling the mainloop manually, but it can still be really helpful over doing this in a completely procedural way.

# Functional programming

Functional programming means thinking about code as a transformation of data rather than steps to be executed. In a pure functional language, like Haskell, you think about algorithms by describing the output you want in terms of the input, rather than directly describing how to produce it.

In functional programming, a function is a function in the mathematical sense - a formula for converting input to output and nothing more. Thus functions aren't allowed to change anything other than their return values or depend on anything other than their arguments. This can seem extremely limiting, but keeping as many things as deterministic as possible and the I/O and non-deterministic aspects as isolated as possible can go a long way toward making it easier to keep track of the logic and avoid bugs.

One example of functional programming is the `map`, `filter`, and `reduce` functions that a lot of languages have. If you wanted to take a list of items and apply some transformation to each of them, here's how you'd do it procedurally (I'll use Python as the example language, so that there won't be a red herring difference in verbosity):
```python
def get_sqroots(nums):
	sqroots = []
	for num im nums:
		sqroots.append(num ** 0.5)
	return sqroots
```
That's not bad, but if you're not used to this whole pattern of for loops and iterating it takes a second to figure out what's going on. We're building a new list and then adding in each new value. Despite how this is a task that really can and should be described in one thought, we're instead describing how we're getting there instead of just what we're achieving.

Here's a functional way of approaching the problem:
```python
def get_sqroots(nums):
	return map(lambda x: x ** 0.5, nums)
```
(If you don't know, `lambda` declares an anoymous function. `lambda x: x ** 0.5` is equivalent to writing the name of a function that takes `x` and returns `x ** 0.5`.) This means, "map each element in `nums` to the result of putting that num into this function, and return the resulting list". <span class="note">Technically Python's `map` returns a generator, which is a close to strictly better way of doing this; the exact parallel to the procedural `get_sqroots` would be `return list(map(lambda x: x ** 0.5, nums))`, or, written with the kickass generator expressions and comprehensions: `return [num ** 0.5 for num in nums]`.</span> So basically `map` is a generalized way of applying an arbitrary function to an arbitrary set of values.

`filter` is similar: you pass it a function and a sequence and it returns the sequence with only the elements for which the function returns `True`. And `reduce` is a function that accepts a function and a sequence and returns the sequence reduced to a single element by repeatedly applying the function. For example, if your language didn't have a built-in way to get the sum of a list of numbers but did have `reduce`, you could `reduce` the list with the `+` function. In Python this would look like `functools.reduce(lambda x, y: x+y, nums)`; Haskell could simplify the notation to (reduce is called `foldl` in Haskell and requires a default value) `foldl (+) 0 nums`.

A functional paradigm can be amazingly helpful for things that are easily described as a transformation of data. How pure functional languages deal with things like IO is [a far more complicated story](https://wiki.haskell.org/Introduction_to_IO), and one where you tend to end up wishing you weren't using a pure functional language.

# Declarative programming

Declarative programming is a paradigm closely related to functional programming in that in focuses on describing data and its relationships rather than steps to be executed. I'm not certain it's fair to say that the two are actually different, but I'd say functional programming is more about relationships between data and declarative programming is more about declaring data in a vacuum. Perhaps relatedly, functional programming tends to describe complete languages, but I've never heard a full programming language called declarative.

At any rate, HTML is an example of declarative progamming: it doesn't tell the browser what to do, it describes - declares - the content on the page. What would HTML be like if it were implemented imperatively?
```
document.add(header_element("My Document"))
container = create(div_element)
container.set_style("color", "green")
container.add(paragraph_element("Text goes here"))
container.add(link_element("Check out this cool website"))
document.add(container)
```
It would look something like that. Isn't that disgusting and unreadable?

And deep under the hood, some series of steps like this *is* getting executed, somewhere in the browser's rendering engine (which is probably written in C or C++). But this way the browser engine developers can focus on making a system that converts HTML to content on the screen correctly while webmasters can focus on writing HTML that just describes their content. No one has to actually write code that looks like the above.
