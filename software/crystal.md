TITLE Crystal Review
NAV Review: Crystal
DESC Crystal is an excellent language. Its biggest problems are all a matter of maturity.

## How Crystal and I met

My dive into Crystal came after [learning Rust](https://yujiri.xyz/software/rust). I liked Rust a lot and planned to use it for [a project called Didact](https://yujiri.xyz/didact), which would involve generalizing [my own website's code](https://github.com/yujiri8/yujiri.xyz) into a sort of mini-CMS for easier use by others (I could've just done that, but I wanted to also switch to a statically typed language for [a number of reasons](https://yujiri.xyz/software/typing), and such a rewrite would be the only good time for a language switch). So that meant I needed to find Rust replacements for every Python library I was currently using.

Unfortunately I couldn't. There were passable API frameworks ([Rocket](https://crates.io/crates/rocket) or [Actix-web](https://crates.io/crates/actix-web)), but [the only usable Markdown library, Comrak,](https://crates.io/crates/comrak) would be a big downgrade from [what I was currently using](https://github.com/lepture/mistune), and there was no replacement at all for [Pygments](https://pygments.org). Also, the only usable ORM, [Diesel](https://crates.io/crates/diesel), would be a tremendous downgrade from [SQLAlchemy](https://sqlalchemy.org). It didn't even have lazy loading! Needing several copies of each model definition was a deal-breaker for me, and worse, [the lead dev has stated that it's a deliberate design choice](https://github.com/diesel-rs/diesel/issues/1440#issuecomment-354573185).

I was pretty frustrated because I really wanted to do this in Rust. But then I heard [a dev.to post with some impressive praise for Crystal](https://dev.to/jgaskins/performance-comparison-rust-vs-crystal-with-redis-1a17). I remembered hearing about Crystal a long time ago, early in [my search for a better language that led me to Haskell](https://yujiri.xyz/software/haskell). I had crossed it off back then because I thought I read that it had [no polymorphism except through inheritance](https://yujiri.xyz/software/oop). But I looked into it a little more and heard that it was *duck-typed*. *statically duck-typed*. That was exactly [the fantasy I had wondered about a while ago](https://dev.to/yujiri8/is-there-could-there-be-a-language-with-automatic-interfaces-17di)! I must've misunderstood when I looked into it the first time. So I changed plans and investigated if it was feasible to write Didact in Crystal.

I checked out Crystal's ecosystem. The language is even younger than Rust, so I wasn't terribly surprised to find the situation not much better. But it did have [an ORM, Granite,](https://github.com/amberframework/granite) that seemed to at least solve the model duplicate problem with Diesel. That was enough that for the second modern, well-designed language I was looking at, I wasn't gonna give up that easily. I got the idea of using something not written in Crystal to replace Pygments. After all, Crystal boasted its FFI abilities.

I found one. [GNU source-highlight](https://www.gnu.org/software/src-highlite/) would work as a replacement for Pygments. (This also cleared that obstacle for Rust but I still didn't want to suffer through Diesel.)

That left only the markdown library as a major obstacle. [Markd](https://github.com/icyleaf/markd) was was a Commonmark implementation just like Comrak. I figured I'd have to fork it to make it the way I wanted, but by now, I was willing to.

I forked Markd and dove into its cryptic, poorly-commented source to figure out what the hell was what. I was lucky there was a great test suite. I started by ripping out a bunch of features that seemed so bizarre to me I had no idea why anyone would consider them desirable behavior (the Commonmark spec authors did), like interpreting HTML entities. That one alone involved a 2000 line hash literal that accounted for almost half of Markd's source! I was thrilled to see my fork's line count drop under 2000.

This project made me realize just how much I disagreed with the Commonmark authors, and even John Gruber, on what Markdown should be. I believe in [the Zen of Python](https://www.python.org/dev/peps/pep-0020/): "There should be one - and preferably only one - obvious way to do it", and the original Markdown spec violates that in several pointless ways and Commonmark adds several more. I actually ended up founding [Sanemark](https://yujiri.xyz/sanemark) as an alternative spec.

By the way, Didact [is coming along well](https://github.com/yujiri8/didact).

So that's how I met Crystal. Now I think I've had enough experience to review. Since Crystal is basically statically typed Ruby (I don't know much Ruby) to the point that a file often works as input to either, probably everything I say except the type system will also apply to Ruby.

## Modes of use

Crystal compiles to native code using LLVM. That's [the most important mode of use to me](https://yujiri.xyz/software/interpret_vs_compile). However I'm disappointed that [it can't compile to libraries for other languages to link with](https://github.com/crystal-lang/crystal/issues/921) - I thought it could when I decided to learn it. And the weird thing about that thread is that as far back as 2016, multiple people commented saying they got a proof-of-concept working, then years later Asterite closes the issue saying it's impossible because of GC. Very unsatisfying. To be fair, now that he mentions it I can't imagine how you can reconcile the two... but thinking that thought also made me remember that [*Go*](https://yujiri.xyz/software/go) can compile to shared libraries and has GC. So it must be possible in theory. I don't know what obstacles the Crystal runtime might present that the Go one doesn't, but it's really unsatisfying.

It doesn't have a REPL - not that I expect it from a static language, but I'm noting it because again, the story is that they tried early on (and I think there were some minimally working prototypes) but gave up because of global type inference.

## Type system

Crystal is both duck- and statically typed, which is awesome. Hats off to the Crystal devs for proving it's possible.

Whereas Rust uses algebraic data types and pattern matching, Crystal uses union types, type parameters on classes, and a `case` statement that can check types as well as values, which is mostly equivalent in the end. I'm not really sure if either of these implementations have any real advantages over the other. But the main thing Crystal has over Rust as far as the type system is inheritance! You can't do it in Rust. It feels great to have it back.

In fact (and this would probably horrify the Rust devs), Crystal lets you "re-open" a class or module with a second block that looks like its definition to modify it, which is surprisingly handy. It's used to define a class or module across multiple files, and to modify built-in things like the [Kemal web framework](https://kemalcr.com) does to the stdlib's [`HTTP::Server::Context`](https://crystal-lang.org/api/HTTP/Server/Context.html) to provide parameters.

### Type inference and annotations

Crystal has type inference, but it's pretty finicky. It doesn't apply to empty array or hash literals, and sometimes its lack of ability to see the obvious can be quite irritating, like when it makes you add `.not_nil!` to *every* access to something even though it wold raise on the first one if it was `nil`. Crystal is still pre-1.0 though, so with luck this'll be improved.

There are two syntaxes for type annotations. Normal type annotations use `:` after the identifier, but array and hash literals have their own for some reason: `nums : Array(Int8) = []` is an error, you need `nums = [] of Int8`. Hash literals are similar: `attrs = {} of String => Value`. This was really confusing to me and I hope it will be fixed in 1.0.

One thing that's arguably for good reason but still annoying is that you can't assign a type to a hash that wasn't in the first assignment to the hash, which is a hindrance when dynamically building a hash with a union value type.

### The damage of OOP

Crystal tries to be "fully object-oriented", despite the vagaries of that term, and I think the efforts to shoehorn that way of thinking into every aspect of the language has led to some pretty extensive damage.

[The Crystal docs on modules](https://crystal-lang.org/reference/syntax_and_semantics/modules.html) say:

> Modules serve two purposes:
> * as namespaces for defining other types, methods and constants
> * as partial types that can be mixed in other types

Indeed, modules function both as namespaces and as mixin classes even though those are completely different ideas. A typical case of the OOP mindset wrongly treating everything as a class.

Crystal expects everything to be a class, even things that make no sense to think of as a type of object. Here's another example: *Classes* within a module are accessible from outside with `ModuleName::Class`, but functions are not; `ModuleName::function` is a *parse error*, and `ModuleName.function` says `undefined method 'function' for ModuleName:Module`. The workaround is to use `extend self` within the module, which makes `ModuleName.function` work because it (I guess?) makes the module function as a mixin class for itself. Wait... what? Why don't we just have namespaces?

The idea of a function outside of a class is an afterthought. The [docs](https://crystal-lang.org/reference/syntax_and_semantics/the_program.html) even say "the program is a global object ...".

There aren't *structs* in the sense that non-OO languages like Rust and Go have; there's a `struct` keyword, but it just declares a class whose objects are passed by value instead of by reference. Crystal doesn't have a real concept of *fields*; there are only getters and setters and a family of `property` macros to define them, but even with that, you don't get the ability to pass them to the constructor. To get the basic functionality of fields you need:
```crystal
class Person # struct vs class is the same for this purpose
	property name : String, age : Int8
	def initialize(@name, @age)
	end
end
```
That `@` syntax in the constructor is a sugar to make it automatically assign the argument to the instance variable of the same name. But we need all this; if you just use the constructor definition without the `property` declarations, you get no getters or setters so you can only access them internally, and if you only use the `property` declarations, you can't pass them as constructor arguments.

## Error handling

Being based on Ruby, it uses the same exception system, including the `ensure` clause and multiple `rescue` clauses to handle different error types differently. And since it's not dynamically typed, there are no [name errors to speak of](https://yujiri.xyz/software/catch_name_errors). Compared to [Python](https://yujiri.xyz/software/python) though, it's annoying that there's always [library code in your stack traces](https://yujiri.xyz/software/library_stack_traces), usually *on both sides* because you see several frames from inside the runtime before your code is even called, making it difficult to pick out the interesting frames.

## Syntax

While I appreciate not having semicolons, I'm not a fan of the use of `end` compared to Python's implicit block termination because:

1. It occupies vertical space on my screen with something semantically insignificant. As a Pythonista using a language that *looks* like a significant indentation language, this makes me so uncomfortable that it really makes me want to find ways to refactor to use suffix conditions (see below), despite me not liking those either.

2. It leads to the same problems with error messages that braces do: when I forget an `end`, I usually get an error message pointing to the end of the file. It's really surprising how much time that's costed me.

Another thing I'm not a fan of is suffix conditions instead of prefix conditions. Instead of `if cond: statement`, Crystal uses `statement if cond`. While this might reflect how we speak more accurately, it's hardly a win for clarity to have a line start with something that may not actually be executed, especially if the statement is long.

I'm also not a fan of the `unless` keyword. `unless` is an alias for `if !(...)`, but it confuses me all the time because that's not the full meaning of the Engilsh word 'unless'. 'Unless' implies an exceptional case; native English speakers don't say "unless the normal thing happens". But Crystal users do, and it only took one day for me to lose count of the number of times it's misled me.

A deeper issue I have is that function calls don't need parentheses (just `func arg1, arg2`), which means *there is no way to reference a function without calling it*. You can work around it by defining a proc that calls the function, but that feels so inelegant. It also makes it unclear while reading whether something is a function or just a variable.

I do want to say that I really like that `continue` is called `next`. It's a *way* clearer name. I don't know what idiot decided to call that `continue`, but it's nice to see someone breaking from the tradition.

## Semantics

I'm super glad that Crystal supports both default arguments and keyword arguments. Those are the other two important things Crystal has over Rust in my judgement.

### No global variables

This is pretty annoying: Crystal [doesn't support global variables](https://github.com/crystal-lang/crystal/issues/3139). When you need global mutable state, the workaround is to name it as if it's a constant even through it isn't (talk about a hack), and make a wrapper class if it's an immutable type (like a simple counter) because constants *can* have mutating methods called, they just can't be reassigned. Rust has a better excuse for its issues with global state and the issues are much less annoying.

### Blocks and procs

[Crystal's "procs"](https://crystal-lang.org/reference/syntax_and_semantics/blocks_and_procs.html) seem to be basically [Javascript arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), which get around the "any reference to a function calls it" problem by being objects with a `call` method. Blocks are a (maybe? I'm still not entirely sure what I think of this concept) more empowered version that also serves as the equivalent to Python's iterators.

## Resource management

Crystal reuses the versatile concept of blocks for resource management. For example, to open a file:

```crystal
File.open "data.txt" do |file|
	# Do stuff with `file`
end
```

The analogy to Python's `with` should be obvious.

## Macros

Crystal has [a macro system](https://crystal-lang.org/reference/syntax_and_semantics/macros.html) which serves as an idiomatic way to get around what would otherwise be major drawbacks of static typing. They're used for ORM libraries and such to define type-safe, high-performance SQL functionality for arbitrary classes.

A curious quirk is that macros have a completely different iteration syntax than normal Crystal. Normal Crystal doesn't have `for`; it uses Ruby-style `.each` and blocks. In macros, you use `for..in`. Huh.

### ECR

[Embedded Crystal](https://crystal-lang.org/api/ECR.html) is interesting. Being static, Crystal can't support a real equivalent to something like [Mako](https://www.makotemplates.org), since the templates *have* to be compiled in. (Someone did make [Crinja](https://github.com/straight-shoota/crinja), a Crystal port of Jinja which allows dynamic templates in Crystal, but that's not the same as it doesn't support arbitrary expressions.) But ECR shows that the benefits of a static template system can compete with those of a dynamic one. It's quite nice to have your templates type-checked too, and compiling in means the binary has less strings attached, less things that can go wrong with deploying and running it - not to mention the obvious performance benefits. Despite the frustrations I had finding a way to make ECR work for Didact (I did), I've learned to like it and honestly, if I could trade its benefits for something like Mako, I'm not sure I would do it.

## Concurrency

I haven't worked with it much, but Crystal uses green threads called fibers, and they're quite ergonomic:

```crystal
spawn do
	# Stuff to do in a fiber
end
```

I haven't dealt with channels, and I'm not sure what the status of parallel processing is, but I know [it was at least partly there in 2019](https://crystal-lang.org/2019/09/06/parallelism-in-crystal.html).

## Tooling and documentation

The compiler error messages tend to be really cryptic to non-Crystal gurus, unlike in Rust. It's got colored output, but doesn't show as much context as Rust and only ever shows one problem at a time.

It does have a nice formatter tool with an unusual but interesting style choice: two-space indentation.

It has the same documentation story as Rust - no command-line viewing, but a tool to generate handy HTML docs.

There is no built-in linter, but there is a popular and very useful one, [Ameba](https://github.com/crystal-ameba/ameba).

## Stdlib and ecosystem

The ecosystem is very small due to the youth of the language, but the stdlib is great. There's a solid core of essentials like common array operations and modules for a lot of common things like JSON, CSV, Regex and HTTP. Not as expansive as Python's stdlib, but good enough that you can actually do some things without third-party packages.

As expected, the solid stdlib has led to an ecosystem that's *healthy* despite being very small. Lots of packages don't have dependencies and few have more than a couple, so you can actually understand what you're depending on. Most projects I've seen have an impressive source line count for the amount of functionality they provide. I'd take the Crystal ecosystem over the Rust, Haskell or [Javascript](https://yujiri.xyz/software/javascript) ecosystem any day.

Unlike those three, Crystal has no central repository for package management. `shard.yml` pulls dependencies from Github, any git URL, or a filesystem path. Now, not having a central repository does have a notable downside: there's no place where you can go to find the documentation for third-party libraries, and a common frustration for me is that shards don't have their full API documentation generated and hosted anywhere. I have to download them and generate them myself and view them locally. But I still love not having a central repository, on principle.

---

Final opinion? Crystal is great. Its biggest problems are all a matter of maturity, and it's the first language I've seen that really fulfills the promise of "actually look at multiple different languages and actually combine their good ideas". It's the first static language I've seen that matches most of the great features of Python.
