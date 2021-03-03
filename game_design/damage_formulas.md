TITLE Damage formulas
NAV Damage formulas

*Guest article by terepy.*

so many of our games involve combat, but even so our damage formulas suck because they don't satisfy the goals we want. here are the goals:

- intuitive: the effects of increasing or decreasing a stat should be obvious to the player.

- consistency: the usefulness of +1 attack should always be the same, we don't want to be forced to add softcaps or other secret balancing effects that the player has to consider if they wish to play optimally.

- diversity: we want many possible strategies, rather than one or two stat configurations being pareto-optimal, the stat system should not get in the way of choosing items, abilities, strategies.

- scaling: stat distributions that are strong at low levels and weak at high levels are stupid, you're baiting weaker players into a setup that won't allow them to complete the game later, similarly, stat distributions that are weak at low levels and strong at high levels make game way too easy for good players who were able to deal with the early game.

	this might not apply in short games such as mobas and some roguelikes, where scaling is actually a serious intentional factor. but I would argue that it still makes the game less interesting by forcing players into particular roles, and you can easily emulate scaling without having arbitrary stat scaling rules, by having mechanics that offer increased risk right now for a reward later, for example, rod of ages and mejai's soulstealer in league of legends.

- stability: when there is a disparity in level, we want the system to gracefully breakdown at a steady rate that we choose, rather than a sudden drop off of "oh you're level 40 and your opponent is level 50? you do 0 damage to them good luck", yes being higher level/better items/\<whatever kind of progress exists in this game> should confer an advantage, but it shouldn't be so great as to make it impossible to play if you're underleveled.

	in most mmos, lack of stability results in 100 hours of mandatory grinding while avoiding pvp, in order to get max level and max gear before being able to pvp at all, at which point, what's the point of pvping? you already completed the game.

	in singleplayer games, lack of stability results in the game being balanced on a knife's edge, if the player gets slightly ahead the game becomes a joke, if the player gets slightly behind the game becomes impossible and they're forced to die (roguelikes) or grind (other games).

ok so here are the types of scaling I've seen and where they fail.

## flat increase/reduction

this is the simplest method and also seems to have the most flaws. the formula is `damage = attack - defense`

- intuitive: bad. at first this seems intuitive, each point of attack you get increases the damage you deal by exactly 1, and each point of armor decreases the damage you take by 1, but these are not what the player should actually be thinking or caring about, what you care about is how many hits they have to do, and how many hits they can take, which heavily depends on the opponent's attack and armor. for example, if opponent's armor is 5 and your attack is 6, then increasing it by 1 halves the number of hits to kill, but if your attack is 15, then +1 attack only decreases the hits to kill by roughly 10%.

- consistency: very bad. as above, the effects of a stat heavily depend on the difference between you and your opponents current stats

- diversity: there are usually two optimal strategies in games with a flat damage formula, either pour everything into defense (and healing) or pour everything into attack (and flat hp). defense starts off bad, but gets better and better the more of it you get, so either you want to max it out, or there's no point getting any.

	there are some ways games try to address this such as true damage or occasional very large hits to counter defense stacking, or lots of small hits to counter attack stacking, but these are bandaid solutions that generally don't even work, and at best either remove one of the optimal strategies leaving one instead of two, or they shift the optimal from "100 attack, 0 defense" to "90 attack, 10 defense".

- scaling: this heavily depends on the game, often games will have the issue of enemy stats scaling faster than player stats, which results in any strategy other than attack stacking being useless, but defense stacking is optimal in the early levels, thus baiting players into poor stat distributions.

- stability: really bad. if you have 45 defense and opponents are doing 50 damage, then any increase in the amount of stat points you have available breaks the game, similarly, if you have 50 attack and opponents have 45 defense, then any decrease in amount of stat points breaks the game.

## linear percent

this one is used in minecraft, in later versions they added the armor toughness factor, which sacrifices stability for diversity. the formula is `damage = attack × (1 - defense)`

- intuitive: somewhat. the number of hits to kill is reduced by `1 - previous attack / new attack`, that is, increasing from 4 to 5 damage reduces the hits to kill by about 20%. increasing defense increases the number of hits to kill by `1 - previous_defense / new_defense`. these formulas are simple but they're still not easy to calculate in your head.

