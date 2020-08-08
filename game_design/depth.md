TITLE A Philosophy Of Depth In Game Design
NAV Depth
TEMPLATE DEFAULT

The most important trait of any competitive game is the concept I call "depth": *room for improvement*, as I define it. This comes from the idea that competitive games derive their appeal over casual games from the quest to improve.

Depth is not state space. A lot of game design philosophers reference the idea of 'state space' - the range of distinct and meaningfully different states the game can have - as a measure of depth, but I maintain that they shouldn't. Games are about making people have fun, thus the real definition of depth is what the player experiences; anything you're measuring in that way is at best a heuristic for measuring depth, and I think state space is a particularly misleading one.

Action games typically have very small state space compared to strategy games, and yet may be harder to master, and therefore have more depth. Of course a criterion that ignores the difference in how easy it is to master the given state space is a bad criterion (if you have several seconds to consider before acting, then you need much more state space to achieve equivalent
depth).

For another example, the unit-on-unit combat mechanics in most RTS games have extremely vast state space and complexity, but they don't create much depth in practice because they're just how we imagine the combat working anyway, so there's nothing to learn there, nothing to master.

<details>
<summary>+</summary>

It's interesting to note that this means the same game *would* be deeper if shown to an alien culture with a different preconception of how such things would work. They'd have to figure it out, and so for them, there'd be more to learn and they could derive more enjoyment from it.

This is not subjectivism. It's recognition that people are the point of everything and that games - like everything else - should be designed with their expected audience in mind rather than aimed at some universal idea as if it exists outside of sentient experience, [which it doesn't](/protagonism/metaphysics).

</details>

Somewhat on the other end of things, the [pitfall of brute-force skills](brute_force_skills) is relevant to any discussion of depth.

Also just because a game is very difficult to *completely* master doesn't mean it has a lot of depth. The principle behind engagement is that it's only fun if and insofar as it's a challenge (your skills are necessary), so if someone is 90% of the way to mastery and the right move is *usually* obvious to them, the game is already mostly ruined for them. This is relevant to CCGs in which no one ever knows how to play perfectly, but the majority of gameplay decisions are usually trivial. (Although in fairness CCGs get most of their depth from deckbuilding rather than playing.)
<!--I still need to explain the emotions somewhere.-->

## Emergence?

A lot of other game design philosophers reference the idea of "emergent complexity versus artificial complexity", saying the former is more valuable even outside of the [ancillary benefits of simplicity](simplicity). I parroted this opinion myself long before I understood the real reason for it: complexity and interactions that are part of the rules (eg. this unit has a damage bonus against that one) [must already be understood before playing if the game is to be fair](trial_and_error). Thus, they can't be part of the quest for improvement that gives complexity its purpose.

Of course, most additions of artificial complexity do add some depth; a game where the units have artificial damage bonuses against each other is probably deeper than the same game with those bonuses removed. Ultimately, every rule is artificial complexity. But it's only the emergent consequences, not the complexity of the rules themselves, that constitutes depth. That's why it's better to make a game where the counter to a slow melee unit is a fast ranged unit than another slow melee unit with a damage bonus. (Even though this isn't a great example because that's a very obvious interaction.)

---

With the concept made clear, there's tons of interesting discussion to be had about how to achieve depth, and certainly a lot of insight I haven't thought of yet.

## Balance

I've always defined balance as "game elements should be at whatever level of power makes the game most fun", and while that definition is kind of useless on the surface, I stand by it because it shows how balance as a goal is actually about serving depth. Bad game balance is that which presents [obvious choices](obvious_choices) that don't significantly contribute to the depth of a game, or can actively stifle it in the case of an overpowered element, which can outmode everything else even if everything else is balanced without it.

Bad balance can be problematic in other ways too. If the same strategy or unit is nearly always optimal it hurts the [variety](deterministic_variety) of game experience as well. And the worst consequence of it is in PvP games where the players don't have access to the same units; in those games it becomes [a concern of fairness](rng) as well.

If I had to summarize a good principle for balance in one sentence, I'd say: "Any two elements that are likely to be alternatives need to be similarly powerful, and yet very different". If one is clearly better, it'll get used even in the situations where the others are at their best. If the difference between them is small, then it usually won't matter which one you pick.

The problem with CCGs is that in them, *all* cards are in a sense alternatives, since you build your deck by throwing together almost any combination of cards you want. Cards can fill different roles, but it's not a hard divide. If none of the spells were decent, you'd run a deck of 40 creatures. If none of the 1-drops were decent, you'd run a deck with no 1-drops; if too many of the 1-drops were overpowered, you'd run a deck with an excess of 1-drops even if you didn't mean to play an aggro strategy. *Every* card in the game has to be somewhat comparable in strength to be balanced.

Whereas in a game like Prismata, because there's no deckbuilding, it's perfectly okay to have some low-impact units in the game like Auride Core that would never get played if people had to build decks in a CCG fashion. Auride Core is still correct to buy fairly often, and creates an impressive number of non-trivial decisions in its use, but its impact on the overall strategy is negligible compared to most other units.

This - that not everything has to be equally powerful in a well-designed game - is something I wasn't able to understand until I played Prismata. [Spellweaver](/reviews/spellweaver) was not only a disappointing game but taught me a very flawed way of thinking about balance.

## Interactivity

Interaction between game elements means that each one should not perform the same in all situations; it should have things it's good against, things it's weak against, and things it combos with. Interactivity is essential for making a game acceptably deep without just burdening the rules with artificial complexity.
