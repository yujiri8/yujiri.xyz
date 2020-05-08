TITLE The evils of unnecessary features
NAV The evils of unnecessary features
TEMPLATE DEFAULT
DESC More features isn't always better. Features have a multitude of downsides, and they have to be useful enough to be worth it.

As a programmer and [Unix](why_unix) loyalist, I hate complexity and redundancy with a passion. I want to do things The One Right Way. But I wanna make an argument that including unnecessary features in software or alternative ways to do the same thing is bad for a multitude of practical reasons, not just the aesthetic appeal of simplicity.

1. Every feature takes time to learn.

2. As an extension of the above, *less important features impede your learning of the more important ones*, because you don't always know which features are the most important until you learn them. The perception of a lot of features can even result in users *never* investing the effort to learn them all, [like I did when I played Starcraft](https://yujiri.xyz/game_design/simplicity).

3. When you find out two ways of doing the same thing that aren't marked as such, you're likely to doubt your understanding of the features. This can cost time as you check to make sure there isn't a difference.

4. The more features, even if they overlap in functionality, the harder it is to make sure none of them have bugs. It gets exponentially more difficult to anticipate how they might all be used together and test everything.

5. This may not apply to all software projects, but for languages, standards or frameworks, more features means different developers might come up with different ways of accomplishing the same tasks. This can lead to confusion when they work together, and in the best case that confusion will cost precious time. (At worst it can cause conflict between developers.)

6. Another thing only relevant to such projects: If it's a project that other projects might have to go out of their way to support (formats and protocols are the best examples), more features raises the cost of implementing support. For example, if [headers are supposed to be case-insensitive](https://tools.ietf.org/html/rfc7230#section-3.2), then applications that use the protocol have to do case conversion when they compare strings. At best this wastes other people's time and inflates their code; at worst it gets overlooked and causes bugs and incompatibility.

7. Lastly, this doesn't concern the end user after it's done but [the opportunity cost of development is massive](https://yujiri.xyz/software/kill_software). Any time the dev spends adding a feature that isn't needed is time not spent adding one that *is* needed, or fixing bugs, or doing something else of value.

[Fun quote](http://quotes.cat-v.org/programming/): "Normal people believe that if it ain't broke, don't fix it. Engineers believe that if it ain't broke, it doesn't have enough features yet."

I think a very underrated insight is this: **features are costs**. *Functionality*, defined as "the total extent to which the software makes things easier than they are without it", is good, and *features*, which are "the quantity of the means by which it provides functionality", are bad. Features are the cost you pay to implement functionality, and you better pick your battles (another excellent cat-v.org quote: "In programming the hard part isn't solving problems, but deciding what problems to solve."). It's like [complexity versus depth in game design](https://yujiri.xyz/game_design/depth). You can have either one without the other. For example, [Nano](https://yujiri.xyz/software/nano) is an editor with relatively few features, but a lot of functionality. `find` and `git` are programs that have tons of features, but achieve tons of functionality with them. QuickBooks is a program that has a staggering amount of features and achieves surprisingly little functionality.
