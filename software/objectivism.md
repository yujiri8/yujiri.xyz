TITLE Objectivism in software
NAV Objectivism in software
TEMPLATE DEFAULT
DESC There IS such thing as a "better" language, tool, or framework; stop dismissing it with "they're just different".

There are [a lot](https://dev.to/imohd23/comment/lldh) [of people](https://dev.to/cyberhck/comment/l1hg) in the software community who express the attitude that neither of two things - be them languages, tools, frameworks, or style conventions - is better or worse; they're "just different". Sometimes they'll [go as far as to say](https://devrant.com/rants/2416266/why-do-people-compare-languages-like-c-vs-java-c-vs-python-c-vs-elixir-all-langu) "People compare languages because they are retarded really" (it's in the comments there).

Obviously, non-vertical differences are huge in software. There are tons of ways two things can be better for different situations. But there are also, undeniably, ways a tool or language can just be better than another in general (not to say *strictly* better, but better *overall*, and to a large enough extent that the other [should be abandoned](https://yujiri.xyz/software/kill_software)).

For syntax: imagine a language where it's required to use two tabs as indentation. Or one that required `;;;;` as a line terminator, so that `;` could be valid in an identifier as long as there weren't four in a row. Does anyone really believe that these design choices would be "just different"?

Or imagine language X always uses snake_case for stdlib identifiers, language Y always uses camelCase, and language Z uses both with no pattern, just based on whatever the designers felt like at the moment. Obviously, all other things the same, Z is objectively the worst because you can't predict which one an identifier will use. It'll lead to lost time as everyone constantly forgets which convention different functions use. That's **objectively worse**.

Some folks [did a study indicating that snake_case is more readable than camelCase](http://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf). Now, it's possible to critique the legitimacy of the study or argue that camelCase taking up less width is an advantage that outweighs this, or it's possible to argue that the width difference cancels this out more or less exactly, but it *is* a matter of pros and cons, not just stylistic preference (though obviously readability is affected by what you're used to).

To give some more semantic examples, surely it should be considered a *flaw* that Javascript arrays get silently infected with 'empty items' if you assign pass the end. Surely it's a *flaw* that Go doesn't support generics and requires for loops for almost any slice operation, that Python has no type checking, and that Haskell doesn't support default arguments. And that doesn't even mean all of these are *mistakes* - with some of these, there are valid reasons the developers made the choices they did. Maybe a feature would've been nice, but there was no practical way to implement it (with Haskell, default arguments are incompatible with automatic currying as far as I can tell). But they are *flaws*.

And if languages have different numbers of flaws, it follows that one can be *better* than another, not just different.

Now, it's possible that two *given* languages are roughly equal in quality, or that they differ in too many non-vertical ways, and which pairs are is a matter for debate. But what can't be reasonably disputed is that it's *possible* to have an objective gap in quality between two languages. So please, next time you see someone post a criticism you don't like, ask yourself if it might actually be legitimate before you respond that it's "just different".
<!--
I happen to believe Python's reliance on indentation is better than braces, and I've argued why in [my Python review](https://yujiri.xyz/software/python#streamlined-and-readable-syntax). Still open to anyone pointing out advantages of brace syntax, but not really open to people telling me it's just a stylistic choice and can't be better or worse.
-->