TITLE The Concise Python Tutorial, part 7: Classes
NAV The Concise Python Tutorial, part 7: Classes
TEMPLATE DEFAULT
DESC Learn how to define classes in Python.

[Previous lesson: Exceptions and IO](pythontut6)

We've finally arrived at classes, the last remaining core concept of Python.

So you've seen the data types `int`, `float`, `bool`, `str`, `tuple`, `list`, `dict`, and finally file objects, which have their own set of methods. Each one has its own rules. A **class** is basically a custom data type you define and choose how it works.

The first use example I'll explore is a Rectangle. Let's say we're writing an application that does geometry calculations, or maybe some kind of physics game. We want a data type for rectangles. The plan is that each rectangle stores its `width` and `height`, and we can compute its `perimeter` and `area` with simple function calls. We also want a way to take two rectangles and find the smallest rectangle that encompasses both of them.

First, it would be good to consider how you'd do this without classes. There would be two main options: lists or dictionaries. For a list-based approach, you could use a list of `[width, height]` to represent each rectangle. `[5, 2]` would mean a rectangle 5 units wide and 2 tall. To calculate its perimeter, you would have a function named `perimeter` or someting that would take the rectangle as a parameter.

See any downsides of this approach? I can think of several:

1. The syntax for accessing a rectangle's width or height is not [very clear](https://yujiri.xyz/software/readability). If you wanted to get a rectangle's width, you would do `rect[0]`, but it's not obvious from looking at that code what it does; and if you ever forgot which element in the list was which, you could be in for a lot of debugging. It would be better if it looked like `rect.width`, but lists don't give us a way to make it as clear as that.

2. If rectangles themselves are modeled as lists, then what about lists of rectangles? Nested lists work fine, but they're prone to mistakes. Maybe you have a function somewhere that takes a list of rectangles and does `for rect in rectangles:` and you accidentally pass just a plain rectangle to it, forgetting to make it a one-item list by surrounding it with `[]`.

	Well, if rectangles themselves were rects, this would still work at first, since it would end up iterating *on the dimensions* of the one rectangle instead of on each rectangle. The worst possibility is that it might not crash, but do the wrong thing instead, and you'd be in for a frustrating debugging experience.

	Even if it did crash, the error message would probably not be very clear - if it tries to find the width of each rectangle in the list it's expecting with `rect[0]`, you would see `TypeError: 'int' object is not subscriptable` (because `rect` would be a width value and numbers can't be indexed (or 'subscripted')).

3. What if you decided each rectangle should store not only its dimensions but its position, or maybe a color or some other property? You would have to change the way you stored rectangles everywhere from `[width, height]` to `[width, height, x, y]` or something, and make sure nothing you'd already done depended on rectangles being only two elements. Even worse if you wanted to put the position numbers *before* the dimension numbers in the list, since that would mean changing the index numbers everywhere.

4. Consider how you'd implement another data type for triangles. You might store triangles as lists of `[side1, side2, side3]`. The function for getting a rectangle's perimeter couldn't just be named `perimeter` anymore, it would have to be named `rect_perimeter` or something to avoid confusion with `triangle_perimeter`.

	Worse, the only way to tell the difference between a rectangle and triangle would be the number of elements in the list, which is certainly not intuitive (and - see above - not robust either because it could be broken by other design changes you might make), and would require comemnts.

So storing rectangles as lists, while it would work, is obviously not a great approach.

The other approach you could do without classes is a dictionary-based one. You could represent rectangles like `{'width': 5, 'height': 2}`. The syntax is a bit clunkier: `rect['width']` instead of `rect[0]`. But it's clearer, and that's more important.

This would solve most of the problems above, but not all of them - you would still have the issue with naming the perimeter functions when you added more shapes later. That means any code that gets the perimeter of a shape would have to know what kind of shape it is... *or* you could just have the one `perimeter` function inspect what keys are in the shape dictionary to figure out which type it is, but that would still be clunky.

And since dicts can also be iterated with `for..in`, there's still the potential for very confusing errors if you had to deal with sequences of rectangles anywhere.

The solution of **classes** is very similar to the dictionary approach, but basically involves each rectangle *knowing* that it's a rectangle and having the `perimeter` function attached to it, and the triangles know they're triangles and have their own `perimeter` function attached, so code that needs the perimeter of a shape can just call `shape.perimeter()` and the shape itself would worry about how to calculate it. Here's the beginning of how we could define a `Rectangle` data type:
```
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
```
That `__init__` thing is a special function name; it's the `Rectangle` class's **constructor**, which is called whenever I make a new Rectangle. The first parameter, `self`, refers to the `Rectangle` being created. Let's see what happens when I make some Rectangles:
```
>>> r1 = Rectangle(5, 7)
>>> r1.width, r1.height
(5, 7)
>>> r2 = Rectangle(4, 2)
>>> r2.width, r2.height
(4, 2)
```
So I only actually pass 2 arguments. You'll see if you try to pass 3 that it tells you the function takes 3 but you're passing 4! The `self` parameter is implicit. You don't pass it manually, it's just a name for the `Rectangle` object in question.

