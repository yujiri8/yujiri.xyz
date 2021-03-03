TITLE Yujiri's intro to the math behind Prismata
NAV The math behind Prismata
DESC The math behind Prismata strategy is very interesting and knowing it can even help improve your play.

Ever heard experienced Prismata players say things like "Inflation is high in this position so Immolite is better than Tarsier" or "Everyone knows Gaussite is worth 1.33 gold" or "BV is lower with Plexo in the set" and been totally mystified? You're not alone. Here I'm going to explain what these comments mean. When you're done, you'll have a solid understanding of the math that goes on behind the scenes in Prismata and, hopefully, be better at the game. Each section ends with an exercise to test your understanding.

### Part 1: Determining the value of resources

Before we can calculate the efficiency of any tech-costing units, we need to be able to compare their costs, which means we need to establish a conversion ratio between gold and tech resources. Gold, obviously, is worth 1 gold. So how do we figure out what green, blue and red are worth (we'll get to energy in part 3, it's more complicated)?

Consider that Drone costs 3 gold and produces 1/3 of that cost each turn. If we assume that the first five base set units are perfectly balanced (which they sort of are by definition since they set the standards for everything else), then a Conduit must also produce 1/3 of its value per turn. Therefore green is worth 1/3 the cost of a Conduit, or 1.33. By the same token, blue is worth 1.67, and red is worth exactly 1 gold.

Of course, these are generalizations; the value of each resource is situational. For example, in a set with 11 good blue units and no green units, green is worth less and blue more because they give you less/more options for what to spend them on. Or in a Shadowfang game, your 4th red is worth *much* less than your 3rd red because the 3rd one makes the difference between two Tarsiers and buying one of the most efficient attackers in the game, while the 4th one will have to be spent on something weaker like a Tarsier, a Nitrocybe, or even wasted. Nevertheless, these generalizations are useful.

Exercise: suppose there was a building that costed 8 and produced 3 yellows per turn. How much would one yellow be worth? <span class="spoiler">0.89</span>

### Part 2: Inflation of a unit

Inflation refers to things being worth more now than they are later. To see how this applies to Prismata, consider that most units (drones and attackers) produce value over time, so the sooner you get them on the board, the better off you are. But is there a way to quantify *how much* better?

Yes. If you had 9 gold, you could buy 3 Drones, and next turn, you would still have your Drones and also the 3 gold from them. If we assume the Drones are still worth their cost, that means you'd have 12 gold worth of value. Therefore, when the best thing to be buying is Drones, 9 gold now is worth 12 gold next turn.

Said another way, anything you have now is worth 4/3 or 1.33x as much as the same thing next turn.

