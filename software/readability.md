TITLE Why code readability is important
NAV Why readability is important
TEMPLATE DEFAULT
DESC When I was new to programming, I didn't value readability enough, and hope to save others from making the same mistake.

When I was new to programming, I didn't value readability nearly enough. I preferred to write compact code as much as possible to the extent that I'd remove all spaces that weren't syntactically neceesary and write things code:
```
while condition:
 if someobject.method(x,y)[0]+1==otherobject.attr:someobject.othermethod()
```
And I hope I can persuade some beginning programmers to part from this practice after less time that I did. If by any chance you're a beginning programmer and you *don't* puke at seeing the above code, please let me make a case for why you should, even if you're sure no one else will ever read it.

## The benefits of readability are often reaped unnoticed.

An incredibly dominant fraction of time spent "writing" code is actually spent *looking* at code, whether debugging, reminding yourself how your function in another file works, or whatnot. Being able to parse this code faster saves you an enormous amount of time over the hours, but because it's such a subtle, gradual benefit, it tends to go unnoticed.

## If you don't think anyone else will ever read it, you are probably not correct.

Almost any time you write non-throwaway code, it's a good idea to have it posted on your Github page, personal website, or somewhere else where people can see your accomplishments. I had several projects in my early coding years that I told myself no one would ever read and I turned out to be wrong ([Pixeldodge](https://github.com/yujiri8/pixeldodge), [Spacestation Defense](https://github.com/yujiri8/spacestation-defense), and the [Prismata](/reviews/prismata) bot I took down for other reasons, but *was* read by at least one other coder).

Also, a future you is the most likely "other person" to end up reading it. Just because you're familiar with your code now doesn't mean you will be if you leave it and come back to it after a month, and as with other people reading it, if you think that won't happen, it probably will.

## You don't know what readable code is like until you see it

I was quite convinced for some time programming that way that because I could read my code fine I obviously wouldn't benefit from more readability. Of course, I thought that because I'd never worked with readable code, so unreadability felt normal to me. But when I started writing more readable code, I *was* able to read it more easily, faster. Nowadays I write readable code and I can't describe my nausea when I look back at Pixeldodge.

### More whitespace has an incentive benefit

One of the bad things I did was indent everything by only one space, as a rule. This is readable enough for 1-2 levels of indentation, but when I had 3 or more levels I often found myself struggling to tell if two faraway lines were indented the same amount. But here's the thing about huge indentation: since it fills your screen width faster (and just looks kind of ugly to be writing code indented by 6+ tabs), it discourages you from writing heavily nested code. It incentivizes you to break very indented code out into functions or refactor it, which you should be doing anyway but this gives you a nice psychological push toward better practice.

The same thing is true of inline whitespace (eg. around operators) encouraging you to not make convoluted monolithic statements, but that's smaller.