TITLE Rust Review
NAV Review: Rust
TEMPLATE DEFAULT
DESC Rust is a great language. From now on, I plan to use it as a go-to.

## How Rust and I met

I first heard of Rust long ago through stray searches. I was interested because it seemed like a competitor to [Go](https://yujiri.xyz/software/go), which was the most recent language I had learned for a job but that I had a low opinion of. My biggest gripe with Go was error handling. But when I read about Rust's error handling, I misunderstood what I was reading, causing me to think it was even *more* verbose than Go's, so I stopped investigating.

I think that was before most of my search for a better language, which led me through brief dips into several but mostly [Haskell](https://yujiri.xyz/software/haskell). So a long time passed - long enough for me to become fairly competent with Haskell.

Then I heard about Rust again from a friend who held it in high esteem. I did a little more research and found out that it has sugar to cut down on error handling boilerplate. That combined with an ML-inspired type system made it sound to me like Go done right, so I eagerly jumped in.

## Ownership

So the big unique thing about Rust is the concept of ownership. Every value is owned by the scope it's declared in, and only one scope is allowed to own it. You have to *borrow* a value to pass it to another scope (like a function call) without that scope taking ownership away from the caller.

I hear a lot of people saying the borrow checker is draconian and hard to figure out how to satisfy, but I've never had issues with it. I find the ownership rules pretty intuitive. The borrow checker error messages are good and almost all the time, they're preventing bugs.

I actually think the ownership rules breed good mental habits and especially make it easier to reason about performance, which is very appropriate for a systems language.

Ownership also enables Rust to *not have garbage collection*. It's the first language (besides C) I've learned that doesn't have it. Instead, Rust knows at compile time exactly when everything should be freed. You get the safety and ergonomics of automatic memory management, with the performance and simplicity of manual memory management.

## Type system

The type system is ML-like. It has interface (trait)-based polymorphism, generics, sum types, and tuples, which is most of the requirements for a type system to [never get in the way](https://yujiri.xyz/software/typing). It also has inference for local variables (but not for statics and function signatures).

The only big omission is inheritance. Structs can't embed each other flatly. Go shows what I'd hope to see here: a concise way to compose structs without the extra layer of member access. It's really just syntactic sugar on composition that avoids complicating serialization (with composition, fields of the child struct will serialize as a sub-object unless you do special stuff (like [delegate the work to third-party library authors](https://github.com/serde-rs/serde/issues/119) so it only works with that library)).

This is especially problematic for frameworks like [the Diesel ORM](https://diesel.rs), where [you may need separate copies of each model for querying and inserting](https://github.com/diesel-rs/diesel/issues/1440) (and maybe another for updating since there's no default arguments either!).

### No magic

Rust has basically no "magic". Syntactic constructs like indexing, iteration, and comparison use *traits* that you can implement on custom types. Even the implementation of `Vec`, the main container type, is *library code* - no compiler magic involved.

There's also the `derive` feature to automatically generate instances of certain traits for structs, if all their members implement them (like `Eq` and `Ord`).

## Error handling

So error-handling was the #1 thing I hoped Rust would improve over Go (type system was #2). It does, but not as much as I hoped. The improvements are:

* Sugar to cut down on boilerplate. Instead of (Rust without the sugar):
	```rust
	let val = match could_fail() {
		Ok(val) => val,
		Err(err) => return Err(err),
	}
	```
	We can do:
	```rust
	let val = could_fail()?;
	```
	Excellent. If `could_fail()` returns an `Err`, we'll just propagate it upward, and otherwise, `val` becomes the unwrapped success value. Barely any more verbose than an exception language, and more explicit.

* Error-handling is checked at compile time. Since errors are a proper part of the type system via the `Result` sum type, trying to use a `Result` value as its `Ok` type is a type error. You have to do that pattern match thing or otherwise unwrap it first. (`.unwrap()` is a way of saying "although the type checker can't tell, I'm sure it's `Ok` so just give me the unwrapped value and explode at runtime if it turns out to be an `Err`".)

* Composability of functions is maintained because `Result` only takes up one return slot (and Rust has tuple indexing anyway).

The big downside we still have is that there are no stack traces by default. Propagating an error with `?` *only* propagates the original error, with no context added, so when you see the error, it won't have a line number or any other accompanying information, let alone a stack trace. You get that out of the box in most dynamic languages, but in Rust you have to work hard to get them.

[r/rust users informed me](https://www.reddit.com/r/rust/comments/i1lyy5/how_does_new_error_handling_work/) that the situation is similar to Go in that you're just expected to use third-party crates to get sane error handling. There isn't even just one that's dominant; apparently the verdict is that [`anyhow`](https://crates.io/crates/anyhow) is appropriate for applications and [`thiserror`](https://crates.io/crates/thiserror) is appropriate for libraries.

`anyhow` works like this:
```rust
use anyhow::{Context, Result};

fn main() -> Result<()> {
	let args: Vec<String> = std::env::args().collect();
	do_stuff(&args[1], &args[2], &args[3])
}

fn do_stuff(file1: &str, file2: &str, file3: &str) -> Result<()> {
	let text = std::fs::read_to_string(file1).context("when reading")?;
	std::fs::write(file2, text).context("when writing")?;
	std::fs::remove_file(file3).context("when removing")?;
	Ok(())
}
```
And if I pass a filename that doesn't exist, I'll get output like:
```
Error: when reading

Caused by:
    No such file or directory (os error 2)
```
This is actually almost exactly how Go's [github.com/pkg/errors](https://github.com/pkg/errors) works: you have to write the context messages yourself, which is tedious and prone to wrong error messages if you copy-paste, and you're still not getting a line number, so in a large codebase it can still be a hassle to track down where in the source that message is from.

Also like Go, you get backtraces on panics (if you set environment var `RUST_BACKTRACE`), but they [include libraries](https://yujiri.xyz/software/library_stack_traces).

## Syntax

Rust's syntax is pretty verbose. Not just that it's a brace and semicolon language, but types take extra characters: function parameters need `param: Type`, whereas in most other static languages it's just `param Type` or `Type param`, and parameterized types need a pair of angle brackets: `Vec<u8>` is a vector of bytes, instead of `Vec u8` like it would be with Haskell syntax. This can get very ugly with nested types like `Box<Vec<Option<Thing>>>`.

The syntax for namespacing is `::` instead of `.` (except struct fields which still use `.`). A downside of this besides being less ergonomic is that it's precedence is misleading when combined with `.`: `comments::table.load::<Comment>` looks like `comments :: table.load :: <Comment>`, because the `::` is more visual separation so intuitively it should bind less tightly, but it's actually `comments::table . load::<Comment>`.

Rust is often littered with "glue" calls like `.to_string()` after string literals to turn them from type `&str` into `String` (the difference between those types is for good reason, but you'd think literals would be able to be interpreted as `String` when necessary, just like numeric literals are agnostic). Not having concise string concatenation also contributes to the verbosity, along with needing explicit `impl StructName {...}` around methods defined on a struct, and `impl TraitName for StructName {...}` for around trait implementations.

### No default values in function args

An annoyance. It's not as much of a hindrance as with Go though, since you can use Option types to avoid the callers having to specify the default value, so it's only an ergonomic issue.

### Default values in struct fields

Rust actually *does* supports default values in struct fields via [the Default trait](https://doc.rust-lang.org/std/default/trait.Default.html), which is a nice surprise, but it has an extremely verbose syntax:
```rust
#[derive(Default)]
struct Options {
	opt_a: bool,
	opt_b: bool,
	opt_c: bool,
}

fn main() {
    let options = Options { opt_a: true, ..Default::default() };
}
```
Go has a much more streamlined syntax for it (you can just omit default fields) but in return it doesn't support custom defaults, only the "zero values" of the field types. In Rust you can provide your own implementation of the `default` method.

### Variable declarations

Rust requires `let` on the first use of a variable. A second `let` shadows, which solves [the lexical coupling issues other explicit declaration languages have](https://yujiri.xyz/software/declarations). A `let mut` is required to make a mutable binding; immutability by default is important for the borrowing rules to be practical, and it also breeds a good awareness of where mutations can happen.

## Array operations

The Vec type (which is the main sequence type) accomodates [most common sequence operations out of the box](https://doc.rust-lang.org/std/vec/struct.Vec.html): push, pop, membership test, insert at position, remove at position, sort, reverse, filter, map, comprehension, and a ton of relatively obscure ones. Pretty much the only thing missing is negative index.

## Concurrency

Rust has OS-level threads as well as async/await. The designers said somewhere that OS-level threads made more sense than green threads because Rust is supposed to be a systems language, and I'm happy with that.

It's communication system is similar to Go's, but ownership solves data races *and mutex hell*. Mutexed data can't be accessed without locking because of the type system, and when the unwrapped data goes out of scope, it's automatically relocked. You can still deadlock of course, but this makes mutexes much easier to work with.

## Resource management

Rust actually leverages ownership to solve this too. Files are *automatically* closed when they go out of scope; it's handled by [the Drop trait](https://doc.rust-lang.org/std/ops/trait.Drop.html) which you can implement. I think it's the most elegant solution I've ever seen.

On the other hand, it is less flexible than the Go and Python solutions in that it doesn't pull double-duty for other use cases. As far as I know, nothing in Rust provides the full power of `defer` or `finally`.

## Module system

The thing I've found most confusing about Rust is the package import/namespacing system. There's the `use` keyword, which is actually *not* really the same thing as `import` from other languages. There's `pub use` for re-exporting. There's `mod`, which is a bit confusing because it's used both to explicitly declare a module *and* to indicate that the definition is in another file, and `pub mod`. I'm [apparently not alone in being confused by all this](https://doc.rust-lang.org/edition-guide/rust-2018/module-system/path-clarity.html). There's weird stuff like import paths starting with `::` and the `crate` keyword for the current crate, and the `extern crate` keyword which they say should only be necessary for "sysroot" crates, but I've found it seemingly necessary to work with Diesel.

I actually love the way `use` works. You don't strictly have to have a `use` declaration at the top to be able to use an external crate because dependencies are all declared in `Cargo.toml`; all `use` does is unwrap namespaces. For example, `use std::env;` lets you use `env` directly in that scope, but without it you can still reference `env` as `std::env`, which can be more convenient for single uses, and I'm very attracted to the idea of not having to edit something at the top of the file when I realize I need to use a stdlib module on line 500.

In general, I despise Rust's zealous [data hiding](https://yujiri.xyz/software/data_hiding). Some unsafe code legitimately requires the outside to not mess with certain stuff, but most often defaulting everything to private just means cutting off possible uses for no reason. Library authors can't anticipate everything a caller might have reason to do, so `pub` should be the default.

Another onerous restriction is that a trait can only be implemented in either the crate that defines the type or the crate that defines the trait. You can't implement external traits on external types. [The Rust book](https://doc.rust-lang.org/book/ch10-02-traits.html#implementing-a-trait-on-a-type) explains:

> This rule ensures that other people’s code can’t break your code and vice versa. Without the rule, two crates could implement the same trait for the same type, and Rust wouldn’t know which implementation to use.

But couldn't the import system fix this? Couldn't you just only import one implementation? At the very least, couldn't it be allowed to make private implementations?

[Another part of the Rust book](https://doc.rust-lang.org/book/ch19-03-advanced-traits.html#using-the-newtype-pattern-to-implement-external-traits-on-external-types) offers wrapper types as a solution, but also explains how that's inadequate.

## Macros

Rust uses macros to have type-safe string formatting, JSON literals, and other niceties. I believe they're also how [`serde`](https://serde.rs) is implemented. They're a lot better than C macros though; instead of naive string substitution, they [create their own syntax contexts](https://doc.rust-lang.org/1.7.0/book/macros.html#hygiene).

I've never extensively used macros in any language, but my impression of them so far is that they're awesome. A much more enlightened solution to all of these problems than runtime reflection in an otherwise static language.

## Tooling

Rust doesn't have [build system hell](https://yujiri.xyz/software/build_systems). `cargo` Just Works (and comes with subcommands to generate the project boilerplate for you). `Cargo.toml` is powerful too; you can specify dependencies by filesystem path, git URL, or `crates.io` name. *Most* other languages I know make filesystem path imports hard.

The compiler is the most helpful I've ever seen. It shows source context with colored output, the error descriptions are pretty good, and there's a `rustc --explain` feature that gives a more in-depth explanation of an error. It also automatically points out unused stuff and unhandled Results, which is great!

There's even an official formatter and linter: `rustfmt` and `clippy`, which can be invoked as `cargo` subcommands for easy awareness of the project, and you can even see a list of [all the clippy lints](https://rust-lang.github.io/rust-clippy/master/).

## Documentation

The content of documentation is pretty average, but I think the tool for it is above so. `cargo doc` generates it in HTML, and has the `--open` flag to automatically open it in your browser. The output includes links everywhere, a great layout, and a search bar.

## Stdlib and ecosystem

Terrible in every way.

The standard library is tiny. It features absolutely nothing besides language basics and type methods, no randomness, not even a time struct. [`std::time`](https://doc.rust-lang.org/std/time/index.html) features the `Duration`, `Instant`, and `SystemTime` types; the latter two are completely opaque meaning you can't do things like get the year number out of them (of course there's no `strftime` or `strptime`). Even Haskell has more of a stdlib than this.

The ecosystem is npm all over again. Every crate seems to have a hundred recursive dependencies. For every task, there are a dozen libaries, half of them are deprecated and the other half have weird APIs and similar names. Usually none are stable.

Hopefully this will be improved over the next couple of years. But Go is only one year older than Rust and already has a Python-level stdlib and ecosystem.

## Performance

My impression of Rust's performance is that it's extremely good, but especially on memory use. Not having garbage collection is probably its main edge over other compiled languages. See [this page about Rust vs C speed](https://kornel.ski/rust-c-speed) (yes, it's a two-sided comparison!). Basically, Rust is as performant as you can hope to be while offering great protection against memory safety and other bugs that plague every program written in C or C++.

---

<br>

I think Rust is a great language. I want to see it replace Go. I hope it becomes my go-to. I still have a lot of evaluating to do, but my next big project will definitely be in Rust.

Most languages are either high or low level, but Rust is both. It's almost as expressive as dynamic languages, but safer than other static languages and has facilities for when you need really fine control over things like memory layout. There's an even a tutorial on [writing an operating system in Rust](https://os.phil-opp.com/) and honestly, that doesn't sound like a terrible idea. [Bryan Cantrill also gives the idea a lot of consideration](https://www.infoq.com/presentations/os-rust/).

