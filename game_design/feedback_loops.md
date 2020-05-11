TITLE Feedback Loops And Comebacks
NAV Feedback Loops And Comebacks
TEMPLATE DEFAULT

<!--There are basically two common (wrong) opinions on feedback loops.-->
"Feedback loops" are a thing a lot of people talk about; a lot of people think positive feedback loops are bad and negative
feedback loops are good, other people think negative feedback loops are bad and positive feedback loops are good, but those
people are all wrong; as usual I'm right about everything and I'm going to share my great wisdom.

The positive feedback loop, in which being ahead makes it easier to get even farther ahead, is present in most games where you
control units and win by destroying enemy units (Chess, [Prismata](/reviews/prismata), Starcraft), since losing
units also makes it harder to protect the units you have left. The general argument against these mechanics is that they cause
a small early mistake to quickly snowball into an insurmountable disadvantage such that the player who makes it will lose
*even if they play better than their opponent for the rest of the match*. This can lead to very understandable feeings
of frustration.

Lunarch Studios, the developers of Prismata, [argue](http://blog.prismata.net/2014/07/15/luck-in-games) that this isn't
a problem because players can just resign when they see they're in an impossible situation. And the thing is, *for Prismata*,
that works.

In Prismata you're not disincentivized to resign because the game is very blunder-resistant after the first few turns - that is,
it's hard to make a critical mistake once into the meat of the game - and so you know the odds of your opponent slipping up and
letting you come back are essentially nil. But Chess is all the about the tactics; it's far more common for someone with a
material and/or positional lead to mess up and lose, which makes players who are behind feel like they have to play on incase
this happens. The only reason Prismata even regularly gets past the first 8 turns or so is because it's hard to tell who's
winning. In Chess you can easily measure material advantage; positional advantage exists but is less important. In Prismata you
have to count not only the Drone difference and attack difference, but the tech difference (which is un-quantifiable),
differences in the lifespan of your attackers and the click abilities you have access to, and sometimes even the supply
difference; and so players usually aren't certain that they're behind at all until they're severely behind. This means you
almost never actually play with the sure belief that you're behind, nullifying all the psychological downsides.

Some people might argue that Go has a similar problem even though it doesn't technically have a feedback loop because decisions
later in the game are usually less important (outside of life and death). But Go has two solutions up its sleeve to avoid the
frustration: first, the scoring. Even if you fall behind and aren't able to catch up because skill has become less
efficient, your disadvantage doesn't snowball into a total loss; there's a non-binary score at the end and you can see that your
efforts are still reflected. Even if a loss by 1 point and a loss by 100 points are treated the same for the sake of rating
adjustment and tournament results they're very different for player psychology. I don't think anyone who goes into the game
without a preconceived belief that it has this problem would feel frustrated by it.

Secondly, while Go *is* very blunder-prone (much more than Chess), you can actually take advantage of this to solve the
effect. If you're far behind and you can only win if the opponent blunders you don't just wait around for it. They'll play it
safe. (Go also has a stronger ability than most games to choose how "risky" you want to be.) So what you do is start a crazy
battle - try to kill a group that probably can't be killed or something - and if you succeed, you got your comeback, and if
you fail, you've probably fallen even further behind from trying and you can now resign sure that there's no chance of winning.
You're never incentivized to prolong a game with the feeling that nothing you do matters.

And there are still arguably some downsides to a positive feedback loop. The winning player might know they've won before the
losing player knows they've lost, and then the winning player could have to play for a little while knowing the outcome. But
this is a small problem because it's far less upsetting to play knowing you've won than to play knowing you've lost.

Making the game effectively over before it's technically over creates some trolling possibilities as well; some people
will grief their opponents by going AFK once they know they've lost, which can't happen in a game where the game mechanically
ends as soon as that happens. But this is also a small problem since very few people do this and there's usually a limit
to how long it can go.

## But it gets worse...

Some people who have a sufficiently strong hatred of positive feedback loops advocate actually doing the opposite thing and
making the game get harder on whoever's in the lead. I've never actually heard anyone criticize this idea, so I'm going to
be the first to do so in a noble attempt to save the game industry. The negative feedback loop is significantly worse for
a variety of reasons.

First of all, this is far *more* frustrating to the player who's in the lead than a positive feedback loop is to the
player behind, because a negative feedback loop punishes you for doing the very thing you were supposed to do. Not
only that, but this time you can't resign your way out of it, because it's happening to the player who's winning.

And not only that, but this may actually *increase* the winrate of the higher-skilled player. The weaker player who was
graced by this effect and took the upper hand will now have a harder time keeping that upper hand. In a positive-feedback
game like Prismata the weaker player who gains an advantage early will go on to win unless they get *severely* outplayed
in the following turns. This is part of how Prismata achieves its [valuable performance variance](rng).

## Are comebacks even a good thing, anyway?

I'd even question the idea that comebacks are a thing we should be designing for. Sure, sure, comebacks feel great for the
player who comes back. But does anyone ever talk about how it feels to have someone come back against you?

As someone who's played some games designed to make that happen, let me tell you, it feels pretty shit.

In Dragon Ball FighterZ it feels just as disappointing as any other game to lose by a landslide. But this game has no feedback
loop (at least not much); comebacks are always possible through outplaying the opponent. And despite how great it feels to be
on your last character with low health and proceed to wipe the opponent's team, it feels significantly worse to be on the
losing end of that than it does to just lose a match from the start.

And that's in a game where the comeback is entirely emergent and can only happen through the underdog legitimately outplaying
you. When the game artificially rewards the underdog or creates its comebacks through [randomness](rng), it
feels an order of magnitude worse than that. People just learn to stop seeing the game as legitimate competition to protect
their emotions.

That last thing I said is something I didn't come up with until I said it. It's surprisingly insightful. Looking back on my
experience with [Spellweaver](/reviews/spellweaver) it wasn't really considered evidence of superiority to
beat someone. It wasn't embarrassing to lose to a weaker player (and by extension it didn't feel particularly special to
beat the #1 on ladder), you never reviewed your games and asked what you did wrong, and it was basically as if we weren't
saying "*I* beat DragonBoy328", so much as "*My deck* beat DragonBoy328's *deck*".

Go was the polar opposite. Every match of Go I played - and this might be partly because of the Asian culture assiciations
and the [Samurai](https://dbfiechter.bandcamp.com/album/land-of-the-rising-sun)
[music](https://dbfiechter.bandcamp.com/album/chinese-dynasty) I often listened to while I played - felt like an
honorable duel, as personal as it was epic, just my intellect against theirs.
<!--Outsource this.-->

I think comebacks are a mixed bag in general, and I like when games allow for them, but I think sacrificing other design goals
to create them is deeply wrong-headed.

---

In conclusion, my position is that games should have no feedback loop when possible; a positive feedback loop is acceptable if the
game's design doesn't force players to suffer through it. The important thing is to always either reward the player for skill, or
don't disincentivize them to resign when you won't.