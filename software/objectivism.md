TITLE Objectivism in software
NAV Objectivism in software
DESC There IS such thing as a "better" language, tool, or framework; stop dismissing it with "they're just different".

There are [a lot](https://dev.to/imohd23/comment/lldh) [of people](https://dev.to/cyberhck/comment/l1hg) in the software community who express the attitude that neither of two things - languages, tools, frameworks, or style conventions - is better or worse; they're "just different". Sometimes they'll [go as far as to say](https://devrant.com/rants/2416266/why-do-people-compare-languages-like-c-vs-java-c-vs-python-c-vs-elixir-all-langu) "People compare languages because they are retarded really" (it's in the comments there).

Obviously, non-vertical differences are huge in software. There are tons of ways two things can be better for different situations. But there are also ways a tool or language can just be better than another in general (not even necessarily *strictly* better, but better *overall*, and to a large enough extent that the other [should be abandoned](https://yujiri.xyz/software/kill_software)).

I see this subjectivism applied to syntax especially often, so let me give an extreme example to show that such a thing as better and worse syntax exists. Imagine a language where it's required to use two tabs as indentation, or one that required `;;;;` as a line terminator, so that `;` could be valid in an identifier as long as there weren't four in a row. Does anyone really believe that these design choices would be "just different"?

Or imagine language X always uses snake_case for stdlib identifiers, language Y always uses camelCase, and language Z uses both with no pattern, just based on whatever the designers felt like at the moment. Obviously, all other things the same, Z is objectively the worst language because you can't predict which one an identifier will use. It'll harm productivity as everyone constantly forgets what uses which convention.

Some folks [did a study indicating that snake_case is more readable than camelCase](http://www.cs.kent.edu/~jmaletic/papers/ICPC2010-CamelCaseUnderScoreClouds.pdf). Now, it's possible to critique the legitimacy of the study or argue that camelCase taking up less width and keypresses is an advantage that outweighs this, but it *is* a matter of pros and cons, not just personal preference (though obviously readability is affected by what you're used to).

Consider the history of your favorite language. Do you think it was an "improvement" when the last new feature was added? If so, aren't you admitting that the current version is *better* than the old one? And if so, why can't another language be better or worse than the current version of yours?

Now, it's possible that two *given* languages are roughly equal in quality, or that they differ in too many non-vertical ways, and which pairs are is a matter for debate. But what shouldn't need to be debated is that it's *possible* to have an objective gap in quality between two mainstream languages. So please, next time you see someone post a criticism you don't like, don't respond that it's "just different".