- consistency: really bad. attack scaling has diminishing returns, which is ok but not great, but the real issue is defense, if you have no defense and you get +10%, your hits to kill goes up by 11%, but if you already have 80% defense and you get +10%, your hits to kill doubles, this makes balancing a nightmare.

- diversity: attack gets worse the more of it you stack, defense gets better the more of it you stack, the optimal strategy is almost always to stack defense.

- scaling: defense is weak at low levels which makes attack strong, once again players are incentivised away from the optimal late game strategy.

- stability: really bad. because of how well defense scales, any disparity in levels/resources/whatever means a huge difference in the number of hits to kill. for example in minecraft iron armor results in 2.5x the defense of someone wearing nothing, diamond armor is twice iron, and prot4 diamond armor is a bit over 2.5x regular diamond, combine that with healing, damage, fire swords, strength potions, etc, and it means that a single person with prot4 diamond might be able to fight 50 people with iron, or basically unlimited people with no armor (well, limited by how long it takes their armor to run out of durability), this also means that mobs become mostly a joke as soon as you spend 10 minutes getting a set of iron armor.

## additive

this one is common in a lot of mmos, as well as league of legends, dota, and probably lots of other games, probably because it appears diverse, a balance of stats seems diverse, but when that's the only way to play it's just another type of min-maxxing. the formula is `damage = c × attack / (c + defense)` c is a constant, typically 100.

- intuitive: somewhat. same as linear percent, the hits to kill is reduced by `1 - previous attack / new attack`, and the hits to kill increase from increasing defense is also similar: `(new defense + c) / (previous defense + c)`

- consistency: ok. everything here has diminishing returns, so that can at least be relied on, but it does mean that the effectiveness of stat increases are dependent on current stat

- diversity: because both attack and defense have diminishing returns, spreading stats between both is the optimal strategy. the game will usually have incentives that push players away from this, such as allowing teamwork where one player can act as a tank by maxxing out defense and acting as a meatshield while the other acts as a dps by maxxing out damage, this helps to create more than one optimal strategy, it's not perfect, but it's much better than the previous formulas.

- scaling: there is one optimal strategy which is to spread stats evenly, and this strategy stays roughly the same at any level.

- stability: good. this works well when the only factors are damage, defense, hp, maybe some healing. weaker players will have a slightly harder time, stronger players will have a slightly easier time. the issues arise when things like armor break and penetration come into play. because armor stacking has diminishing returns, this means armor reduction/penetration get better and better as they get stronger relative to opponent's armor, stripping off 100 armor from 400 reduces the hits to kill by 20%, but stripping off 100 armor from 100 halves them.

other systems:

- eve online: exponential scaling but with diminishing returns for stacking the same type, this is very similar to additive, except much less stable.

- crosscode: can't find any formulas, but the effects of increasing a stat decrease as the stat disparity gets larger, this is similar to additive but emphasizes stability slightly more and punishes deviating from the optimal strategy (evenly distributing stats) slightly more... except for the fact that hp/defense/regen stacking is op and far outweighs any other strategy because it scales so much better, and because most of the best abilities in the game are in the defensive tree.

- dark souls: similar to crosscode, combines a lessened effect of flat reduction with the diminishing returns of additive system, the result is low diversity (specializing is bad), it's less stable, and also defense is next to useless if your opponent has vastly more attack than you, so lacks consistency or intuitiveness, and to make things worse the game never explains any of what the stats do and what you should expect from increasing them.

- albion online: additive, but the values plugged in to the additive formulas scale exponentially, resulting in a system that scales well and is very stable, it's moderately consistent but not intuitive at all, they tried to create diversity by contstraining most of the stat choices to chestpieces are weapons, which works to an extent, but there are a lot of combinations that 'should' work but don't because of stat combinations.

## my proposed system: exponential

the effects of every stat scales exponentially, the formula is damage = c<sup>(attack - defense)</sup>\
c is a constant larger than 1, I propose something between 1.01 and 1.1.

