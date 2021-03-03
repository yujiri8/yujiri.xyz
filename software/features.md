TITLE Features are costs
NAV Features are costs
DESC Features are costs, and they have to be useful enough to be worth it.

As a programmer and [Unix](why_unix) loyalist, I hate complexity and redundancy with a passion. I want to do things The One Right Way. But it's not about the aesthetic appeal of simplity; including unnecessary features or alternatives in software is bad for a multitude of practical reasons.

1. Not only do features take time to learn, but *less important features impede your learning of the more important ones*, because you don't always know which features are the most important until you learn them. The perception of a lot of features can even result in users *never* investing the effort to learn them all, [like I did when I played Starcraft](https://yujiri.xyz/game_design/simplicity).

2. Features make it harder to avoid bugs, especially since a linear increase in features causes an an *exponential* increase in the number of ways they might be used together.

3. This mostly applies to things like languages and frameworks, but different ways of doing the same thing mean different users might prefer different ones, which can make it harder for them to understand each others' code and collaborate.

4. [For formats and protocols, it's even worse because features raise the cost of implementing them and lead to incompatibility](https://yujiri.xyz/software/specs_are_contravariant).

5. Lastly, this doesn't concern the end user after it's done but [the opportunity cost of development is massive](https://yujiri.xyz/software/kill_software). Any time the dev spends adding a feature that isn't needed is time not spent adding one that *is* needed, or fixing bugs, or doing something else of value.

[Fun quote](http://quotes.cat-v.org/programming/): "Normal people believe that if it ain't broke, don't fix it. Engineers believe that if it ain't broke, it doesn't have enough features yet."

I think this insight is very underrated: **features are costs**. *Functionality*, defined as "the total extent to which the software makes things easier than they are without it", is good, and *features*, which are "the quantity of the means by which it provides functionality", are bad. Features are the cost you pay to implement functionality, and you better pick your battles (another excellent cat-v.org quote: "In programming the hard part isn't solving problems, but deciding what problems to solve.").

It's like [complexity versus depth in game design](https://yujiri.xyz/game_design/depth). You can have either one without the other. For example, [Nano](https://yujiri.xyz/software/nano) is an editor with relatively few features, but a lot of functionality. `find` and `git` are programs that have tons of features, but achieve tons of functionality with them. QuickBooks is a program that has a staggering amount of features and achieves surprisingly little functionality.
