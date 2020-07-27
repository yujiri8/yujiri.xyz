TITLE Dynamic typing is a sin
NAV Dynamic typing is a sin
TEMPLATE DEFAULT

Obviously the title is a bit hyperbolic as [my own favorite language](https://yujiri.xyz/software/python) is a dynamic one, but the last few years of learning many different languages have convinced me that dynamic typing is bad and there are no good reasons for a general purpose language to use it. Note that I'm *not* saying there are no good reasons to *use* a dynamic language, only that there are no good reasons to *make* one (there can be good reasons to use existing dynamic languges because existing static languages are imperfect; I'm interested in design theory here, not convincing anyone to abandon their favorite dynamic language).

I think the main benefit of static typing - catching mistakes earlier so development is faster - is obvious, but there are less obvious ones:

1. **Better error messages.** In a dynamic language, not only do you have to run the program to find a type error, but when you do, the error usually won't point to the line that actually contains the mistake.

2. **Code analyzers.** Linters and vetters can never be very good in dynamic languages, because so much of the information necessary to determine what's a mistake isn't available until runtime. Dynamic languages use features like constructing types and changing what names are defined in a namespace at runtime. This makes it impossible for a static analyzer to *not* occasionally turn up false positives.

	This is why I don't use [mypy](https://mypy-lang.org), as much as I appreciate the idea of it. When I set it up on my website's codebase, it found 18 'errors', none of which indicated a problem.

3. **Documentation**. Without type signatures, we have to document what a function expects in another way. Type signatures, since they're formal, are easier to parse (for the same reason bulleted lists make information easier to parse) and aren't easy to forget to write. Who's had the experience of reading a Python function's documentation that *just doesn't say* what it expects or returns?

---

I think all the supposed cons of static typing are really just cons of bad type systems, and while I don't know any existing language that avoids them all, we can easily imagine a language that combines:

* Generics / parameterized types (eg. a function can take an "array", without specifying an element type, and work on arrays on any type)

* Sum types (a type that contains one of multiple other types)

* [Interface-based polymorphism](https://yujiri.xyz/software/oop) (two types need not know about each other to both be usable in a context that only uses their common properties)

* Inheritance (Go has the best incarnation of it)

* Type inference (types are inferred by the compiler so you rarely have to write them)

With several clear benefits of static typing, I address counterarguments.

### Serialization

> In a static language, you can't easily deserialize data of unknown structure, such as a JSON object.

First, almost all use cases of deserialization involve expecting a specific structure, like a Customer or the arguments to post a Comment. I have yet to find one that doesn't. But for those that don't, powerful type systems still have ways around this, like combining maps with sum types. Consider this Rust example:

```rust
use std::io;
use serde_json::Value;

fn main() -> Result<(),io::Error> {
	let data: Value = serde_json::from_reader(io::stdin())?;
	match &data {
		Value::Null => println!("You entered null"),
		Value::Bool(b) => println!("You entered {}", if *b {"yes"} else {"no"}),
		Value::Number(n) => println!("You entered {} more than 2", n.as_f64().unwrap() - 2.),
		Value::String(s) => println!("You entered the text {}", s),
		Value::Array(a) => println!("You entered the values: {:#?}", a),
		Value::Object(o) => println!("You entered the properties: {:#?}", o),
	}
	Ok(())
}
```
In each branch, I have access to the data decoded as that type. I didn't have to handle them all either - I could've used a default case to fail for types I didn't want to handle.

The `o` in the `Object` branch, by the way, is of type `Map<String, Value>`, so this works recursively.

### When the system is wrong

> Sometimes the human knows more than the computer. No matter how smart the type checker is, static typing prevent things that a human can tell would provably work.

Good static languages have ways to assert such a requirement and panic if it isn't true. In Rust, there's `unwrap`; if I have a of type `Option<Thing>` (which can be either `None` or `Some(Thing)` and normally requires me to handle the `None` case before I can get the `Thing` out), it has an `unwrap` method that returns the internal `Thing` and panics if it was `None`.

Something similar exists in Haskell with `fromJust`, which takes a `Maybe` type (which is a sum type of `Nothing` and `Just a`) and gives you the `a` unwrapped, crashing at runtime if you were wrong and it was `Nothing`.

And neither of these are language primitives; they're library code you could implement yourself.

### Dynamic field access

I've sometimes taken advantage in dynamic languages of the ability to access a field of an object not by name, but by *variable* name. [In Javascript](https://yujiri.xyz/software/javascript), if I might want to access many different fields of `customer`, I can do `customer[field]` instead of:
```c
switch field {
case "name": doThing(customer.name)
case "email": doThing(customer.email)
case "phone": doThing(customer.phone)
case "website": doThing(customer.website)
case "notes": doThing(customer.notes)
}

```
But some static languages can solve this too; Stackoverflow users give a [Go example](https://stackoverflow.com/a/18931036/12211329) and a [Java example](https://stackoverflow.com/a/2127209/12211329). Both of these are much more verbose than how Javascript can do it, but they didn't even have to be that. They didn't even have to be implemented via runtime reflection: although I don't know any static languages that do this, one could allow deriving an enum type of a struct's fields and casting a string to that, in a way that it would error at runtime if the string wasn't the name of one of the fields.

---

Given the above, I find the case against dynamic typing pretty overwhelming. If you think there are any benefits left, point them out and let's see.