- intuitive: as long as the player knows what c is (tell them in the tutorial "each attack increases damage by 10%, each defense decreases damage taken by 10%", they can easily know what each stat does.

- consistency: if c is 1.1, then one attack is always 10% less hits to kill, and one defense is always 10% more hits to kill, no need to know current stats or stats of opponent or anything.

- diversity/scaling: without taking into account other factors like teamwork, abilities, time constraints, etc, every possible stat distribution is equally good at all levels

- stability: the exact amount of disparity between different levels can be chosen based on how fast stats scale and how many stat increases are available.

other issues:

- healing: firstly, if healing and damage are seperate stats then you run into scaling issues. hybrid builds are immediately off the table, dedicated healers and dedicated damage dealers are vastly more effective. I suggest merging healing and attack into one stat, call it power or something. because defense increases as well as healing, attack should scale to match both, so each point in power might be equivalent to one point in attack but only half a point in healing (or two points and one point if you prefer). next is the issues we have with defense and max hp, if we can choose to ignore max hp and only get defense increases, then we run into a scaling issue when healing is involved, if we have a dedicated healer putting the majority of their points into power, and a dedicated tank putting the majority of their points into defense, this gives 3 points of effective healing for every 2 points spent, meaning that healing quickly outscales damage and fights never end as a result. because of this issue I propose merging health and defense into one stat, call it vitality. if you want healing scaling to matter more (or less), you can increase the amount of healing per point in power, and reduce the amount of defense per point in vitality proportionally (and increase the amount of hp per vitality).

	another way to address this issue is to remove max hp as a stat and just have defense, but this means that you need to decrease the amount of healing received proportional to defense, which causes wierd unintuitive interactions with buffs and debuffs, and is potentially abusable by doing things like momentarily taking off gear to decrease defense in order to receive more healing.

- armor penetration: how do we implement it without breaking everything? any item of the form "ignores 10% of opponent's armor" will be weak to begin with but scale far too well so that's not going to work. and any item of the form "ignores 10 armor" will just be equivalent to an increase in attack. the intended effect of armor penetration is that it should deal increased damage dependent on how much armor the opponent has, or based on how much armor the opponent doesn't have, depending on the game. you can add two different stats that do both these effects, or you can only add the one you want, I call them lethality and pierce.

here's the amended formulas after taking the above into account:

max hp = c<sup>V<sub>t</sub>/2</sup>\
healing = c<sup>P<sub>a</sub>/2</sup>\
damage = c<sup>(P<sub>a</sub> - V<sub>t</sub>/2 + c<sub>2</sub>(L<sub>a</sub> * P<sub>t</sub>  + Pi<sub>a</sub> * V<sub>t</sub>) / (P<sub>t</sub> + V<sub>t</sub>))</sup>\
where:
- P<sub>a</sub> is the power of the attacker
- L<sub>a</sub> is the lethality of the attacker
- Pi<sub>a</sub> is the pierce of the attacker
- V<sub>t</sub> is the vitality of the target
- P<sub>t</sub> is the power of the target
- c<sub>2</sub> is a positive constant that determines how much effect pierce and lethality have

note: if you want lethality and pierce to be able to scale, try dividing them by the attacker's power

## extending

attack, defense, and hp are not the only stats that exist, we can extend this kind of exponential system to other stats.

- cc can be added by having both a cc duration and cc resistance stat, or having them scale based on power/vitality.

- mana/energy scaling can be added by having mana costs scale as some fraction of power, and have a mana stat that increase max mana/mana regen, by having mana scale slower than (or equal to) attack/healing, it ensures that more power is never worse than less.

- cooldowns present somewhat of a challenge with scaling and there's a few things you can try, the best solution I came up with was to have a cooldown stat (possibly merge it with the mana stat), and have ability cooldown times affected by their power, so if the ability's power is larger than your cooldown rate, they will cooldown slower, and if their power is less than your cooldown rate, they will cooldown faster, again this should scale slower than attack/healing, so that low power things are not better than high power.

- buffs and debuffs should increase or decrease in effectiveness based on the level disparity. for example a level 50 buff on a level 25 character should have c<sup>25</sup> times the effect (for c = 1.01 that means 28% more effect), and can either be handled like cooldowns (a 5 second buff becomes a 6.4 second buff), or the effect itself can be changed (a 5 second buff of 20 becomes a 5 second buff of 25.6), the second method is easier to balance.

	if the game does not have levels, some other statistic like cc resistance or a weighted average of all stats can be used in place of level disparity
