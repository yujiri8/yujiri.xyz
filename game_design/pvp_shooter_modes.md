TITLE Pros And Cons Of Different Game Modes In PvP Shooters
NAV Game Modes in PvP Shooters

In this post I'm going to compare different game modes in PvP shooters and discuss their merits from a game design perspective. Please don't feel patronized when I explain all the terms you probably already know; I just want my articles to be accessible to the uninitated.

### Team Deathmatch

Where two teams race to a specified number of kills. This is one of the most obvious ways to make a game out of shooter mechanics, and is probably the most commonly played (definitely always has the most players queueing in all the shooters I've played). But it's actually a really bad mode.

The biggest problem is that when avoiding dying is as important as killing, players are incentivized to "camp" - find a good spot to stay in and just wait for enemies to come into view so you can kill them from relative safety. And anyone who's played it will agree that this is undesirable because not only is it boring for the other team who spends all their time looking for the opposition until they get spontaneously sniped, but it's more boring for the player doing it; people only do it because the game incentivizes it.

The other major problem is that when avoiding dying is as important as killing, any player who ends the match with more deaths than kills was probably actually *hurting* their team. This can lead to feelings of shame or embarrassment and even toxicity between teammates. Those problems can even amplify the problem of camping if weaker players are motivated to do it by the fear of being a drag on their team.

Almost any other game mode doesn't have these problems since dying doesn't hurt your team. In those modes you're incentivized to play in a way that's healthy for the game, and it's almost impossible to be a negative.

One might mention in Team Deathmatch's defense that it doesn't require respawn timers at all. In modes where dying doesn't hurt your team, there's usually a delay before you can respawn, so that killing someone is still worth something. But is this necessary? I think it would work to give a small score for killing someone so that it's not a common occurrence that someone is actually a drag on their team, and camping isn't a good strategy, but players don't feel like their kills aren't being rewarded. In fact this is basically what the [Star Wars Battlefront](https://en.wikipedia.org/wiki/Star_Wars:_Battlefront_(2004_video_game)) games do (although I wish they had tuned it so that command posts were more important relative to killing). That said, I realize that solution isn't perfect. Team Deathmatch still deserves some credit for that. But it doesn't nearly justify the downsides.

I think the main reason Team Deathmatch is so popular despite being so bad is the way the games sell this as the "standard" mode. It's almost always at the top of the list and once you can see more people are playing in it, you not only know that you have better odds of finding a match quickly if you [queue](queue_settings) for Team Deathmatch, but you may infer that if everyone else is playing it it must be because it's the best mode. So the problem self-perpetuates. If I ever make a PvP shooter I won't even include Team Deathmatch as an option.

All this said, there's something I should mention in TD's favor: it makes it not a big disadvantage if one of your team members quits. That inevitably happens in online shooters and it's nice if it doesn't ruin your chances of winning. And it's possible to implement some sort of compensation mechanism for this in other game modes; but that's hard to do in a way that doesn't feel like BS to the team with more players and most games I've seen don't do it as a result.

### Capture The Flag

Where each team has a flag that spawns in their base, and is tasked with stealing the enemy flag and brining it to their base.

This mitigates the problem of camping with Team Deathmatch, but doesn't remove it. A few players on each team should usually stay at their own base guarding their flag from the enemy. And while this is an improvement since the enemy knows where to find you, it's still likely to be boring compared to running around, and depending on the game it confers a huge advantage on the defenders. If the game has low health it may be next to impossible for attacking players to steal the flag since the camping defenders will see them first and kill them almost every time. This may not be all that enjoyable for the players who keep running to the enemy base, knowing their odds of making it are miniscule even with correct strategy.

The respawn thing gets iffy if your spawn point is right in the place the enemies have to clear out to get your flag. The best solution I know of to avoid needing respawn timers is to make it so players respawn in some other location if the enemies are in their base.

### King Of The Hill

Where there's a designated area that the teams compete to occupy, and whoever holds it accumulates points. The hill may move throughout the match.

This is a good mode. It gets all the players playing and working with their teammates. A possible downside is the way it piles everyone together: if all five of a team's players are on the hill, there's very little chance for the opposing team to even make a dent unless they all meet up and coordinate (which is hard to do when you don't have voice chat). It sort of turns confrontations into brute-force by amplifying the importance of having more players.

But that can be migitated depending on the game. If the game strongly rewards players for headshots for example or makes it possible to dodge bullets to an effective extent or has tactical options like grenades or other means of splash damage, then a skilled player can potentially defeat multiple opposing players. The Call of Duty games generally achieve this by making it take almost nothing to kill someone, but that has its own downsides (which I'm planning to write about separately).

### Domination

A minor change to King Of The Hill: there's more than one hill. Usually three in implementations I've seen. They also usually keep their status when you walk away, so after you conquer one you can leave and go after another without losing the hill automatically.

This is an improvement, and possibly just the best game mode all around. It has all the benefits of KOTH without the downside of brute force. It keeps the importance of individual decision making and smart movement throughout the map that minimizes your exposure.

### Free-For-All Deathmatch

A simple but profound modification to Team Deathmatch: deathmatch with no teams.

Actually, this pretty much completely fixes every problem with Team Deathmatch. Free-For-All in most of the other modes doesn't really work because of the alliance effect. If there are ever more than two players in a free-for-all confrontation then it's likely two of them will end up both shooting at the third and neither shooting at each other. And that doesn't feel very fun for the person who gets ganged up on. But in FFA Deathmatch you won't usually encounter multiple other players at once due to the way it encourages movement and doesn't emphasize any particular area (and especially if the game gives you low health), so the problem is not that big. Even intentional collusion (which I believe is usually against the code of conduct in FFA games but can be hard to prove and requires moderator attention to deal with) is probably not even a good strategy here because you're only getting half the kills.

Without any compensation, FFA modes have the problem that you can't really join an in-progress match, since you'll be starting from 0 score while everyone else has already been racking up kills. While joining an in-progress match is undesirable anyway, it's more or less an inevitable reality in games with less than enormous playerbases, depending on just how long you're willing to wait, and on how divided the matchmaking queue is and how stingy you are with the types of matches you want to play. But this problem can be severely mitigated with a good system. My best idea is to have late-joiners spawn with the average score in the lobby. The reason I don't advocate for the more accurate system of having their final score be multiplied by the ratio of time everyone else got to time they got is because that allows someone to "win" while only having to play well for a few seconds, if they join at the last minute. That would feel crummy to the players who averaged slightly worse because they had to keep it up for much longer.

<!--</p><p>
On the other hand, the fun of team play is a lot to sacrifice; especially .-->

<br>

So my conclusion is that Domination and FFA Deathmatch are the best game mode for PvP shooters. KOTH is a good one too, CTF is okay, and Team Deathmatch is mostly a degenerate disaster. If there's anything else you wish I had covered or anything I said that sounded like bullshit to you, post a comment. I'm planning to add more modes to this consideration when I have time.
