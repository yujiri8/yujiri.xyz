TITLE My baseline for language reviews
NAV My baseline for language reviews
TEMPLATE DEFAULT

When I review progrmaming languages, I often struggle with deciding whether something calls for praise/criticism or should be considered default and not having it would call for praise/criticism. In the interests of keeping my language reviews consistent and fair, I outta try to lay out a "baseline" to compare to.

First: I generally don't think much of "higher and lower level languages shouldn't be compared". I think that's true at the bottom level: things like kernels and interpreters do pretty much have to be written in C or something similar, but outside of that, "low-level" is generally code for "low-power". Paul Graham [made the point really well](http://www.paulgraham.com/avg.html) so I'll just leave it to him (heading "The Blub Paradox").

One major trait I think is legitimately horizontal is interpretation versus compilation. Or to be more precise, it's obviously ideal to be both (Haskell proves it's possible), but my baseline is "either one". Interactive use is incredibly useful, but compilation gives better performance and portability.

* Static typing with inheritance and generics but no sum types or type inference. Type systems missing those features are a hindrance at times, but as long as it has the first two, I consider it a clear (and massive) plus over no type checking. I've lost too much time in my life to dynamic typing to not believe it's a terrible thing. I believe a type system done right is rarely or never a hindrance and enormously beneficial.

* Exceptions (ie. errors throw unless explicitly caught) (but not `else`/`finally`)

* Basic sequence operations: search, insert, remove by index, remove by value, sort, reverse. Most of these should be doable without convoluted expressions like `items = items[:i] + new_item + items[i:]`. Doing *all* of them concisely counts as above the baseline.

* Default function parameters

* Structs or sequences can compare for equality if all their members can (come on)

* Python-like iteration (ie. don't need the antiquated C-style `for (int i = 0; i < length; i++)`)

* Inline branching (conditional operator and ideally short-circuiting). I consider not having this a flaw.

* Syntactic boilerplate level about that of Go (braces, but no semicolons or parens arounds conditions)

* No non-obvious features like comprehensions, generators, defer, template strings, arrow functions

* A decent command-line documentation tool

* No other useful tooling. Compiler doesn't have red tape, but also doesn't help out.

(I'm posting this, but I haven't updated my reviews yet.)
