TITLE Why you should learn programming even if you won't be a developer
NAV Why you should learn programming even if you won't be a developer
DESC Some knowledge of programming is very useful even outside of writing software.

I strongly believe programming is an undervalued skill set. Yes, it's highly valued, but not as much as it should be. And I'm not just saying this because as technology develops many other jobs are going to become increasingly obsolete (although I do think that), but because programming is one of few skill sets that are useful almost regardless of your occupation.

## Programming is not harder to learn than other skill sets

Non-technical people often have this idea that programmers (as well as those in any other STEM field) are super smart and like complex things. This idea honestly drives me nuts. *It's not true!* We're not "smarter" than you any more than modern-day humans are "smarter" than our medieval ancestors.

Also, intelligence isn't about complexity. Intelligence is about simplicity.

Programmers fear complexity more than anyone. Because programmers have seen how horrifyingly evil complexity is. In fact, it's not inaccurate to say a large part of our work is trying to simplify complex things! And I don't mean in the sense of "making tasks simple for the end user by creating software that does it"; I mean simplifying complex software.

I think a lot of the reason programming - and other STEM fields - seems intimidating from the outside is because it has more jargon than most other fields, but if you give it a fair chance I genuinely believely it's not significantly harder than another skill set.

## Programming is useful for you

Programming is useful for tons of things besides software development. For example, a while back I needed to bulk-edit images. I was proficient with GIMP, but it doesn't provide a way to edit images in bulk from its graphical interface, so I sought another way. <span class="note">GIMP itself does have a scripting interface but it's so nightmarish to use that I sunk two hours into it without getting any results or any error other than "Execution Error".</span> What did I land on?

[Python](python). The scikit-image package gave me a Python interface to a powerful image processing library, and with a few lines of Python, it was trivial to transform dozens of images in the way I wanted. All in all it took me about five minutes to write and run the script (counting the failed iterations which I rolled back using [git](https://git-scm.com)) after about twenty minutes to learn the library, which has helped me other times since and will no doubt continue to do so.

Similar things are possible for any kind of media. Sometimes it takes some effort to find a suitable library, but there almost always is one - graphical applications like [GIMP](https://gimp.org) or [LMMS](https://lmms.io) are based on them.

Did I mention git? Oh yeah, version control is another thing that's super useful outside of actual software development. It may not be strictly 'programming', but git is free software for keeping track of versions of projects and collaborating on them. It makes it easy to keep track of what changes you've made and when, merge them with changes other people have made in the meantime, overwrite anything without losing the ability to roll back to any previous version in a jiffy, and do advanced things with the development history like edit out some changes that were made some time ago without affecting the changes after them (and without manually undoing them, I mean). But it's useful even if you don't fully understand all its features (I still don't). I've used it for visual novel scripts and [my conlang](/spem/) and other stuff in addition to code.

While programming, version control systems, and [command shells](why_unix) aren't all the same thing, they are very closely related and being proficient is a great help in learning the others.

## Programming will change the way you think in many beneficial ways

By forcing you to think in strictly meaningful terms, it helps you understand human communication and how human communication can be improved, and, at least if you're [not a philosophobe](/argument/philosophy), I think it can really help you to avoid bad philosophical ideas as well, by helping you develop an ontology.

Programming teaches you to be a perfectionist, and I mean this in a very good way. It teaches you to optimize things and to appreciate the beauty of simplicity.

<br>

---

<br>

On the off chance this article convinces you to try it, I'd feel terrible if I left it at this. Learning programming can be a lot harder than it needs to if you don't have good resources to learn from, and most of the resources out there are bad. I've written [The Concise Python Tutorial](pythontut1) in an effort to improve the situation, which assumes no preexisting ability and I'm always thrilled to help teach my favorite craft.

Of the languages I know, Python is by far the easiest one to start with (and a great one to know in general). Its interactive mode makes it easy to learn by doing, and it has very little boilerplate.

A fun adage I came up with is this: Python teaches you to like programming, C teaches you to understand programming, and [Haskell](haskell) teaches you to understand the universe.
