TITLE Haskell Review
NAV Review: Haskell
TEMPLATE DEFAULT
DESC I don't have a settled opinion on the arcane Haskell yet, but I've got some thoughts by now.

# How Haskell and I met

I started my programming journey (effectively) with [Python](https://yujiri.xyz/software/python) and got quite fond of it before I learned [Go](https://yujiri.xyz/software/go) and, after some reluctance, learned to see the upsides of both languages. Python and Go are my two strongest languages to this day, but some time after I got comfortable with Go I realized that I wasn't a huge fan of either language (albeit I still have a soft spot for Python and probably always will). I wanted the best of both worlds. I thought, "There has to be a better language out there, and it's worth my time to find it and learn it".

I tried out Perl, Ruby, Lisp, and probably one other I don't remember, but I didn't end up sticking with any of them. Ruby I lost interest in because I wasn't coming across any substantial difference from Python (and I [didn't hear about any](https://yujiri.xyz/software/nil_comparison) by web search either) so I figured it wouldn't be worth such a massive investment. Ruby is dynamically typed, name errors at runtime, object-oriented... you get the picture. Even if I had ended up preferring it to Python I knew it wouldn't be a big enough improvement to conclude my search.

I gave Perl the longest chance. I was referred to Perl by someone else and told that it was less verbose than Python, not as readable but particularly good for scripts and batch editing - which I always used Python for at the time. I did get far enough into Perl to write an actually useful text processing script which I used to convert all the pose codes to a new paradigm in my VN project Return To The Portrait (I ended up rolling back the redesign after I realized it wouldn't work, but that wasn't Perl's fault, it was [Renpy](https://yujiri.xyz/software/renpy)'s). Still, I never liked Perl and couldn't understand what the hype was about. It has C-like syntax and just generally looked like an uglier version of Python with *nameless function parameters*, *no nested arrays*... you read that right. I also didn't find it to be any more concise (although I was still a novice when I quit so I could've been selling it short).

Lisp I don't remember why I quit; I gave it at most a couple of hours. Probably I just tried it at a bad time in my life where I ended up not having the time to put into long-term skill investments for a week after that, and just never went back to it.

I came across Haskell. I knew very little of functional programming when I started. But when I read in [Learn You A Haskell For Great Good](http://learnyouahaskell.com/introduction#about-this-tutorial) that you can't change the value of a variable, I was too skeptical to not go on.

I had some bad experiences early on and thought about quitting, but someone told me to keep going and I did; eventually I got past the early blocks and started to think I actually really liked Haskell. But that wasn't the end of the road. My enthusiasm dropped over a long time as I watched the cost of learning all this stack higher and higher. It was months before I started to think I understood monads, and months more before I actually did understand them and the rest of the stuff like Writer/Tuple, Reader/Function, State, transformers, and the rest of that black magic.

As of this writing, I have no major accomplishments in Haskell, but I've used it with GTK using [haskell-gi](https://github.com/haskell-gi/haskell-gi) (as well as helped out with the missing GObject Introspection annotation problem there), briefly collaborated on [a Snake game AI](https://github.com/megaweb33/haskell_snaketail_smarties_ryan), [dabbled in AST parsing](https://dev.to/yujiri8/a-haskell-ast-parser-and-formatter-4hp5), and I think I understand enough to use Haskell for something serious.

So while I'm nowhere near Haskell mastery and don't know if I ever will be, I'm done holding off on giving my opinion of Haskell, even though it's incomplete and should be taken with a grain of salt.

<h1 class="good">Interactive AND compiled</h1>

When I found out that there was a language that both compiles to native code and has an interactive prompt, I seriously started to think I'd stumbled onto the perfect language. In this regard at least, Haskell really is the best of both worlds between Go and Python.

<h1 class="good">The type system</h1>

Haskell's type system has so many great ideas. You never see a type error at runtime, yet you can have parameterized types, sum types, interfaces, enums, and you don't suffer from the "losing type information when going through a general function" problem that some other statically languages have. What I mean is: in Go, for example, if you have a function that takes an interface type, does something to it, and returns it, it has to return it as the interface type because it doesn't know what its concrete type is. Meaning, if you pass it a value of a known concrete type, you lose the information of which concrete type it is when it comes back out. In Haskell, the lost type information "reappears" on the other side. This lets you reuse a ton of stuff you wouldn't be able to reuse in other languages.

The type system is also used for error handling! The `Maybe` and `Either` monads offer ways of dealing with failure in a safe, compile-time-checkable way. But you can still use exceptions when they're convenient.

<h1 class="good">Conciseness</h1>

Haskell is generally extremely concise compared to other languages. The syntax for calling functions is shell-like rather than programming-like (which makes sense for a language where there's no difference between referencing a function and calling it with no args), and currying, extremely terse function composition and lambdas, mapping on functors other than lists, and a few other tricks keep things very terse.

<h2 class="good">Type inference</h2>

Not only is the type system extremely flexible and powerful, but you usually don't have to write the types. GHC will infer them as generally as possible: if you have a function that adds two variables, it'll know they have to be some type that's a member of the `Num` class. But it can be any numeric type.

It's still a good idea to put type signatures on top-level bindings as it improves readability and can help puzzle through type errors, but things are helped a lot by not needing type signatures on local variables and lambdas. (You also don't need to [declare](https://yujiri.xyz/software/declarations) local variables, but don't have to worry about name errors.)

<h3 class="good">Helpful compiler</h3>

The type error messages are absurdly arcane, but that's because the concepts are arcane, not because GHC is unfriendly. In fact, GHC can (with warning flags) point out unused variables and imports, and if you misspell or forget to import something, it sometimes knows what you mean or what module it's in. Even with the arcane errors, sometimes it suggests the solution directly (like "probable fix: use a type annotation to specify what a0 should be"), or recommends a compiler extension. It was GHC, not the Haskell community, that introduced me to the wonderful `ScopedTypeVariables` (which really should be part of the language standard).

<h1 class="bad">The learning curve is absurd</h1>

Haskell may be worth it, but *damn* is it hard to understand. To really unleash the power of Haskell you have to understand things like Functors, Applicatives, Monads, Monoids, Monad transformers, and [tons of other stuff](https://wiki.haskell.org/Typeclassopedia) I haven't even touched yet. This is [a very real downside because time spent learning these concepts is time not spent using the language at its fullest](https://yujiri.xyz/software/features).

In another language I could be on my first hour and look up the name of the standard library function to generate random integers and then import the module and get it done. In Haskell, to even start to do a lot of basic things you have to first understand these ridiculously abstract concepts. I remember spending about a day learning how to generate random numbers (and that was *not* my first day with the language).

This might sound like an "it's bad because I don't understand it" criticism, but it's not. A steep learning curve does directly undermines the point of a tool (making work more efficient), even if it can be compensated for.

<h1 class="bad">No struct namespacing</h1>

There's no syntax for accessing a struct field; struct fields are actually functions that take the struct type and return the right part of it. But that of course means they're in the global namespace, so structs can never share field names with each other or with anything builtin.

As a result, there's also no struct inheritance. Yikes.

There's [a compiler extension](https://downloads.haskell.org/~ghc/latest/docs/html/users_guide/glasgow_exts.html#duplicate-record-fields) to sort of fix the namespacing, but [it solves at most half the problem](https://www.reddit.com/r/haskell/comments/8693a3/usefulness_of_duplicaterecordfields/).

You can also get around it with classes (ie. interfaces), by defining an instance of the class for each type, but that's insanely clunky as you have to write all the shared field names three times.

Oh, and God help you if you have to deal with *nested* structs. Since you can't mutate anything, to update a field of a nested struct you have to also update the nested struct itself as a field in the parent struct.

<h1 class="bad">Bad debugging</h1>

Some exceptions don't give stack traces, including some particularly common ones like `Prelude.!!: index too large` and `Prelude.head: empty list` (index out of range errors).

As for logging: pure functions can't do IO so you can't log from within them. And of course, a pure function can't call an impure one, so it takes a pretty onerous refactor to get a log statement deep inside the main logic; one that usually isn't worth it for debugging. (No, the Writer monad is not a solution because it's a comparably onerous refactor for each function it has to touch and still can't log without IO.)

In theory, you shouldn't need to log in a pure function because you can compose them from small pieces that you can prove are individually correct. At least, that's the talking point I heard from some Haskell evangelists when I was new. But that's not how things go in practice. One way or another, complex logic gets complicated, and there are bugs you won't find from testing components in isolation, even ignoring that some (eg. GTK stuff) can be difficult to test in isolation because of the nature of what they do.

<h1 class="bad">Package management is a nightmare</h1>

I'm afraid this is another "it's bad because I don't understand it" criticism, but Haskell's package management experience is just a nightmare. There are several different pieces of software involved: `ghc-pkg`, [Cabal](https://www.haskell.org/cabal/), [cabal-install](https://wiki.haskell.org/Cabal-Install) (which is a separate package from Cabal), [Stack](https://docs.haskellstack.org), and [hpack](https://github.com/sol/hpack#readme) ([the Haskell Platform](https://www.haskell.org/platform/) seems to just bundle a few of those things). All (besides hpack which I haven't used) are poorly documented and seem to freak out with inexplicable behavior at random times (by which I mean, *every* time).

The most obvious solution is just to use cabal-install with GHC directly. Unfortunately, cabal-install is a capricious demon that hates coders and exists to confound them and inflict depression. Sometimes I get errors saying an import is ambiguous because there are two packages it could refer to... and they're the same version of the same package. Sometimes I can import something in the REPL but not build with it. Sometimes I finally get a package to work and then the next day I can't import it because "the package is hidden", and I have no idea what I changed. [`ghc-pkg expose` isn't the solution either](https://www.haskell.org/cabal/FAQ.html#hidden-packages-b). All the time I run into situations where it seems like the only way to fix a problem is to delete and reinstall everything Haskell-related.

Cabal also apparently doesn't install libraries by default, but the initial output you get if you forget the flag *says* it's building a library:
```
In order, the following will be built (use -v for more details):
 - random-1.1 (lib) (requires download & build)
```
Followed by a successful-looking build log and then:
```
Warning: You asked to install executables, but there are no executables in
target: random. Perhaps you want to use --lib to install libraries instead.
```
And sure enough the install failed.

Oh, and the ability to *remove* packages is in [a separate package](https://hackage.haskell.org/package/cabal-uninstall).

Cabal is actually mainly a build tool, so I'm excited to see what horrors I run into with it later.

[Stack](https://www.fpcomplete.com/blog/2015/06/why-is-stack-not-cabal/) was actually created on top of Cabal to supposedly fix the problems with it. Unfortunately, I don't think it does anything of the sort. As far as I can find, it installs things in a way that's inaccessible to Haskell tools outside of Stack, meaning I can only use it as a package manager if I'm also using it as a build tool, and as a build tool it adds at least one new necessary config file *in addition* to the ones Cabal needs, is poorly documented, and that's just not worth it for me.

<h2 class="bad">Branching is a mess</h2>

There are four different syntaxes for branching:

* if-then-else

* case ... of

* guards

* pattern matching in function definitions

And the types of things to branch based on:

* Value comparisons

* Structural comparisons (for example, whether an `Either` value is `Left` or `Right`)

Pattern matching in function definitions is really just syntactic sugar for case expressions; cases support structural comparisons and exact value comparisons, but not arbitrary value comparisons. For example, if you case on a number, you can't have a branch for `x > 5`.

`if` supports anything value-level, but nothing structural, and its indentation doesn't work the way it does in other languages; `then` is supposed to be indented under `if`, meaning nested `if`...`else if` expressions flow to the right (and multiline `let` bindings have [weird quirks](https://stackoverflow.com/a/20826550/12211329) that still confuse me, making it even more difficult to use this workaround).

Guards are an `if`-`elif`-`else` tree-like syntax that can accept an arbitrary value comparison for each guard, but they can only be used in the context of pattern matching. For all the different syntaxes Haskell has for branching, there's just no good way to do a good old `if`-`elif`-`else` tree.

There are compiler extensions to fix this, like [MultiWayIf](https://www.schoolofhaskell.com/school/to-infinity-and-beyond/pick-of-the-week/guide-to-ghc-extensions/basic-syntax-extensions#multiwayif), but they're *compiler extensions*, and they come with quirky syntax of their own (the `if` and first guard both have to be on the same line as the preceding `=` which can be unreasonable).

Oh, and since `let` can only be used inside an expression (so it can't span over multiple guards), the `where` keyword exists which does exactly the same thing but applies to a set of guards (and goes at the end). If only guards could just be used in an expression...

Some links with more information on Haskell's myriad of should-be-but-aren't-redundant branching syntaxes:

[A Gentle Introduction to Haskell](https://www.haskell.org/tutorial/patterns.html)  
[Someone else on Stack Overflow struggling with the mysteries of layout](https://stackoverflow.com/questions/13327374/haskell-defining-a-function-with-guards-inside-a-where)

<h2 class="bad">Recursion is looping, but harder</h2>

Since loops involve state, Haskell doesn't have loops. When mapping over a sequence doesn't cut it, you resort to recursion.

But that doesn't actually eliminate state as far as the benefits of doing so are concerned. Recursion is still effectively state. It's a bit harder to think about because it's a call stack instead of a loop, meaning the first iteration isn't removed from the picture when you loop, but you're still going over the same code with different values in the same names. For all intents and purposes, recursion is looping, but harder.

<h3 class="bad">No default arguments... and it makes the lack of looping even worse</h3>

Haskell's fundamental syntax makes default arguments impossible. And combined with the way looping works, this very often means functions that want to have some sort of strictly internal state, like a running list of results, have to have a wrapper to start it with an empty list.

<h3 class="bad">Strings are a mess</h3>

[5 different string types](https://mmhaskell.com/blog/2017/5/15/untangling-haskells-strings). With overloaded function names for conversion. The OverloadedStrings compiler extension helps, but the string types are still confusing and inconvenient.

<h2 class="mixed">Sequences are a mixed bag</h2>

Haskell is pretty par on convenient list operations. Some are easy: index, search, reverse, sort, delete by value (surprisingly), and of course map, filter, and comprehensions. But not others: negative index, slice, insert, remove (although `take` and `drop` fill the majority of your slice and remove needs), and update at position.

There's the `Seq` type in `Data.Sequence` which is more aimed at being a replacement for mutable lists so it supports inserting/update/remove, but of course since it's a different type (and doesn't have the same interface), you have to convert to use it with anything that's designed to work on the normal list type. `Seq` also doesn't have syntactic support. You have to use it with `fromList` or something similar. And you index it with `lookup i items`. And to make matters worse their function names overlap, so you have to use a qualified import.

---

So I'm still trying to be optimistic about Haskell. It's definitely taught me a lot about type system theory and stuff, and probably fills a substantial use area for me (it's compilation and static typing without the drawbacks of Go) even if it never replaces Python as my go-to. I still don't have a settled opinion on the whole enforced functional purity thing yet. I do think the idea of lazy evaluation is really cool in principle (especially the analogy to [metaphysics](/protagonism/metaphysics)), and referential transparency is cool. But it does make anything involving IO, state, or a shared global environment way more convoluted than it ever was, and as clever as the solutions are, I'm not certain if this whole radical approach is worth it.
