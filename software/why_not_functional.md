TITLE Why I don't believe in pure functional programming anymore
NAV Why I don't believe in pure functional programming anymore
TEMPLATE DEFAULT
DESC Even with all the elaborate abstractions, state would never be *easy*.

My first contact with pure functional programming was [Haskell](https://yujiri.xyz/software/haskell). The idea sounded bizarre, but fascinating. I had faith that once I'd learned Haskell, I'd understand how to use things like monads to replace the uses of state and side effects.

But that wasn't what happened. After reaching a medium level in Haskell, what I learned was that although the functionality of state and side effects could be replicated, it was only in the sense that everything can be replicated in assembly. Even with all the elaborate abstractions, state would never be *easy*. It was a huge weakness of functional programming that would plague almost any sizable project.

<!-- Pure functional programming forces all causation to be explicit, and that's exactly its pitch, but implicit causation is useful. This is the reason [DBus]() and [Redux.js](https://redux.js.org) exist: centralized . -->

And I'm not blaming the paradigm for the flaws of a language. Most of my gripes with Haskell aren't the fault of pure functional programming ([Idris](https://deque.blog/2017/06/14/10-things-idris-improved-over-haskell/) is a remake that solves most of them), but this one is: state becomes unreasonably difficult to represent. Not 'difficult' in the sense that it was still hard to figure out once I understood the concepts, but that it was a ton of work to make something impure. Making a function deep in the logic log or be affected by an environment variable required everything below it in the stack to be refactored. Using multiple monads together required monad transformers which meant comically convoluted type signatures (which you would alias) and a sprinkling of *glue* functions like `liftIO` and `runWriterT`.

Are there good things about pure functional programming? I'm not sure. You probably expected me to say yes, because we're always expected to hedge like that when we make extraordinary claims. But I'm not sure because I've seen how every other good idea in Haskell can be had without banning side effects. The main demonstration is [Rust](https://yujiri.xyz/software/rust).

Rust was influenced by the ML family (the same family that Haskell comes from). It has algebraic data types and a constraint system for type parameters. That lets it implement `map`, `filter`, comprehensions (`filter_map`), `zip`, monadic short-circuiting for the error-handling sum type, and other hallmarks of functional programming, with as much type safety and code reuse as any functional language can offer.

But Rust is an imperative language. And the nail in the coffin is this: **everything is immutable by default**. Rust still makes mutation explicit. And I think that provides most, maybe all, of the benefits of pure functional programming.

What is Rust missing compared to Haskell and Idris?

* Read-only state and side effects that don't mutate program state can still be implicit. But the above story convinced me that this is a good thing. There's a mutual exclusion here: either the language *allows* you to do this implicitly, or the language makes them explicit, which can only be done by *preventing* the uses of implicit causation. So even if seeing these things in a type signature is nice sometimes, there's no way I'd choose a language that does it, all other things the same.

* You can't write code polymorphic over monads. But... when is this ever actually useful? This ability doesn't map to any particular idea that can be expressed outside of the langauge; it's just a type system hack. I'm not sure you ever need to do this if you're not working in a language that requires such hacks to get things that just come naturally in imperative languages.

And that's why I don't believe in pure functional programming anymore.
