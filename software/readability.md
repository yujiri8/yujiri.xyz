TITLE Why code readability is important
NAV Why readability is important
TEMPLATE DEFAULT
DESC When I was new to programming, I didn't value readability enough, and hope to save others from making the same mistake.

When I was new to programming, I didn't worry about readability at all. Instead I valued compactness to such an extent that I'd remove all spaces that weren't syntactically necessary and write things like:
```
while condition:
 if someobject.method(x,y)[0]+1==otherobject.attr:someobject.othermethod()
```
And I hope I can persuade some beginning programmers to part from this practice after less time than I did. If by any chance you're a beginning programmer and you *don't* puke at seeing the above code, please let me argue for why you should, even if you're sure no one else will ever read it.

## The benefits of readability are reaped unnoticed.

An incredibly dominant fraction of time spent "writing" code is actually spent *looking* at code. I think even a beginner will have experienced this and realize it on reflection. Being able to parse it faster saves you an enormous amount of time over the hours, but because it's such a subtle, gradual benefit, it tends to go unnoticed.

## You don't know what readable code is like until you see it

I was quite convinced when I programmed that way that because I could read my code "fine" I obviously wouldn't benefit from more readability. Of course, I thought that because I'd never worked with readable code, so having to stare at a line for 5 seconds to figure out what the hell it was doing felt like "being able to read it fine" to me. But when I started writing more readable code, I found that I *was* able to read it more easily, faster. Nowadays I write readable code and I can't describe my nausea when I look back at Pixeldodge.

This same thing happened to me with font sizes. I had a phase in my teenage years where I set my font size to as small as I could possibly read it. Eventually I noticed I *was* straining to read it sometimes, and when I upped the size one and got used to it, I found it much better.

## If you don't think anyone else will ever read it, you are probably not correct.

Almost any time you write non-throwaway code, it's a good idea to have it posted on your Github page, personal website, or somewhere else where people can see your accomplishments. I had several projects in my early years that I told myself no one would ever read and I turned out to be wrong ([Pixeldodge](https://github.com/yujiri8/pixeldodge), [Spacestation Defense](https://github.com/yujiri8/spacestation-defense), and the [Prismata](/reviews/prismata) bot I took down for other reasons, but *was* read by at least one other coder).

A future you is also the most likely "other person" to end up reading it. Just because you can understand your code now doesn't mean you will be if you leave it and come back to it after a month. It's not the same when you didn't just write yesterday. Again, if you think that won't happen, you're probably wrong.

### More whitespace has an incentive benefit

One of the bad things I did was indent everything by only one space, as a rule. This is readable enough for 1-2 levels of indentation, but when I had 3 or more levels I often found myself struggling to tell if two faraway lines were indented the same amount. But here's the thing about huge indentation: since it fills your screen width faster (and just looks kind of ugly to be writing code indented by 6+ tabs), it discourages you from writing heavily nested code. It incentivizes you to break very indented code out into functions or refactor it, which you should be doing anyway but this gives you a nice psychological push toward better practice.

The same thing is true of inline whitespace (eg. around operators) encouraging you to not make convoluted monolithic statements, but that's smaller.
