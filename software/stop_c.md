TITLE Stop writing C
NAV Stop writing C
DESC Write things in languages that let you get things done.

I'm not saying C should die. Don't strawman me. But it should at least recede to a much more restricted role.

C should not be seen as a competitor to other languages. It's *weaker* than other languages. If you tend to think of all languages higher-level than assembly as horizontal, you'd probably benefit from Paul Graham's essay [Beating the Averages](http://www.paulgraham.com/avg.html) (the relevant heading is "The Blub Paradox"). [Simplicity is great](features), but there's such a thing as a feature that's worth it, and [having a feature that's worth it is *better* than not having it](https://yujiri.xyz/software/objectivism). Outside of special cases, it is a mistake to code in anything but the most powerful language you know.

I'm coming to the opinion that kernels and interpreters are just about the only justifiable uses of C - where precise control over memory allocation is important. For anything else, the only real benefit of C compared to other compiled languages is performance. But for the vast majority of applications, the difference between a fast language and a very fast language is just not a priority. Most compiled languages are reasonably close to C on performance. And they can use and compile to C-compatible libraries.

Another advantage sometimes raised of C over more powerful compiled languages, like [Rust](https://yujiri.xyz/software/rust), is compile speed. But which is worse, 3x compile time or 3x the bugs? And 3x the time to debug each one? And 1.5x the code?

I've heard some people on the internet describe C as "battle tested", as opposed to languages like "the experimental Rust". Sure, C is battle-tested. But has C *won* those battles?

[Here's the Hacker News thread](https://news.ycombinator.com/item?id=13966967) where that comment was made. The commenter is fair and points out in defense of the C haters that *most* of curl's security vulnerabilities were a result of C and wouldn't have been possible in Rust.

I think the same pattern is visible in most C projects. See [the list of vulnerabilities in Apache 2.4.x](https://httpd.apache.org/security/vulnerabilities_24.html) and note how many of them are memory safety bugs. Even [Heartbleed](https://heartbleed.com) [was due to a buffer over-read](https://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-2014-0160).

Something untested is better than something that failed the test.

It's actually very similar to how statists always say [anarchy](/protagonism/anarchism) "has never been successful", when all forms of government [have completely failed at every turn for all of recorded history](/protagonism/anarchism_history).

I finally quote [Ian Barland's article on this topic](https://www.radford.edu/ibarland/Manifestoes/whyC++isBad.shtml) for something I find particularly insightful: "C's prevalence has been responsible for the culture of thinking that bugs are acceptable."

Stop writing things in C that don't need to be. Don't write text editors in C. Don't write shells in C. Write things in languages that let you get things done.

