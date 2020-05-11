TITLE How to save the player's progress correctly
NAV Progress saving
TEMPLATE DEFAULT

Most games have some sort of system for saving the player's progress so that you don't go back to the beginning when you die. But lots of games are bullshit by making the player replay stuff they've already beaten when they die at later sections. But other games are bullshit by counting taking half a boss's health bar as "progress" that should be saved. Lots of people know the second kind is bullshit and advocate the first kind, but other people know the first kind is bullshit and advocate the second kind. I'm going to clear up how to do progress saving correctly once and for all, and hopefully, my immense wisdom will become the standard position on this argument and people everywhere on the internet will link to my site to show other people on the internet said immense wisdom and everyone will worship me and I'll become famous.

The key concept that everybody is missing is that of a *section*. A section is a self-contained challenge - you start it with full status (health, stamina, mana, or whatever analogous stuff the game has) and your status is restored after it. Every game has (or should have) sections, and every section should have a save point before and after it. You should not save during sections. If a player needs this to get through the section, then either let them [lower the difficulty](difficulty_settings) instead, or [you have a problem with section length](cheap_difficulty).

And boss fights should always be their own sections. There's a massive psychological separation around them, and that must be respected. It's like if the the last two chapters in a novel didn't have a divide between them. If the motivation is that your boss isn't hard enough to be a self-contained challenge (yes I've heard Dark Souls fans raise this argument), then make *the boss* harder and stop punishing the player for your own failure to make a challenging fight.

And yes, that means don't include long treks to the arena or whatnot as part of the section. Making the player repeat a 2-3 minute run every time they die is *not* fun or challenging. It's wasting the player's time. Cut that out.

Final Fantasy 13 is a good example of the encounter-section progress-saving model. Your party is automatically healed between fights, and when you die, you go right back to the field just before you entered the fight, preserving your progress in the area and letting you reconfigure your team, equipment, or paradigm deck before trying again, or even give up on the fight and go somewhere else. But the enemies are restored too, so it's not abusable.

I can't actually think of a spotless implementation that I've played of the level-section progress-saving model. Halo saves during missions without restoring your status, opening the gateway to getting stuck at a near-impossible fight because you spent all your power weapon ammo and then the game saved on you and now you can't fix your mistake, you have to get past the Wraith without rockets, or take down two Red Elites with just an assault rifle and an out-of-ammo plasma pistol. Call of Duty: Finest Hour takes any unused health packs you were carrying from before the checkpoint when you die (so you can't recover them). Any game that saves but doesn't restore your status when you get to the save point, only when you die and get sent back to it, is unfit for praise here even though it's not as bad as the other problems. Etc.

You might ask, given my other claim that [level grinding should not even be offered to the player](difficulty_settings), whether I think it's impossible to give the player consumable items that can only be used in a single section. No. These things don't count as status. ([They still have to be restored on dying after using them, though](punishment).) The obvious problem is that the player might use all of them before getting to a boss where they need them and then not have any or be able to get any. But there's an (almost) equally obvious solution, which for some reason I've never seen used. That is to let the player replay old sections (with their old stats), and if they re-complete it without using the items, then they go back to the present as if they never used the items there. This also removes the problem a lot of games suffer from of the massive disincentive to ever use these items - if they're irrecoverable after use and the player doesn't know what's around the corner, they won't use rare items when they otherwise would and when it would give them a more consistent difficulty curve.