So you can see that when you make an object (or *instance*) of a class, you basically treat the class name as if it were the name of a function. It kind of is. And that calls the constructor. `self` starts out as an empty object, and we assign the `width` and `height` parameters we got to `self.width` and `self.height`. When a constructor returns `None` (which remember is the default), it actually returns `self` (and if you try to make it return something else, that's considered a `TypeError`).

If you're curious, you already tried and found this, but this has the downside that while I can print its attributes normally, I can't get useful information by printing the Rectangle itself:
```
>>> r1
<__main__.Rectangle object at 0x801442310>
```
Well isn't that useless! With a dictionary `{'width': 5, 'height': 7}`, I could see all its attributes just by printing the dictionary itself.

Python doesn't automatically know how objects of a custom class should be displayed. We can tell it how, but we'll get to that farther below.

First: I mentioned that `self` starts out as an "empty object". What's an *empty* object like?
```
>>> class Thing: pass
...
>>> t1 = Thing()
>>> t1.name
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: type object 'Thing' has no attribute 'name'
>>> t1.name = 'Thing1'
>>> t1.name
'Thing1'
>>> t2 = Thing()
>>> t2.name = 'Thing2'
>>> t2.name
'Thing2'
```
The analogy to a dictionary should be obvious. I can basically store whatever attributes I want on it with whatever values, just like keys on a dictionary. The only advantage so far is that I access attributes with the more convenient `.` syntax instead of brackets.

Perhaps the real fundamental difference between an object and a dictionary is how an object can fall back to its class. With the beginning of the `Rectangle` class above, the attributes were attached to `self` inside the constructor, meaning each `Rectangle` had its *own* `width` and `height`. You can also put attributes on the class itself, and we'll see what that does:
```
>>> class Rectangle:
...   width = 4
...   height = 4
...
>>> r1 = Rectangle()
>>> r1.width
4
>>> r2 = Rectangle()
>>> r2.width
4
>>> r2.width = 5
>>> r2.width
5
```
With no constructor explicitly defined, I pass no arguments to `Rectangle()`. But they still have the `width` and `height` defined directly under the class. Obviously we wouldn't want to do this for a rectangle's dimensions because each rectangle has to have its *own* dimensions. And while we can set them separately after initializing them, it's way more convenient to be able to pass them as arguments to the constructor. You'll see why the fallback concept is useful later.

First, to fully understand what happens when we put the attributes on the class, let's play with this a little more:
```
>>> Rectangle.height
4
>>> Rectangle.height = 5
>>> r1.height, r2.height
(5, 5)
```
I changed `height` on the class and it looks like it changed it on *all* existing Rectangles. This is about to get more interesting:
```
>>> r1.height = 6
>>> r1.height
6
>>> Rectangle.height
5
>>> r2.height
5
>>> Rectangle.height = 7
>>> r2.height
7
>>> r1.height
6
```
So changing the class's attributes only seems to update the objects I hadn't already given their own value for the same attribute. What's actually going on is that with no constructor, the objects start out with no attributes, and when I try to access `r1.height` and it doesn't have one, it falls back to the class that `r1` is an object of, and sees that the class does have a `height` defined, so it gives me that one.

But if the Rectangle object has its own `height`, it doesn't look at its class. So we didn't see the fallback before when we had the constructor because the lines `self.width = width` and `self.height = height` were setting the attributes on each rectangle as it was built, so they never had to fall back.

The `__dict__` attribute of an object shows you the object's own attributes. This is extremely useful for illustrating attribute fallback:
```
>>> r1.__dict__
{'height': 6}
>>> r2.__dict__
{'width': 5}
```
So there you go. That's how objects work. An object in Python is esentially a dictionary combined with a class name. When you try to access an attribute, you'll get it if it exists, or if the object doesn't have its own attribute named that, it'll see if the class has one. When you set the attribute on an object, it sets it on the object itself, not on the class.

By far the most common use of the fallback is for *methods* - those functions attached to a data type like `list.insert`. `perimeter` can be one of those, and we'll call it like `r1.perimeter()` instead of `rectangle_perimeter(r1)`. It's time to implement that perimeter method. (I'll also bring back the constructor since we'd want it if we were doing this geometry simulator thing for real.)
```
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def perimeter(self):
        return self.width*2 + self.height*2
```
With the class defined this way, we could get any `Rectangle` object's perimeter from that method:
```
>>> r1 = Rectangle(5, 4)
>>> r1.perimeter()
18
>>> r2 = Rectangle(4, 6)
>>> r2.perimeter()
20
```
Ha! The syntax is clearer than `perimeter(r1)` too because it *looks* like the perimeter is a property of the rectangle, rather than something else we're doing (which is what a function usually is) that involves a rectangle.

So now the `self` parameter might be a little more intuitive. Our `perimeter` method actually exists on the class, but when we access it using an object of the class instead of the class itself, that parameter is filled in with the object we're calling it from. This is the other essential magic of classes. Basically, `obj.method(*args)` is translated to `method(obj, *args)`.

There's a whole lot more we would do though to make the `Rectangle` class really worth it over using dictionaries. You know how `Rectangle`s don't print as anything helpful? We can fix that. `__init__` isn't the only special method. If we define a `__repr__` method on the class, it'll tell Python how to treat it with `repr` (which is also how the prompt works). Remember the difference between `repr` and `str` from part 6? No worries if you don't because `__str__` falls back to `__repr__` if `__str__` doesn't exist (meaning if we define just a `__repr__`, both `repr`/the prompt and `str`/`print` will use it). Most types want the same behavior for those methods anyway.
```
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def __repr__(self):
        string = '+' + '-' * (self.width-2) + '+\n'
        i = 0
        while i < self.height:
            string += '|' + ' ' * (self.width-2) + '|\n'
            i += 1
        string += '+' + '-' * (self.width-2) + '+\n'
        return string
    def perimeter(self):
        return self.width*2 + self.height*2
```
Try printing a `Rectangle` now!

These special `__...__` methods, by the way, are called "dunder" methods. And there's even more we can do with them. What if we could use `+` on two `Rectangle`s to find the smallest `Rectangle` containing them both?
```
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def __repr__(self):
        string = '+' + '-' * (self.width-2) + '+\n'
        i = 0
        while i < self.height:
            string += '|' + ' ' * (self.width-2) + '|\n'
            i += 1
        string += '+' + '-' * (self.width-2) + '+\n'
        return string
    def __add__(self, other):
        return Rectangle(max(other.width, self.width), max(other.height, self.height))
    def perimeter(self):
        return self.width*2 + self.height*2
    def area(self): # I'm also adding an area method while we're at it
        return self.width * self.height
```
The `__add__` method determines the behavior of the object when you use it with `+`! Try it out.

And notice another benefit of using the `__repr__` method over a type that just prints naturally, like dictionaries: although it takes some extra work, it lets us customize it.

By the way, there's technically no reason the first parameter of a method has to be named `self`. Each function could name it something different if you wanted. But `self` is the traditional name for it in Python, and there's no good reason to deviate.

Also, by the way (I hinted at this in the opening but now I'm going to make it clear) you might've already typed `int` or one of the other type conversion functions at the prompt without the parentheses to call it, and noticed that it says "&lt;*class* 'int'&gt;" - not *function* int. Now this should finally make sense: `int` is actually a class, and when you call it like `int()`, you're calling its constructor! Those built-in classes are the only ones that aren't capitalized by convention, but they function just like any other class.

Classes are closely related to [a philosophy called object-oriented programming](https://yujiri.xyz/software/programming_paradigms#object-oriented-programming) or OOP. You'll come across a lot of people with different opinions on whether OOP is good or bad and even what it means. I've written [my own thoughts on the topic](https://yujiri.xyz/software/oop), which you can read if you feel like it, but there's still at least one major concept of classes to cover.

# Inheritance

Let's say you went forward with this geometry simulator program and had classes for a bunch of different shapes. But there's a good bit they all have in common - you ended up adding position information to them, so they all have `x` and `y` attributes that track where they are in addition to how big they are. They all need to be able to have *momentum* which moves them appropriately every turn, and they also are affected by gravity meaning their Y momentum increases by 1 (in the downward direction) every time. They also all have a `color` attribute.

With only the tools I gave above, you'd have to do this by defining the common attributes and methods separately on each class. But there's a better way.

Inheritance is a way to re-use the functionality of a "base" or "parent" class when defining a class based on it - the subclass or "child" class. Here's an example of how you could do it:
```
class Shape:
    def __init__(self, x, y, color):
        self.x = x
        self.y = y
        # I didn't give the constructor parameters for momentum because
        # a shape probably never needs to start out with momentum.
        # d, by the way, is an abbreviatio for 'delta', which is used
        # in math to mean 'the change in'.
        self.dx = 0
        self.dy = 0
        self.color = color
    def pass_time(self):
        self.x += self.dx
        self.y += self.dy
        self.dy += 1
```
Then `Rectangle` would be declared with `class Rectangle(Shape):` instead of `class Rectangle:`, and would "inherit" the `pass_time` method so you could call `rect.pass_time()`, even without adding that method to the `Rectangle` class definition.

Well actually that doesn't quite do it. Since `Rectangle` defines its own constructor (and has to because it has attributes `Shape` doesn't), `Rectangle`'s constructor overrides `Shape`'s, and so when you make a `Rectangle`, it calls the `Rectangle` constructor and never invokes the `Shape` one.

Not to worry, there's a one-line solution for this, albeit it's kind of ugly:
```
class Rectangle(Shape):
    def __init__(self, x, y, color, width, height):
        Shape.__init__(self, x, y, color)
        self.width = width
        self.height = height
```
With that weird line, we call the `Shape` constructor and pass it the parameters that are of `Shape` rather than `Rectangle`. The `Shape` constructor does all of its stuff to our `Rectangle` object. Since we're calling the constructor directly from the `Shape` class instead of from an instance of it, the `self` parameter isn't already filled in and we have to pass it the `self` that refers to the `Rectangle` object under construction.

So that's pretty cool innit? You can re-use common code between classes with inheritance.

You can actually inherit from built-in types too! You know how `list.remove` only removes the first occurence? What if you wanted a data type that acts just like a list but also has a method to remove *every* occurence of the specified value?
```
class Mylist(list):
    def remove_all(self, item):
        while item in self:
            self.remove(item)
```
This declares `Mylist` as a special kind of `list` that can also `remove_all`, which gets around that little inconvenience of `list.remove`. And note that since we aren't adding new constructor parameters, we don't need to override so we don't need to do that ugly stuff to call the `list` constructor - `Mylist` just inherits it.

Of course, to give a list this behavior you'd need to explicitly make it a `Mylist` like this:
```
>>> nums = Mylist([1, 3, 3, 5, 3, 2, 1, 3])
>>> nums.remove_all(3)
>>> nums
[1, 5, 2, 1]
```
It wouldn't change the behavior of lists you create with just the literal list syntax.

A common use of inheritance is for custom error types. If you want to define a custom *type* of error, as opposed to raising a built-in error type with a custom message (so you can handle it with a separate `except` clause), it actually only takes *one* line:
```
class MyError(ValueError): pass
```
Since we didn't put any attributes on `MyError`, it inherits everything from `ValueError`, so functionally a `MyError` works exactly the same as a `ValueError` and just has a different name.

This is surprisingly useful. Imagine `MyError` is used in some specific condition that's a subset of a value being invalid (which is what `ValueError` is for). Since it's a subtype of `ValueError`, Python knows that, so an `except ValueError` clause will also catch a `MyError` (just like an `except Exception` clause catches all types of errors since they're all subtypes of `Exception`). But now we could do an `except MyError` clause that would catch `MyError`s but not `ValueError`s in general. So a custom error type gives us the *option* to handle it differently, but doesn't require us to. Ain't that neat?

### Immutability of built-in types

One pitfall I need to mention, that would be confusing given how I talked about empty objects earlier: built-in objects are kinda special in that you can't add attributes to them. `l = []; l.blah = 'blah'` would give you `AttributeError: 'list' object has no attribute 'blah'`, even though this would work for a custom class that didn't have a `blah` attribute. You can do it by subclassing built-in types though.

# Space battle simulator!

Hey, I have a fun project idea.

A program that takes two fleets, the Milky Way Federation and the Andromeda Alliance, and simulates a battle between them. Each round, every ship takes an action, like shooting a laser or a missile. It should simulate the battle until it ends and then say which fleet won and what ships it had left.

Ships have **hull** and **shields**. Shields absorb damage first, with the advantage of regenerating slowly if they've been damaged. If a ship's shields are overloaded, remaining damage hits its hull.

There are these kinds of attacks:

* Laser - do small amounts of damage but usually hit

* Missile - do more damage, but usually miss small ships

There are at least these types of ships:

* **Fighter**: Have a 25% chance to dodge lasers and 75% to dodge missiles. Every turn, they fire one laser at a random enemy ship that deals 3 damage. 10 hull, 10 shield, regenerates 1 shield per turn.

* **Bomber**: The same as a fighter except it launches a 6-damage missile.

* **Frigate**: Never dodges anything. 30 hull, 30 shield, regenerates 2 shield per turn, fires both a 3 damage laser and 6 damage missile (which can be at different targets).

Make the program explain what's happening as it goes. Here's a test run of my implementation, with 2 Fighters, 1 Bomber and 1 Frigate on each side (it's very long, so I put it in a button):

<expand-note closedtext="Show" opentext="Collapse">

```

=== round 1 ===

Milky Way Federation Frigate #1 (hull: 30/30, shield: 30/30) firing 6-dmg missile at Andromeda Alliance Fighter #1 (hull: 10/10, shield: 10/10)
Andromeda Alliance Fighter #1 (hull: 10/10, shield: 10/10) dodged the missile

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 10/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 10/10, shield: 10/10)
Milky Way Federation Fighter #2 (hull: 10/10, shield: 7/10) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 30/30) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 10/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10) was hit

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 10/10) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 30/30, shield: 30/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 24/30) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 30/30) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 30/30, shield: 24/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 18/30) was hit

Andromeda Alliance Fighter #1 (hull: 10/10, shield: 10/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 10/10, shield: 7/10)
Milky Way Federation Fighter #2 (hull: 10/10, shield: 4/10) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 30/30) firing 3-dmg laser at Milky Way Federation Frigate #1 (hull: 30/30, shield: 18/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 15/30) was hit

Milky Way Federation Fighter #1 (hull: 10/10, shield: 10/10) firing 3-dmg laser at Andromeda Alliance Fighter #1 (hull: 10/10, shield: 10/10)
Andromeda Alliance Fighter #1 (hull: 10/10, shield: 7/10) was hit

Milky Way Federation Fighter #2 (hull: 10/10, shield: 4/10) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 30/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 27/30) was hit

Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 27/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 21/30) was hit


=== round 2 ===

Milky Way Federation Frigate #1 (hull: 30/30, shield: 17/30) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 23/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 17/30) was hit

Milky Way Federation Fighter #2 (hull: 10/10, shield: 5/10) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10) dodged the laser

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10) firing 3-dmg laser at Milky Way Federation Frigate #1 (hull: 30/30, shield: 17/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 14/30) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 17/30) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 30/30, shield: 14/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 8/30) was hit

Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10) firing 6-dmg missile at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10) dodged the missile

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 10/10) firing 6-dmg missile at Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10) dodged the missile

Milky Way Federation Fighter #1 (hull: 10/10, shield: 10/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 10/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 7/10) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 17/30) firing 3-dmg laser at Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10) dodged the laser

Andromeda Alliance Fighter #1 (hull: 10/10, shield: 8/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 10/10, shield: 5/10)
Milky Way Federation Fighter #2 (hull: 10/10, shield: 2/10) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 8/30) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 5/10) was hit


=== round 3 ===

Milky Way Federation Fighter #1 (hull: 10/10, shield: 10/10) firing 3-dmg laser at Andromeda Alliance Fighter #1 (hull: 10/10, shield: 9/10)
Andromeda Alliance Fighter #1 (hull: 10/10, shield: 6/10) was hit

Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10) firing 6-dmg missile at Andromeda Alliance Fighter #1 (hull: 10/10, shield: 6/10)
Andromeda Alliance Fighter #1 (hull: 10/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 10/30) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 19/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 13/30) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 10/30) firing 3-dmg laser at Andromeda Alliance Fighter #1 (hull: 10/10, shield: 0/10)
Andromeda Alliance Fighter #1 (hull: 7/10, shield: 0/10) was hit

Andromeda Alliance Fighter #1 (hull: 7/10, shield: 0/10) firing 3-dmg laser at Milky Way Federation Bomber #1 (hull: 10/10, shield: 10/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 7/10) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 13/30) firing 6-dmg missile at Milky Way Federation Fighter #2 (hull: 10/10, shield: 3/10)
Milky Way Federation Fighter #2 (hull: 10/10, shield: 3/10) dodged the missile

Milky Way Federation Fighter #2 (hull: 10/10, shield: 3/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 8/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 5/10) was hit

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 6/10) firing 3-dmg laser at Milky Way Federation Fighter #1 (hull: 10/10, shield: 10/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10) was hit

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 5/10) firing 6-dmg missile at Milky Way Federation Bomber #1 (hull: 10/10, shield: 7/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 7/10) dodged the missile

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 13/30) firing 3-dmg laser at Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10) dodged the laser


=== round 4 ===

Milky Way Federation Bomber #1 (hull: 10/10, shield: 8/10) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 15/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 9/30) was hit

Milky Way Federation Fighter #1 (hull: 10/10, shield: 8/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 6/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 3/10) was hit

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 3/10) firing 6-dmg missile at Milky Way Federation Fighter #2 (hull: 10/10, shield: 4/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 0/10) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 9/30) firing 3-dmg laser at Milky Way Federation Bomber #1 (hull: 10/10, shield: 8/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 5/10) was hit

Milky Way Federation Fighter #2 (hull: 8/10, shield: 0/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 3/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 0/10) was hit

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10) firing 3-dmg laser at Milky Way Federation Bomber #1 (hull: 10/10, shield: 5/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 2/10) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 9/30) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 30/30, shield: 12/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 6/30) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 6/30) firing 6-dmg missile at Andromeda Alliance Fighter #1 (hull: 7/10, shield: 1/10)
Andromeda Alliance Fighter #1 (hull: 7/10, shield: 1/10) dodged the missile

Milky Way Federation Frigate #1 (hull: 30/30, shield: 6/30) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10) dodged the laser

Andromeda Alliance Fighter #1 (hull: 7/10, shield: 1/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 0/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 0/10) dodged the laser


=== round 5 ===

Milky Way Federation Fighter #1 (hull: 10/10, shield: 9/10) firing 3-dmg laser at Andromeda Alliance Fighter #1 (hull: 7/10, shield: 2/10)
Andromeda Alliance Fighter #1 (hull: 6/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 8/30) firing 6-dmg missile at Andromeda Alliance Fighter #1 (hull: 6/10, shield: 0/10)
Andromeda Alliance Fighter #1 (hull: 0/10, shield: 0/10) was hit

Milky Way Federation Fighter #2 (hull: 8/10, shield: 1/10) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 11/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 8/30) was hit

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 1/10) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 10/10, shield: 9/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 9/10) dodged the missile

Milky Way Federation Bomber #1 (hull: 10/10, shield: 3/10) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 8/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 2/30) was hit

Milky Way Federation Frigate #1 (hull: 30/30, shield: 8/30) firing 3-dmg laser at Andromeda Alliance Fighter #1 (hull: 0/10, shield: 0/10)
Andromeda Alliance Fighter #1 (hull: -3/10, shield: 0/10) was hit

Andromeda Alliance Fighter #1 (hull: -3/10, shield: 0/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 1/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 1/10) dodged the laser

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 8/10) firing 3-dmg laser at Milky Way Federation Frigate #1 (hull: 30/30, shield: 8/30)
Milky Way Federation Frigate #1 (hull: 30/30, shield: 5/30) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 2/30) firing 3-dmg laser at Milky Way Federation Fighter #1 (hull: 10/10, shield: 9/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 6/10) was hit

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 2/30) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 30/30, shield: 5/30)
Milky Way Federation Frigate #1 (hull: 29/30, shield: 0/30) was hit


=== round 6 ===

Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10) dodged the laser

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 4/30) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10) dodged the missile

Milky Way Federation Fighter #2 (hull: 8/10, shield: 2/10) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 4/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 1/30) was hit

Milky Way Federation Frigate #1 (hull: 29/30, shield: 2/30) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10) dodged the missile

Milky Way Federation Frigate #1 (hull: 29/30, shield: 2/30) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 9/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 6/10) was hit

Milky Way Federation Bomber #1 (hull: 10/10, shield: 4/10) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10) dodged the missile

Andromeda Alliance Frigate #1 (hull: 30/30, shield: 1/30) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 2/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 2/10) dodged the laser

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10) dodged the missile

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 6/10) firing 3-dmg laser at Milky Way Federation Fighter #1 (hull: 10/10, shield: 7/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 4/10) was hit


=== round 7 ===

Milky Way Federation Fighter #2 (hull: 8/10, shield: 3/10) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 3/30)
Andromeda Alliance Frigate #1 (hull: 30/30, shield: 0/30) was hit

Milky Way Federation Frigate #1 (hull: 29/30, shield: 4/30) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 30/30, shield: 0/30)
Andromeda Alliance Frigate #1 (hull: 24/30, shield: 0/30) was hit

Milky Way Federation Bomber #1 (hull: 10/10, shield: 5/10) firing 6-dmg missile at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10) dodged the missile

Andromeda Alliance Frigate #1 (hull: 24/30, shield: 0/30) firing 3-dmg laser at Milky Way Federation Fighter #1 (hull: 10/10, shield: 5/10)
Milky Way Federation Fighter #1 (hull: 10/10, shield: 2/10) was hit

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 3/10) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 10/10, shield: 2/10)
Milky Way Federation Fighter #1 (hull: 6/10, shield: 0/10) was hit

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 3/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 3/10) dodged the laser

Andromeda Alliance Frigate #1 (hull: 24/30, shield: 0/30) firing 6-dmg missile at Milky Way Federation Fighter #2 (hull: 8/10, shield: 3/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 3/10) dodged the missile

Milky Way Federation Fighter #1 (hull: 6/10, shield: 0/10) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 24/30, shield: 0/30)
Andromeda Alliance Frigate #1 (hull: 21/30, shield: 0/30) was hit

Milky Way Federation Frigate #1 (hull: 29/30, shield: 4/30) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 7/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 4/10) was hit


=== round 8 ===

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 5/10) firing 3-dmg laser at Milky Way Federation Bomber #1 (hull: 10/10, shield: 6/10)
Milky Way Federation Bomber #1 (hull: 10/10, shield: 3/10) was hit

Milky Way Federation Frigate #1 (hull: 29/30, shield: 6/30) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 21/30, shield: 2/30)
Andromeda Alliance Frigate #1 (hull: 20/30, shield: 0/30) was hit

Andromeda Alliance Frigate #1 (hull: 20/30, shield: 0/30) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 4/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 4/10) dodged the laser

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 4/10) firing 6-dmg missile at Milky Way Federation Bomber #1 (hull: 10/10, shield: 3/10)
Milky Way Federation Bomber #1 (hull: 7/10, shield: 0/10) was hit

Milky Way Federation Bomber #1 (hull: 7/10, shield: 0/10) firing 6-dmg missile at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 5/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 5/10) dodged the missile

Milky Way Federation Fighter #2 (hull: 8/10, shield: 4/10) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 5/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 2/10) was hit

Milky Way Federation Fighter #1 (hull: 6/10, shield: 1/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 4/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 1/10) was hit

Andromeda Alliance Frigate #1 (hull: 20/30, shield: 0/30) firing 6-dmg missile at Milky Way Federation Fighter #2 (hull: 8/10, shield: 4/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 4/10) dodged the missile

Milky Way Federation Frigate #1 (hull: 29/30, shield: 6/30) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 1/10)
Andromeda Alliance Bomber #1 (hull: 10/10, shield: 1/10) dodged the missile


=== round 9 ===

Andromeda Alliance Fighter #2 (hull: 10/10, shield: 3/10) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 5/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 5/10) dodged the laser

Milky Way Federation Fighter #2 (hull: 8/10, shield: 5/10) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 3/10)
Andromeda Alliance Fighter #2 (hull: 10/10, shield: 0/10) was hit

Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 6/10, shield: 2/10)
Milky Way Federation Fighter #1 (hull: 6/10, shield: 2/10) dodged the missile

Andromeda Alliance Frigate #1 (hull: 20/30, shield: 2/30) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 6/10, shield: 2/10)
Milky Way Federation Fighter #1 (hull: 6/10, shield: 2/10) dodged the missile

Milky Way Federation Frigate #1 (hull: 29/30, shield: 8/30) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 10/10, shield: 0/10)
Andromeda Alliance Fighter #2 (hull: 7/10, shield: 0/10) was hit

Milky Way Federation Bomber #1 (hull: 7/10, shield: 1/10) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 10/10, shield: 2/10)
Andromeda Alliance Bomber #1 (hull: 6/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 29/30, shield: 8/30) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 6/10, shield: 0/10)
Andromeda Alliance Bomber #1 (hull: 6/10, shield: 0/10) dodged the missile

Milky Way Federation Fighter #1 (hull: 6/10, shield: 2/10) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 7/10, shield: 0/10)
Andromeda Alliance Fighter #2 (hull: 4/10, shield: 0/10) was hit

Andromeda Alliance Frigate #1 (hull: 20/30, shield: 2/30) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 5/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 2/10) was hit


=== round 10 ===

Andromeda Alliance Frigate #1 (hull: 20/30, shield: 4/30) firing 3-dmg laser at Milky Way Federation Frigate #1 (hull: 29/30, shield: 10/30)
Milky Way Federation Frigate #1 (hull: 29/30, shield: 7/30) was hit

Milky Way Federation Frigate #1 (hull: 29/30, shield: 7/30) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 6/10, shield: 1/10)
Andromeda Alliance Bomber #1 (hull: 4/10, shield: 0/10) was hit

Andromeda Alliance Frigate #1 (hull: 20/30, shield: 4/30) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 29/30, shield: 7/30)
Milky Way Federation Frigate #1 (hull: 29/30, shield: 1/30) was hit

Andromeda Alliance Bomber #1 (hull: 4/10, shield: 0/10) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 29/30, shield: 1/30)
Milky Way Federation Frigate #1 (hull: 24/30, shield: 0/30) was hit

Milky Way Federation Fighter #2 (hull: 8/10, shield: 3/10) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 4/10, shield: 1/10)
Andromeda Alliance Fighter #2 (hull: 2/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 24/30, shield: 0/30) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 20/30, shield: 4/30)
Andromeda Alliance Frigate #1 (hull: 18/30, shield: 0/30) was hit

Milky Way Federation Fighter #1 (hull: 6/10, shield: 3/10) firing 3-dmg laser at Andromeda Alliance Fighter #2 (hull: 2/10, shield: 0/10)
Andromeda Alliance Fighter #2 (hull: -1/10, shield: 0/10) was hit

Milky Way Federation Bomber #1 (hull: 7/10, shield: 2/10) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 18/30, shield: 0/30)
Andromeda Alliance Frigate #1 (hull: 12/30, shield: 0/30) was hit

Andromeda Alliance Fighter #2 (hull: -1/10, shield: 0/10) firing 3-dmg laser at Milky Way Federation Bomber #1 (hull: 7/10, shield: 2/10)
Milky Way Federation Bomber #1 (hull: 6/10, shield: 0/10) was hit


=== round 11 ===

Milky Way Federation Frigate #1 (hull: 24/30, shield: 2/30) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 12/30, shield: 2/30)
Andromeda Alliance Frigate #1 (hull: 8/30, shield: 0/30) was hit

Andromeda Alliance Frigate #1 (hull: 8/30, shield: 0/30) firing 3-dmg laser at Milky Way Federation Fighter #2 (hull: 8/10, shield: 4/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 1/10) was hit

Milky Way Federation Fighter #2 (hull: 8/10, shield: 1/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 4/10, shield: 1/10)
Andromeda Alliance Bomber #1 (hull: 2/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 24/30, shield: 2/30) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 8/30, shield: 0/30)
Andromeda Alliance Frigate #1 (hull: 5/30, shield: 0/30) was hit

Andromeda Alliance Frigate #1 (hull: 5/30, shield: 0/30) firing 6-dmg missile at Milky Way Federation Frigate #1 (hull: 24/30, shield: 2/30)
Milky Way Federation Frigate #1 (hull: 20/30, shield: 0/30) was hit

Milky Way Federation Fighter #1 (hull: 6/10, shield: 4/10) firing 3-dmg laser at Andromeda Alliance Frigate #1 (hull: 5/30, shield: 0/30)
Andromeda Alliance Frigate #1 (hull: 2/30, shield: 0/30) was hit

Milky Way Federation Bomber #1 (hull: 6/10, shield: 1/10) firing 6-dmg missile at Andromeda Alliance Frigate #1 (hull: 2/30, shield: 0/30)
Andromeda Alliance Frigate #1 (hull: -4/30, shield: 0/30) was hit

Andromeda Alliance Bomber #1 (hull: 2/10, shield: 0/10) firing 6-dmg missile at Milky Way Federation Bomber #1 (hull: 6/10, shield: 1/10)
Milky Way Federation Bomber #1 (hull: 1/10, shield: 0/10) was hit


=== round 12 ===

Milky Way Federation Bomber #1 (hull: 1/10, shield: 1/10) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 2/10, shield: 1/10)
Andromeda Alliance Bomber #1 (hull: 2/10, shield: 1/10) dodged the missile

Milky Way Federation Fighter #2 (hull: 8/10, shield: 2/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 2/10, shield: 1/10)
Andromeda Alliance Bomber #1 (hull: 0/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 20/30, shield: 2/30) firing 6-dmg missile at Andromeda Alliance Bomber #1 (hull: 0/10, shield: 0/10)
Andromeda Alliance Bomber #1 (hull: 0/10, shield: 0/10) dodged the missile

Milky Way Federation Fighter #1 (hull: 6/10, shield: 5/10) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: 0/10, shield: 0/10)
Andromeda Alliance Bomber #1 (hull: -3/10, shield: 0/10) was hit

Milky Way Federation Frigate #1 (hull: 20/30, shield: 2/30) firing 3-dmg laser at Andromeda Alliance Bomber #1 (hull: -3/10, shield: 0/10)
Andromeda Alliance Bomber #1 (hull: -6/10, shield: 0/10) was hit

Andromeda Alliance Bomber #1 (hull: -6/10, shield: 0/10) firing 6-dmg missile at Milky Way Federation Fighter #1 (hull: 6/10, shield: 5/10)
Milky Way Federation Fighter #1 (hull: 6/10, shield: 5/10) dodged the missile



Milky Way Federation wins!
Ships remaining:
Milky Way Federation Fighter #1 (hull: 6/10, shield: 5/10)
Milky Way Federation Fighter #2 (hull: 8/10, shield: 2/10)
Milky Way Federation Bomber #1 (hull: 1/10, shield: 1/10)
Milky Way Federation Frigate #1 (hull: 20/30, shield: 2/30)

```

</expand-note>

Poor Andromeda Alliance! Not a single kill!

There's just a couple other things you should know about classes before you try to implement this. First, you can see what class something is with the `type` function - `type(5) == int`, etc. Second, every class stores its name in a `__name__` attribution on the class itself. `Rectangle.__name__` will be `'Rectangle'`. I use both of these in my implementation.

<expand-note closedtext="Show solution" opentext="Hide solution">

```
import random

class Ship:
	def __init__(self, allies, enemies):
		self.allies = allies
		self.enemies = enemies
		# By checking the type of the ship, each ship type is able to have its own max hull and shields
		# without having to override the Ship constructor.
		self.hull = type(self).maxhull
		self.shield = type(self).maxshield
	def take_damage(self, amount):
		# Damage hits the shields first, and if the shields are
		# overcome, remaining damage hits the hull.
		max_shield_damage = min(self.shield, amount)
		self.shield -= max_shield_damage
		amount -= max_shield_damage
		self.hull -= amount
	def __repr__(self):
		return self.allies.name + " " + type(self).__name__ + " #" + str(self.id) +\
			" (hull: " + str(self.hull) + '/' + str(self.maxhull) +\
			", shield: " + str(self.shield) + '/' + str(self.maxshield) + ")"

class Fighter(Ship):
	# I set these as class attributes because they don't need to differ between Fighters.
	maxhull = 10
	maxshield = 10
	laser_power = 3
	def action(self):
		# Regenerate 1 shield at the start of turn.
		if self.shield < self.maxshield:
			self.shield += 1
		# Target a random enemy.
		target = random.choice(self.enemies)
		# All ships return a tuple of actions because some types return more than one.
		return (Action(self, 'laser', self.laser_power, target),)
	def receive(self, effect):
		# Deterine the odds...
		if effect.type == 'laser':
			dodge_chance = .25
		elif effect.type == 'missile':
			dodge_chance = .75
		# .. then roll the dice.
		if random.random() < dodge_chance:
			print(self, "dodged the", effect.type)
		else:
			print(self, "was hit")
			self.take_damage(effect.power)

class Bomber(Ship):
	maxhull = 10
	maxshield = 10
	missile_power = 6
	def action(self):
		if self.shield < self.maxshield:
			self.shield += 1
		target = random.choice(self.enemies)
		return (Action(self, 'missile', self.missile_power, target),)
	def receive(self, effect):
		# Deterine the odds...
		if effect.type == 'laser':
			dodge_chance = .25
		elif effect.type == 'missile':
			dodge_chance = .75
		# Now roll the dice.
		if random.random() < dodge_chance:
			print(self, "dodged the", effect.type)
		else:
			self.take_damage(effect.power)
			print(self, "was hit")

class Frigate(Ship):
	maxhull = 30
	maxshield = 30
	laser_power = 3
	missile_power = 6
	def action(self):
		self.shield = min(self.shield + 2, self.maxshield)
		target1 = random.choice(self.enemies)
		target2 = random.choice(self.enemies)
		return (Action(self, 'laser', self.laser_power, target1),
			Action(self, 'missile', self.missile_power, target2))
	def receive(self, effect):
		self.take_damage(effect.power)
		print(self, "was hit")

class Action:
	def __init__(self, source, type, power, target):
		self.source = source
		self.type = type
		self.power = power
		self.target = target
	def do(self):
		print(self.source, 'firing ' + str(self.power) + '-dmg ' + self.type + ' at', self.target)
		self.target.receive(self)
		# Check if it's still in there to avoid trying to remove the same dead ship twice.
		if self.target.hull <= 0 and self.target in self.target.allies:
			self.target.allies.remove(self.target)

# I subclass list so each fleet can have a name attribute and automatically
# assign nuique IDs to distinguish its ships of the same type.
class Fleet(list):
	def __init__(self, name):
		self.name = name
		# I use a dict of couters so ID numbers aren't shared across ship types.
		self.id_counters = {}
	# A wrapper around the normal append method that adds an ID to the ship.
	def add(self, ship):
		if type(ship) not in self.id_counters:
			self.id_counters[type(ship)] = 1
		ship.id = self.id_counters[type(ship)]
		self.id_counters[type(ship)] += 1
		self.append(ship)

fleet1 = Fleet('Milky Way Federation')
fleet2 = Fleet('Andromeda Alliance')

fleet1.add(Fighter(allies = fleet1, enemies = fleet2))
fleet1.add(Fighter(allies = fleet1, enemies = fleet2))
fleet1.add(Bomber(allies = fleet1, enemies = fleet2))
fleet1.add(Frigate(allies = fleet1, enemies = fleet2))

fleet2.add(Fighter(allies = fleet2, enemies = fleet1))
fleet2.add(Fighter(allies = fleet2, enemies = fleet1))
fleet2.add(Bomber(allies = fleet2, enemies = fleet1))
fleet2.add(Frigate(allies = fleet2, enemies = fleet1))

round = 0

while fleet1 and fleet2:
	round += 1
	input("\n=== round " + str(round) + " ===\n")
	actions = []
	for ship in fleet1 + fleet2:
		actions.extend(ship.action())
	# Randomize the order of actions so neither fleet gets an advantage.
	random.shuffle(actions)
	for action in actions:
		action.do()
		print()

print('\n')

if fleet1: winner = fleet1
elif fleet2: winner = fleet2
else: winner = None

if winner:
	print(winner.name, 'wins!')
	print("Ships remaining:")
	for ship in winner:
		print(ship)
else:
	print("A draw! Both fleets are completely destroyed.")
```

</expand-note>


And once you've done this, it's trivial to add new kinds of ships or new types of attacks! You could also do something like add a `SmartFighter` which knows to focus its attacks on enemy bombers and to shoot at the most damaged one, or a `SmartBomber` which knows not to target small ships if there are any big ones. Maybe a `RepairProbe` that restores the hull of damaged allied ships? A `Factory` that produces a Fighter or Bomber each turn? Maybe an Ion attack type that does extra damage to shields? The possibilities are endless, and with the flexibility of classes, it's easy to explore them.

<!--## A last bit of jargon and theory

Now would be a good time for me to introduce some object-oriented jargon, particularly the concepts **encapsulation** and **polymorphism**.

Encapsulation is keeping everything that deals with an object tucked away inside it. With those `Ship` subclasses up there, they define their behavior when they get shot at internally and nothin outside of the class definition needs to worry about how it works. That's the benefit of encapsulation, and it's why it would be so easy to add new kinds of ships to this.

Polymorphism means the ability to treat different types of objects the same way - for example, calling the same method on them - and having them react differently. Classes achieve polymorphism because different classes can have different behavior in the same methods, so some code somewhere can just call `target.receive(attack)` and not have to worry about how that particular type of target handles it. Without classes, we probably would've ended up having that part of the code check what type of ship the target is and have a big `if..elif..elif..else` chain for each ship type's unique behavior.
-->
