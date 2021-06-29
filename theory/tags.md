TITLE Tag systems and the problem of variant tags
DESC Allowing users to put arbitrary tags on their posts raises some problems, but there are oft-unused solutions.

Of all the social media platforms I've seen that use some sort of tag system, very few avoid this massive and obvious problem: *variant tags*.

Bandcamp, Youtube, and Devrant are some examples that come to mind of platforms that have just fallen flat on their face in this regard. For example, I've seen Bandcamp albums tagged "music, game music, game, video game, video game music, rpg, rpg music, role playing game, soundtrack, fantasy, fantasy music ...". I've seen Devrant posts tagged obscure things like "browser vendors suck", which is a useless tag because no one would know to search for it.

One possible countermeasure would be to either limit the number of tags on an item or have the weight of each tag be inversely proportional to how many you put (might need nonlinear scaling so they wouldn't be incentivized to only put one tag), to encourage users to decide on the best variation and use only that one. But this isn't a perfect solution, because different users could still reach different ideas of what the canonical variation should be. For example, should you tag your album "rpg" or "role playing game"?

[dev.to](https://dev.to) allows arbitrary tags, but has some predefined, and when typing a tag you get suggestions of popular ones that start with what you've typed. This ensures users will use whatever's become the de facto canonical version of a tag if one exists. dev.to also doesn't allow spaces, capital letters, or anything else other than alphanumeric characters, which reduces the possible variations of a tag. Due to these countermeasures, even though it allows arbitrary tags, I never saw a dev.to post abusing the feature.