Notice this lets us quantify the value of buildtime, so that we can compare eg. Drone to Thorium Dynamo, or Tarsier to Steelsplitter (which we'll do later, but there are some other things in the way first).

Another way of looking at it is that each unit is worth 3 times what it produces each turn (so a Conduit is worth 3 green, etc). Another way is that it takes each unit 3 turns to pay for itself.

But that doesn't mean 1.33 is *always* accurate. That was only if we assume our resources will be spent on Drones. To see how this generalizes, imagine Drones costed 5. In such a world, it would take a lot longer to get your economy going in the opening; since each turn makes less of a difference, and so having something one turn earlier would be less valuable. To be exact, 5 gold now would be worth 6 gold next turn because you would spend it on a Drone and end up with the Drone and the 1 new gold next turn. Inflation would be 6/5, or 1.2.

This introduces the idea that inflation depends on how efficient the units are. We're simplifying things by assuming there's always a clear best unit and all your resources will be spent on it. Not making these assumptions would make this impractically complicated, so we'll continue with the idea that the most efficient unit available sets the inflation. As you can see from the examples, the formula is: (cost of the unit + what it produces each turn) / cost.

Exercise: an old version of Wild Drone had buildtime 1, costed 5 gold and produced 2 gold per turn. What was its inflation? <span class="spoiler">1.4</span>

### Part 3: Energy cost

A real Drone costs energy, right? In games where you won't be buying a third Engineer energy is basically free at first because you start with the two Engineers you want, and worthless later since you don't want to buy Drones in the late game, so we can treat Drone as if it doesn't cost energy. But when energy costs *are* relevant, like in high-econ games where we want to buy additional Engineers, or when we want to compare Drone's efficiency to Vivid Drone, we need to figure out the value of energy.

You might think we can do this the same way as before: assume that Drone and Engineer are balanced and so they must have the same inflation, thus an energy is worth 1/3 of a Engineer's cost or 0.67. But there are two problems with that. Once energy has value, Drone suddenly costs more than 3, so 1.33 is no longer accurate. Additionally, Engineers can block, so when you spend 2 gold on one you're getting more value than just the energy production. (Technically the same applies to Drones, but most of the time you won't be defending with Drones until a *very* long time later, so in their case it's worth very little by comparison.)

There's no good way to quantify the value of Engineers blocking. What we can do is calculate the inflation of Engineer and Drone if energy has value but blocking doesn't, and then conclude that the inflation we're looking for is slightly higher than that since Engineer gives you value besides the energy and so is more efficient than we calculated. So what we need to do is find a value for energy that gives non-blocking Engineer and non-blocking Drone the same inflation. You can do this by graphing them at [desmos.com](http://www.desmos.com/calculator): enter the equation for each unit's inflation, using x to represent the value of energy, and find the point where the lines meet.

The value for energy you find (the x co-ordinate) should be 0.56, and the inflation it gives (the y) should be 1.28. So now we know that when energy matters, Drone/Engineer inflation is somewhere between 1.33 and 1.28.

Exercise: what if Engineer costed 5 and didn't block and Drone costed 1E? What would the inflation be then? <span class="spoiler">1.36 (energy is worth 1.8)</span>

### Part 4: Barrier Value

Attackers produce value by forcing your opponent to buy defense. A unit that makes your opponent spend 1 gold on defense each turn can be thought of a negative drone for your opponent. So to compare Drones to attackers, we need to determine how much gold one defense costs. This value is called "BV" (Barrier value) since Barrier provides 1 prompt defense.

So how do we calculate BV? You might think we can just use the cost of Barrier, but that wouldn't be the best method because Barrier is a random set unit that's only occasionally available. And Engineer is also a bad unit to use because you don't normally defend by massing Engineers. It would be most useful to find the BV of the defender that accounts for the majority of our defense expenses in most games: Wall.

Wall costs 6.67 according the value for Behemium that we computed earlier, and gives you 3 BV. That means that in base set 1 BV is worth approximately 2.22 gold.

But you have to account for one more thing. If you defend with *only* Walls, you get exploited. In a real game, even if most of your defense budget is spent on Walls, you usually throw in a couple of Engineers for defensive granularity. So now we're off to find Engineer's BV and mix it with Wall's somehow.

You might think Engineer's BV is 2 because it costs 2 gold, but that would be very wrong. Engineer isn't prompt you see. When you buy it, you're paying 2 gold *now* for 1 defense *next turn*. (Compare to Wall, where you pay 6.67 now and get 3 defense now.) That means Engineer's real BV is 2 * inflation since you had to pay the cost one turn ago, and with standard Drone inflation, that means 2.67. So in base set BV is between 2.22 and 2.67, but closer to 2.22. I approximate it as 2.3 in all my calculations.

Exercise: Aegis costs 6GGG and has 5 health. What is Aegis's BV? <span class="spoiler">2</span>

### Part 5: Attacker inflation

Now that we know how much HP is worth, we're ready to calculate the inflation of an attacker so we can compare it to Drone! Let's start with Tarsier.

Tarsier costs 5 (remember red is worth 1) and produces -1 BV for your opponent every turn. You might be tempted to say its inflation is 1.46, but there are two problems with just plugging in that naive formula.

First, Tarsier has two build time, so you need to multiply its cost by inflation. Your next instinct is probably to use Drone inflation for that and come out with 1.35, but there's another thing you're missing. This formula works for Drone because Drone produces one gold on *your* next turn. Attackers actually produce value on your opponent's next turn by forcing them to buy defense. What we've been using so far is the inflation that occurs between two consecutive turns *of the same player*. If we define that to be a full turn, then the time between your turn and your opponent's next turn is *half a turn*. Half-turn inflation is equal to the square root of full-turn inflation (because you multiply by it twice to get full-turn inflation), so we need to multiply the value of the attack that Tarsier is producing by half-turn inflation. Use the square root of Drone's inflation (1.15) and you'll come out with 1.4.

There's just one problem left. Twice now we've plugged in Drone inflation to our formula. That tells us how efficient Tarsier is when our resources are being spent on Drones. But if we're buying Tarsiers, then we should be using *Tarsier inflation*. Yes, this means Tarsier affects its own inflation. (Drone didn't because it doesn't have buildtime and the value of what it gives you doesn't itself depend on inflation.) So we need to plug in the output we're getting in place of Drone inflation *recursively* until it stops significantly changing. An easier method is to graph Tarsier's inflation at desmos and see where it crosses the line y = x - in other words, the point where plugging in the new value as input stops changing the output. Do that, and you'll finally come out with 1.39. That is Tarsier's recursive inflation, or its inflation when we're buying nothing but Tarsiers.

