TITLE Yujiri compares the green-blue attackers in Prismata
NAV A comparison of the green-blue attackers in the game

![](https://s3.amazonaws.com/lunarch_blog/Units/Random+Set/Borehole%20Patroller.png)
![](https://s3.amazonaws.com/lunarch_blog/Units/Random+Set/Redeemer.png)
![](https://s3.amazonaws.com/lunarch_blog/Units/Random+Set/Tesla%20Coil.png)
![](https://s3.amazonaws.com/lunarch_blog/Units/Random+Set/Plasmafier.png)

These are the four green-blue attackers in the game not counting Thunderhead, because it's legendary, and Xeno Guardian, Urban Sentry and Chieftain, because they're primarily defenders. They have a lot in common besides being green-blue attackers: they're all high-pressure units that are good at high inflation (see [my math article](math)). Redeemer, Plasma and Tesla all deal massive amounts of constant damage in return for an additional cost to you, and Borehole Patroller gets a lot of its value from the Pixie - 6GB is a terrible price for just one permanent attack, but a great price for 2 damage immediately.

Such inflation-scaling means the units are also better when there are *other* good attackers in the set, because the better the average attacker you're buying, the higher inflation is.

So you might expect that these 3 units and to an extent Borehole all play very similarly. You'd be right, but that doesn't mean there aren't differences in the way they interact with sets. Let's talk about each unit individually.

### Borehole Patroller

Borehole Patroller is the least efficient of the four (1.38). This makes sense because it's the cheapest. Because it's a low-tech spammable attacker, it's meaningful to compare it to Tarsier:

* It doesn't cost red. Costing red is bad for an attacker because red's bad at defending, which is important in every game (or at least every game where you buy red).

* Borehole provides finesse. The Pixie, even if it doesn't exploit your opponent, often forces them to make sacrifices to improve their granularity, and if you know about pseudo-exploiting from [the Basics of Prismata](basics), you can manipulate your damage numbers to make it even harder for their defense to stay granular. If each third Patroller exploits for 1, its efficiency rises to above 1.42. That's a big difference.

* Finally, Borehole is a blocker. While you never want to use it for soak if possible, it can still be useful as an early absorber against your opponent's first 1-2 attackers or to defend against threat (since it's vigilant).

	Now normally it's worth executing threat to kill a defending Borehole. Anyone in their right mind would click a Drake for it for example. So the way Borehole often gets used against threat is as an "inner gambit", where they have to execute a threat that kills normal defense first. For example, if you defend so the opponent has to click two Drakes to kill one Borehole, you're still saving 2 defense over fully defending against all the threat, but you're not giving your opponent an obviously good trade.

It has the following disadvantages:

* Less efficient: 1.38 - 1.39

* More expensive

* Lacking the buildtime, which can [be taken advantage of](https://yujiri.xyz/prismata/basics#deny-absorb).

So that's why Borehole's often stronger than Tarsier in practice despite being both bigger and less raw-efficient.

Borehole is rarely good to mass produce, since there's usually a better attacker in a base+8, and even Tarsier usually counts as better in the presence of a big absorber. It mostly sees play as a support attacker. When you have blue and don't need defense, the usual purchase is a Steelsplitter, but Borehole improves on that quite a lot (imagine if you could buy a Gauss Charge for just the G). So it's quite good with heavy blue units like Apollo or Defense Grid. And finally, like I said, it's very efficient when it plays around threat.

### Redeemer

Redeemer is the second least efficient of the green-blue attackers (1.41). It's pretty weak, but still winning for both players in base+1.

Redeemer is slightly unique in that it's the only green-blue attacker that scales *upward* with good soak. Attackers generate damage, which is worth less if there's good soak in the set. And Redeemer is the same way. *But* it also has part of its cost in the form of defense. That means when you have access to better soak, Redeemer has a lower cost and thus gets better compared to other attackers (all attackers will get worse compared to Drones).

Redeemer is extremely well-suited to rushing down an opponent going for a high-econ build or a slow legendary like Zemora Voidbringer - or better, Savior. An opponent playing one of those strats won't be able to pressure you back, so the Gauss Charges that hit you will run in to efficient defense like Walls - maybe they'll even get partially absorbed.

### Tesla Coil

The second most efficient of the bunch (1.46), Tesla Coil has a lot of drawbacks owing to the constant consumption of Engineers. For one thing, it means that every Tesla Coil you buy locks down 2 of your econ on buying Engineers for the rest of the game, which might make it hard to spend all your tech - and these Engineers don't get to provide granularity.

Additionally, Engineer supply is a real thing in Tesla Coil games. Getting more than 2 is generally risky. It also makes it harder to maintain your defensive granularity, because normally you do that by buying Engineers, but if you buy Engineers just to use for defense, your Engi supply will run out even faster.

Therefore, Tesla Coil combos with units like Hellhound or Sentinel that will keep replenishing your Engineers. Also Electrovore/Galvani Drone, since the Engineers still get to produce energy before they're consumed.

Finally, Tesla Coil can choose not to attack. This can be good if the damage is being absorbed because it means you keep your Engineer, so Tesla Coil can be a counter to things like Plexo Cell or Polywall.

### Plasmafier

This is by far the most efficient of the four (1.54 recursively, 1.47 at Tarsier input - the other figures I've given have been recursive inflation). However, it scales down *really* badly with good soak, even more so than most high-pressure attackers. The reason is because it's a Drone saccer. At high inflation, Drones are worth a lot less, so units that sac them are better, which means inflation is higher, so Drones are worth even less... this feedback loop is what causes Drone saccers to appear so efficient on a graph. But with good soak, BV is lower, so attackers are worse, so inflation is lower, so Drones are worth more, so Drone saccers are even worse...

Nevertheless, even at Tarsier input it's more efficient than the other units are recursively, so it's definitely the strongest. It does have a major drawback in that the Drone saccing makes you more and more overteched as the game goes on, but it's quite worth it.

Plasmafier also provides offensive finesse like Tesla Coil - it can choose not to attack if your opponent will just absorb the damage. This way you get to keep your Drone. Only it's even better, because Plasmafier actually *blocks* when it doesn't attack - how cool is that?

With so much raw efficiency *and* these other advantages, this is the only one of the four that I want to see nerfed a bit - see [my list of advocated balance changes](changes).
