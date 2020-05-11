TITLE Golang Review
NAV Review: Go
TEMPLATE DEFAULT
DESC Go has several virtues, but also lots of frustrations, horrible error handling, and is needlessly primitive in several ways.

# How Go and I met

I'll start by telling the story of my experience with the language. I was thinking when I wrote [my opinion on Python](python) that that would be a special thing just for then because Python has so much significance to me, but when I started to write this I figured it would be a good thing to do for all my language opinion articles.

It started after my application to work as an intern at [Lunarch Studios](https://lunarchstudios.com) developing [Prismata](/reviews/prismata) was rejected. That day was an awakening for me. Before that everyone I knew had always told me I was super smart and way above the curve in skills for the my age, even though I had spent most of the preceding few years playing games and working almost 0 hours a day. And until that day, I had believed it.

It wasn't just the rejection. It was the interview. I was a lot more disappointed in myself than the interviewer was with how long it took me to solve the clock problem. Even before I got the rejection notice, I realized that I had been fooled. I wasn't super smart. I was normal smart. And it was time to start catching up on skills.

I got back in contact with an old mentor of mine, and ended up his intern on a project written in Go, which he tasked me to learn for it. That was how it started.

At first, I hated Go. And I still stand by most of the complaints I had. But it wasn't until I went back to Python to write [Spacestation Defense](https://github.com/yujiri8/spacestation-defense) that I learned to appreciate the upsides of Go.

So here's what I think of the language now.

<h1 class="good">Concurrency facilities are fabulous</h1>

Go really does make concurrency as easy as its advocates claim. Goroutines are a primitive feature, have a great syntax, can make use of parallelism without multiprocessing, and channels make it a lot easier to communicate between them without worrying about race conditions than it is with threads in other languages. I've done some threading in Python, and while it wasn't nearly as hard or complicated as I was led to believe it would be, it was still a lot more painful than using goroutines.

One of the things I like about channels is how their semantics correspond to Unix pipes. Receiving from a closed channel returns the zero value immediately, sending to a closed channel panics, and you can survive it with a `defer`/`recover` pattern, which is reminiscent of a SIGPIPE signal handler.

The `select` statement also makes non-blocking channel IO easy, as well as buffered channels; and some of the other concurrency stuff is also amazing, like `sync.WaitGroup`.

<h1 class="good">Handles structs and interfaces the right way</h1>

Go handles structs and interfaces [the right way](oop).

<h1 class="good">Tooling is amazing</h1>

Go is the first language I've seen with not only a standard style, but a built-in tool to auto-format your code. I've always been a bit of a maverick when it comes to code style, but when I write Go I'm pleased to know that I'll just run `go fmt` on my code and it'll look just like everyone else's without me having to worry about whether I'm violating the style convention or put any manual effort into following it. I love having an autoformatter tool just put an end to most disagreements and decisions about style and let the language make everyone consistent.

![coding style](coding_style.jpg)

But it's even better than that. [Goimports](https://godoc.org/golang.org/x/tools/cmd/goimports) is an improved version of `go fmt` that also can usually handle your imports for you, adding missing ones and removing unused ones and even automatically sorting them, and there are also some really good third-party vetting and linting tools, like [golangci-lint](https://github.com/golangci/golangci-lint).

<h2 class="good">Excellent built-in documentation</h2>

Go has the best documentation of any language I've seen. Not only is there a built-in command line tool that can autogenerate documentation for any code from its comments and type signatures, but the standard library is usually really good about having those comments answer any questions that could possibly come up.

<h2 class="good">Compilation to native code and shared libraries</h2>

Go not only compiles to native code, but it does it with static linking by default, which makes it easy to ship a binary without worrying about dependencies. It still can link dynamically though, and a Go program can even compile to a shared library itself and be used by C code. The process is a bit icky, but I love that it can be done.

<h2 class="good"><code>defer</code></h2>

The `defer` statement, which queues a function call for execution when the current function exits, is incredibly useful. It's useful particularly for errors (making sure something gets executed without putting it in every error-handling block), but even outside of that, I use it all over the place. If you ever have something you want executed at the end of a function and the function could end at multiple places, `defer` comes to the rescue, and that's surprisingly often in my experience.

<h2 class="good">Massive ecosystem</h2>

Go has been around for less than half as long as Python, but somehow the wealth of packages and libraries for it seems to be almost if not equally vast. Most of it's on github; `go get` is a built-in command to install them and works like a charm, and [govendor](https://github.com/kardianos/govendor) is a more sophisticated package manager that makes it easy to install all dependencies of a project with a single command.

<br>

---

<br>

<h1 class="bad">Error handling is verbose, tedious and mistake-prone</h1>

Most Go functions signal failure by returning an error instead of raising an exception. They do this with a separate return slot - for example `os.Open` has the signature `Open(name string) (*File, error)`. So to handle errors sensibly in Go, you have to catch the error return value after every function call that might possibly return one and add the signature
```
if err != nil {
	return err /* alternately log.Fatal(err) */
}
```
Which gets *really* verbose when you have to add this after almost every statement. Worse, you still don't get any context doing this. If an error gets returned through a chain of 5 functions you have only the original error message when you get to the point where you log it, not anything to indicate how this function got called. In my experience the standard way of getting around this is with [this non-builtin package](https://github.com/pkg/errors), and that still involves writing all the error messages yourself and getting no line numbers.
```
if err != nil {
	return errors.Wrap(err, "When doing X")
	// The returned error will be, "When doing X: ..."
}
```
In addition to how tedious all this is, the compiler doesn't even help you out here. It doesn't print a warning if you leave an error unchecked (If you're catching from a function that returns multiple values then it'll make sure you have the right number of variables, but if you don't try to catch the return value of the function at all then the error just gets silently ignored.) Especially when 90% of the time what you do in these incessant error handling blocks is just return the error or `log.Fatal` if it's top-level), why not have that be the default behavior? Why should our language *default* to silently ignoring every error we don't specifically handle? That's just asking for debugging nightmares.

Just to drive home how indefensible this design is, I want to mention that at least two other major languages have ways of handling errors that are similar to Go but at least fix the problems with silently ignored errors. These are Haskell and Rust. In Haskell the `Either` Monad is essentially equivalent to how Go handles errors (you have to check them manually); but the type system forces you to check them because before you do you have the wrong type - you have an `Either`. You have to `case` on it and find out whether the value is `Left` (a type indicating failure) or `Right` (the type it returns on success).

As another big advantage of Haskell's `Either` system, they only take up one return slot, so you can still compose functions than return errors and if the first one returns a `Left` then the others won't try to proceed; if the first one returns a `Right` value then the others receive it as normal and proceed down the chain.

I don't know Rust myself, but I've read that it has a very similar system: any function that could fail returns a `Result`; and the type system forces you to make sure the Result is a successful one before you do something with it.

There's actually another substantial drawback to Go's error-handling system: it doesn't work well with `defer`. Since you have to manually check the error to not silently ignore it, any error returned from a deferred call will get ignored. As far as I'm aware, the only way to get around this is to do something like:
```
defer func(){
	err = theThingIWantedToDefer()
	if err != nil {
		doSomething()
	}
}()
```
But that's so much clunkier than a normal `defer` call that we sometimes just leave errors here unchecked, if an error's unlikely to occur.

<h1 class="bad">No generics</h1>

Generics are an insanely useful concept for code reuse. In Python or [Javascript](javascript) or Haskell or really most other languages, even if they didn't include a built-in function to, say, find the max of a list of numbers, you could at least write it once and it would work on lists of any numeric type or any other value that can be meaningfully compared with `<`/`>`. In Go not so. There are a few built-in things like `append`, but you can't define your own function that takes type `slice`; it has to be limited to a slice of some particular type.

I've had a Go project where we wrote a function called `MaxInt`. It accepted `[]int` and returned `int`. But then we changed the values we were using it on to be `int32` instead of `int`, and `MaxInt` no longer worked on them because the argument was the wrong type. I changed `MaxInt` to `MaxInt32`, but if we ever have a need to do this on `int`s or `int64`s anywhere in the codebase, we'll have to make a separate function.

It's not like this was necessary or anything. Haskell's type system shows us how we can support generics without sacrificing any of the benefits of a strict type system. In Haskell this function's type signature would be `Ord a => [a] -> a` (translation: it takes a list of any type, denoted `a`, such that `a` can be meaningfully ordered, and returns a single value of the same type). You'd write it once and it would work on Ints, Floats, Chars, and anything else that has some defined behavior for `>`/`<`; while still giving you a compile-time error if you try to use it on something that isn't a list or a list of things that can't be meaningfully ordered.

Go can sometimes get around this by using the type `interface{}`; this is how `sort.Slice` in the standard library is able to get by (see below for why it can't take `[]interface{}`); but that sacrifices all the benefits of static typing. Since it only requires that its argument satisfy `interface{}`, Go can't even check at compile-time that it's getting a slice, so `sort.Slice` compiles successfully and then panics at run-time if you use it on something that isn't a slice. And this still wouldn't work if you wanted to catch the return value (`sort.Slice` works in place), because it would have to return `interface{}` because that's all the function knows about its type.

<h1 class="bad">Get ready to reinvent the wheel... <i>a lot</i></h1>

Lots of common tasks in Go, particularly slice operations, are extremely verbose. Examples:

* Append an element to a slice? `items = append(items, item)`. Not terrible, but a lot more verbose than how Python or Javascript does it. Annoying if `items` is a struct field or otherwise has a long name.

* Concatenate two slices? `items = append(items, others...)` Again, not terrible but uglier than most other languages.

* Deleting an item from a slice: `items = append(items[:i], items[i+1:]...)` Yuck... I gotta really look at that to tell what's going on (especially since we're using the *append* function to *remove* items... that's confusing). Also, this doesn't give you the item removed. There's no `pop`. If you want to do that you need to assign from it with a separate statement beforehand.

* Insert an element into a slice at an arbitrary position? This is where it gets terrible. `items = append(items[:i], append([]T{item}, items[i:]...)...)` where T is the type of the items.

* Want to try *reversing* a slice? Go's about to throw you for a loop.
	```
	for i := len(items)/2 - 1; i >= 0; i-- {
		opp := len(items) - 1 - i
		items[i], items[opp] = items[opp], items[i]
	}
	```
	As an additional downside of this not being a built-in oneliner, every time you type this out there's a chance
	you'll make a mistake, and it'll probably be a logic bug that'll take at least a good five to ten minutes to track
	down if it's part of a big project.

* You want to even just test for membership in a slice? Time for another for loop.
	```
	var found bool
	for i := range items {
		if items[i] == item {
			found = true
			break
		}
	}
	```
	Yes, that's literally what you have to do.

* Want to find out if two slices have all the same elements? `==` is an `invalid operation: slice can only be compared to nil`. Better use a for loop.

* map, filter, reduce? As if. Back to the for loop.

* Maximum or minimum of a sequence? No problem! No problem for numbers, at least! `math.Min` and `Max` have you covered... well, if your numbers are float64's, that is. If you need to find the max or min of ints you're gonna roll your own.

* Well, at least Go supports negative indices, right? Um... about that...

And I didn't reach these conclusions all on my own! [The github golang wiki confirms that these are really the simplest ways to do these things in Go](https://github.com/golang/go/wiki/SliceTricks) (insert and delete have alternate solutions but they're multi-line and arguably not any more readable). For a language that's supposedly so pragmatic, this is inexcusable.

<h2 class="bad">Compiler red tape hampers experimentation in debugging</h2>

The Go compiler won't compile a program with an unused import or variable (although it does allow unused functions, function parameters, and global variables). It's great to have the compiler *warn* us about these things, but *preventing* us from compiling it is honestly absurd. Very often when I'm debugging I comment something out and it results in an unused variable or import, and Go refuses to compile. Ugh... gotta go back into the source and comment out the declaration too.

The [Go FAQ](https://golang.org/doc/faq#unused_variables_and_imports) actually address this:

> First, if it's worth complaining about, it's worth fixing in the code. (And if it's not worth fixing, it's not worth mentioning.) Second, having the compiler generate warnings encourages the implementation to warn about weak cases that can make compilation noisy, masking real errors that should be fixed.

This reasoning is so obviously wrong it's hard to believe the person who wrote it was sincere. Yes, it *is* worth fixing, which is why I don't plan to put it in the final commit! It's *not* worth delaying my test and forcing me to fix code that *will never be run outside of this test* so that it takes me longer to get the final commit ready and fixed.

And their point about "encourages the implementation to warn about weak cases..."? Arguing that the language spec should treat unused code as fatal errors because treating it as non-fatal will lead to people writing Go compilers that will output so much unimportant noise that the unused code warnings will get ignored is such an insane stretch that you might as well say Go shouldn't allow programs to log to stderr unless they're crashing because that will lead to people writing programs that generate so much log volume that important stuff will get ignored.

Compilers are for verifying that code works and making it executable; *linters* are for things like this. In fact, `go vet` comes with Go and does this exact thing.

<h2 class="bad">No support for default values in function args or struct fields</h2>

It's not a huge deal, but I've frequently been bitten by the inability to have a function parameter with a default value. If there's some obscure option that a function rarely needs to vary then it needs to be specified every time. Sometimes in another language you'd use an optional parameter because most callers just want to use the default value, but in Go if you ever change that default value, you also have to change it in every place that calls the function. It also goes a long way toward making code less readable.

The standard library suffers from this with functions like `strconv.FormatInt`, which needs a base parameter, and `strconv.FormatFloat`, which needs *four* parameters.

Not supporting default values also increases the need for comments, since often that means you just have to say what the parameter should be by default in the docstring.

You can't do default field values in structs either, so to accomplish that you have to write a wrapper constructor (which means writing all the field names three times - the same problem I have with Python constructors). It doesn't seem like it would be hard to support this. The syntax for a Go struct definition already has an obvious place for it:
```
type Stuff struct {
	1 Field1 int
	"Hello" Field2 string
}
```
I don't know any language that does this, but I don't really see what the aversion is. I've run into a quite a few situations where it would be useful.

<h3 class="bad">Interfaces sometimes don't match when they should</h3>

A struct with a method that returns a pointer to a struct that implements an interface isn't considered to implement an interface with a method that returns that interface; `[]struct{}` can't be passed for `[]interface{}`.

[The Go FAQ](https://golang.org/doc/faq#covariant_types) discusses this and explains that they implemented it this way because "If two methods return different types, they are not doing the same thing. Programmers who want covariant result types are often trying to express a type hierarchy through interfaces. In Go it's more natural to have a clean separation between interface and implementation."

![vague and unconvincing](vague_and_unconvincing.jpg)

<h3 class="bad">No way to capture only one return value of a function inline</h3>

A function that returns two values has to be called and caught on its own if you only want one value. You can't do `x = func1(func2()[0])` because you'll get `multiple-value func2() in single-value context` even if func1 takes one argument and it's the same type as func2's first return value. This isn't a huge deal, but it's an annoyance that forces you to write more verbose code.

Similarly, while Go does support composing functions that return multiple values with other functions that accept the same types, this only seems to work as a special case, not with more arguments. For example,

```
func main() {
	f1(f2())
}
func f2() (int, int, int) {
        return 4, 5, 6
}
func f1(a int, b int, c int) {
        fmt.Println(a, b, c)
}

```
works, but
```
func main() {
        f1(f2(), 6)
}

func f2() (int, int) {
        return 4, 5
}
func f1(a int, b int, c int) {
        fmt.Println(a, b, c)
}
```

Fails with `not enough arguments in call to f1` and `multiple-value f2() in single-value context`. And yes, I tried replacing the call with `f1(f2()..., 6)`; that gives `unexpected literal 6, expecting )`. Why implement this as a confusing special case instead of just allowing it to work the way Python does? Go has the `...` equivalent to Python's `*`. Why not let it work consistently?

<h3 class="bad">Gotchas with <code>nil</code></h3>

There are some infamous gotchas related to `nil`, many of which seem like they could've been implemented better.

Maps and channels both require `make` to initialize them; forgetting to do this and using the standard `var x Type` syntax leaves them as `nil`, with disastrous results. If you make a map with `var dict map[string]string` and then try to assign to an entry in the map, Go compiles happily and then panics.

It's much worse with channels. A send to or receive from a `nil` *channel* [blocks forever](https://dave.cheney.net/2014/03/19/channel-axioms) instead of crashing. Single instances of this mistake have costed me hours.

There's also a gotcha with `nil` and interfaces. Check out this code:
```
package main

import "fmt"

type Cat struct {}

func (c Cat) Speak() {
        fmt.Println("Meow")
}

type Animal interface {
        Speak()
}

func main () {
        var c *Cat
        listen(c)
}

func listen(a Animal) {
        if a == nil {
                return
        }
        a.Speak()
}
```
This code will compile and then panic at runtime with `panic: value method main.Cat.Speak called using nil *Cat pointer`.

But how is that possible? I checked if it was `nil`!

The reason is because of how interfaces work under the hood. The [Go FAQ](https://golang.org/doc/faq#nil_error) explains it, indicating that a lot of people have been confused by it. In brief, interfaces are never `nil` if they have a defined concrete type, even if they hold a `nil` pointer of that type.

<h3 class="bad"><code>var</code> versus <code>:=</code> - meaningless decision</h3>

You have to declare a variable before you can use it, and there are two ways: `var val = 5` or `val := 5`. Most of the time they're interchangeable, but it's worse than the string quotation thing in Python and Javascript, because they're actually not interchangeable, and some of the differences are rather subtle.

* `:=` can't be used outside of a function; you have to use `var` for global variables. I'm not sure what the reason for this is, but it's what the designers decided.

* `var` requires that *all* variables on the left are new. This will fail to compile:
	```
	var x = 5
	var x, y = getMeTwoInts()
	```
	But this works:
	```
	var x = 5
	x, y := getMeTwoInts()
	```
	And you might think looking at that that the takeaway is that you should default to `:=` inside a function. But some Gophers would argue that preventing repeat declarations helps avoids bugs - there *are* some cases in other languages where I've been bitten by declaring a variable with the same name as an old one and not realizing it. And there are some additional cases where you can't use `:=`...

* You can't use `:=` for initializing a nil pointer. `x *Thingy := nil` fails with `non-name x *Thingy on left side of :=`, `use of untyped nil`, and `undefined: x`. You have to use  `var x *Thingy`. Similarly, when initializing a non-pointer struct to its zero value, while you can use `x := Thingy{}`, `var x Thingy` is arguably nicer looking. I don't know of any times where you can't use `var`, and we'd certainly prefer our style to be consistent...

And this is unfortunately one of the areas where `go fmt` doesn't have an opinion.

<h3 class="bad">Console input is a mess</h3>

`fmt.Scan`, `fmt.Scanln`, `fmt.Scanf`, `bufio.Scanner`, `bufio.Reader`... which one of these should we use to read console input? I once spent several hours messing around with these and couldn't find a way that was safe against newlines, whitespace, and Ctrl-D. The solution used in [this project](https://github.com/rwestlund/gosh) was to make a `bufio.Scanner` on `os.Stdin`, call `scanner.Scan()`, check the bool result, if it's true then call `scanner.Text()` to get the entry, if it's false then call `scanner.Err()` to get any error. In no other language is this such a complicated job.

<h3 class="bad">Different int types can't be used together without explicit conversion</h3>

I'm somewhat skeptical about differentiating between different sizes of ints in the first place. I'm sure there are performance drawbacks to how Python does limitless, auto-reallocating ints, but I'm skeptical that they're big enough to justify a modern language distinguishing these types. But Go doesn't just distinguish the different types; if you have an `int` and an `int32` or `int64`, you can't do math with them together, you can't even compare them. It doesn't seem like there's any way at all in which "is this int32 less than or greater than this int64" is an unmeaningful or unclear question. I've had to write simple math expressions of the form `x = round(y*z)` but needed three type casts: `intVar = int(math.Round(float64(otherIntVar) * float64(float32Var)))`, and ended up having to span multiple lines. I think a little type coercion is warranted here.

[The Go FAQ](https://golang.org/doc/faq#conversions) discusses this too. Their first point doesn't apply to `int32` with `int64`, the next two also wouldn't be problems for this case since an `int32` always fits in an `int64`, and the concerns about the compiler are probably valid. I don't think it's necessarily a mistake they've made that they haven't implemented this feature, but the fact is that *only* burdens the compiler and not the usability of the language. And my points here are supposed to be about how worth using the language is rather than how smart its designers were (see how I mentioned the ecosystem which obviously isn't a trait of the language itself).

<h3 class="bad">Magic comments</h3>

Some built-in tools, like `go generate`, read magic comments in the source code and *can even incorrectly interpret them inside multiline strings*. (Source: `go help generate` output, Go version 1.12.8.)

Literally the whole point of comments is that they don't do anything. Any built-in tool that reads and reacts to comments in a way that affects the functionality is doing something deeply wrong on a philosophical level.

And yes, I know that the possibility of it actually interpreting something that isn't supposed to be a `go generate` annotation is extremely small, but that doesn't excuse the choice to overload an existing symbol when there are tons more not being used. They could have used @ or # for annotations.

I forgive [GObject Introspection](https://gi.readthedocs.io/en/latest) because that's a technology that isn't part of C; it had to build on top of it and I can't think of a better way to provide that wonderful functionality. But Google developers were in control of both Go and `go generate`; they could have and should have just added a dedicated syntax for annotations that would be read by Go tools.

---

So at the end of the day, if I'm saying whether Go is a "good" language or not, I'm gonna have to say no. Despite how much positive attention it seems to be getting on the internet, I think it's just not above average. It doesn't seem to have been made with the idea of learning from the flaws of other languages and combining good ideas from them.

<!--named arguments: https://github.com/golang/go/issues/12296-->