Note that the only reason it went down when we accounted for the recursion is because Tarsier has build time. This reflects the truth that Tarsier is worse in higher-inflation positions and therefore worse in the late-game, but for buildtime-1 attackers it would go up and the opposite would be true.

Exercise: calculate Borehole Patroller's recursive inflation. You can model the Pixie it comes with by subtracting its value from the cost of the Patroller (though be warned this method is dangerous; it works for recursive inflation but can give some wacky results when you try to find a unit's inflation at an input other than its own, which we'll get to later). <span class="spoiler">1.38</span>

### Part 6: Comparing permanent units with non-permanent units

Our next task is to compare the efficiency of Tarsier to Rhino. The only problem is... how do you calculate Rhino's inflation? For a permanent unit we use (cost+production)/cost, but that only works because a permanent unit is still worth its cost next turn. Rhino has lost a stamina and thus is worth less than its cost one turn after you buy it.

Non-permanent units don't have inflation; if they were the only unit in the game, they would just do their thing and then peter out, and so you wouldn't gain anything by buying them sooner rather than later. What we can do is find the gold value of a Rhino at Tarsier inflation, which is pretty easy. Tally all the value you get from a Rhino:

* You spend 5R

* Half a turn after you buy it, the opponent has to buy a BV

* Three half turns after you buy it, they have to buy another BV

* Six half turns after you bought it, you receive 2 BV yourself as Rhino blocks

And divide the value of each shipment of BV by half-turn inflation to the power of the number of half-turns it takes to arrive.

Thus, the value of a Rhino at Tarsier inflation is 5.07 as opposed to the Tarsier's 5 (obviously the Tarsier is worth its cost at its own inflation). However Rhino costs *6* and Tarsier costs *5*, so now we know that Tarsier is about 18% more efficient than Rhino (at Tarsier inflation).

Exercise: do the same thing for Grimbotch. Grimbotch is basically a better version of Rhino when promptness isn't a factor. How much is one worth at Tarsier inflation? <span class="spoiler">5.8</span>

### Part 7: Equilibrium inflation

Obviously Rhino will get better relative to Tarsier the higher the inflation gets, and vice versa. Want to find the inflation where Rhino and Tarsier are equally good? Me too! Unfortunately this means we need to know how to find the value of a permanent unit at an inflation other than its own. Hm...

Well, we know that at Drone inflation a Drone is worth 3 gold. Can we derive a formula from that? I think we can. The flat value of a permanent unit is (production)*(1/(inflation-1)).

<span class="note">Note that this formula can also be used to find recursive inflation, by finding the inflation where it's worth its cost. But be warned: that will also produce results for non-permanent units; they're bogus - non-permanent units have good high-inflation scaling, so the inflation where they're worth their cost makes them look a lot better than they are.</span>

Just remember two things: first, attackers produce value half a turn sooner than Drones, and second, Tarsier has 2 build time. Now go to desmos and graph it. You should find that the equilibrium inflation is 1.5. Higher than that and Rhinos are better, lower and Tarsiers are better.

Exercise: again, do the same thing for Grimbotch. <span class="spoiler">1.31</span>

### Part 8: Exhaust attackers

Attackers with exhaust are a conundrum that took me a long time to figure out how to calculate. The solution is pretty obvious in retrospect though: for an attacker with exhaust 2 like Iso Kronus, just buy two of them one after the other and say that they're always attacking. So Iso Kronus costs 6.33 and produces 2 BV * half-turn inflation every other turn, so to get two constant attack starting the same time as if you bought buildtime-1 attackers you have to buy one Iso Kronus now and one last turn. That means Iso Kronus's inflation is equal to (6.33x+6.33+4.6x^0.5)/(6.33x+6.33), or 1.36.

Exercise: find Immolite's inflation. <span class="spoiler">1.4</span>
