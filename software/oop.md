TITLE The truth about object-oriented programming
NAV The truth about object-oriented programming
TEMPLATE DEFAULT
DESC The problem with OOP is that it conflates interfaces with classes.

When [I first started learning Python](python), I was sold the typical OOP advocate idea of OOP - that it's great, that it provides code reuse through Inheritance the Father, Encapsulation the Son, and Polymorphism the Holy Spirit (although I didn't understand what those terms meant at the time). And I was even taught what I'm now pretty sure is the worst OOP practice: modifying objects from within other objects' methods. <expand-note contentid="1"></expand-note>

<div class="hidden" id="1">

A Hero class and an Enemy class. `player`, an instance of Hero, fires at `alien`, an instance of Enemy.
The code looked something like this:
```
class Hero:
	def shoot(self, target):
		target.die()

class Enemy:
	def die(self):
		print("I'm dead")

player = Hero()
alien = Enemy()

player.shoot(alien)
```
It's great! The player's bullet is encapsulated inside its method, the enemy's death is encapsulated inside its own method,
and we can have polymorphism if we define their methods on each other, and we can even use inheritance to make specialized
kinds of Enemies and stuff later on! Everything's so flexible! This code is wonderful!

Except no, it isn't.

The player is not what does the shooting. The 'player' is a data structure in memory, and the 'shooting' is the modification of some data in a different struct based on data in this one. The shooting is actually done by the process thread, corresponding to code in the mainloop. So metaphysically speaking it's much more accurate for the call to `alien.die` to be exposed in the mainloop (or in an action handler), not hidden away inside the method of a *different* object. The point of encapsulation is to keep everything that deals with an object clearly attached to the object. What this code does is encapsulates code that modifies the `Enemy` inside a method of the `Hero`.

</div>

In recent years after I started working with [Go](go), I happened to read some articles like [Goodbye, Object Oriented Programming](https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53) (and many others, but this was the one I remember most). And while that article contains a lot of questionable logic and melodrama and fell a long way short of convincing me that all of "Object-Oriented Programming" is bad, it did set me on a path of questioning the philosophy that eventually led me to my current stance.

Here's what I think now: **The problem with OOP is that it conflates interfaces with classes.**

Structs, in a C sense, are a template for a named group of variables that can be referred to as one. They accomplish encapsulation.

Objects/classes, on their own, are just structs with methods, which, without the other concepts here, isn't a difference because you can accomplish the same thing with `method(obj, arg)` instead of `obj.method(arg)`, with method just being an external function that takes the type of `obj` as its first argument. The `.` is syntactic sugar here. Although to impement this without classes you'd need your language to support function overloading.

*Inheritance* is a way for one struct/class to embed another, receiving all its methods and attributes automatically. Inheritance is good. It avoids duplicated code.

*Interfaces* are where OOP goes wrong. The idea of an interface is to allow a function to work on multiple classes if it only needs the methods that are common to them. But OOP implements interfaces with inheritance; a `ThingyType1` and a `ThingyType2` can both be used as a `Thingy` because they both inherit from `Thingy`. This is a huge mistake! What if there's a class in a third-party package you're using and you want to make a function that works both on it and on a custom type you wrote? That won't work unless your class inherits from theirs. And while you might be able to just say it inherits from it and then override everything as desired, that code is going to require comments to explain it and will probably be a lot more verbose that it should be because that's not how this concept is meant to be
used. There's a far more elegant solution. It's called an interface.

Go shows how to do this. An interface is a definition that doesn't define any behavior, it just defines methods, and any type that defines those methods with the given signatures satisfies the interface and can be used in a function that expects one. Interfaces and inheritance are fundamentally different things that solve different problems and you shouldn't force interfaces to be thought of as classes.

*Polymorphism* is a benefit provided by interfaces, not inheritance. In a language that handles OOP properly like Go, anything that has a method with the signature `Write([]byte) (int, error)` *is* by definition an `io.Writer` and is allowed to be used anywhere an `io.Writer` is required. You don't have to "inherit" from `io.Writer`. The class/struct writer doesn't even have to know about the interface they're implementing, so you can write an interface that some type in a third-party package satisfies without having to jump through any hoops.

Implementing polymorphism with inheritance just means doing something you don't want to do so you can undo it. Inheriting all the methods just so you can override them. Just so you can teach your compiler that two types that have a `Write([]byte) (int, error)` method should both be allowed to be used by a function that only needs that method.

Inheritance does exist in Go under the guise of struct embedding, and it still solves all the problems it solves in other OO languages. You can still declare with one line that your type is a subtype of something else and it automatically does everything that other type does.

## What about Python?

I still like Python, and it's definitely an object-oriented language with no concept of an interface. But dynamic typing removes the need: Python doesn't *need* to know what can be an `io.Writer`, because anything's allowed to *try* to be one, and it'll only fail if it doesn't have the method. I find the idea of using [Abstract Base Classes](https://docs.python.org/3/library/abc.html) to implement interfaces in Python extremely perverse. The language has dynamic typing. Let's please at least reap the benefit of this unfortunate quality and not implement a feature we don't need using a framework that isn't meant for it.
