TITLE Has your favorite tool actually saved more time than it's costed?
NAV Has your favorite tool actually saved more time than it's costed?
DESC Tools like Markdown have made writing more pleasant and more efficient, but do they truly outweigh their costs?

When I first launched my website, I hand-wrote every line of HTML. HTML is ugly and verbose, but there weren't any other options, or so I thought.

I don't know how long after that it was that I first found out about markdown. I'd seen the `.md` files in some places but didn't understand why they had that extension and I had no clue they were for processing into HTML. I first sought out a Python markdown processor when I implemented my comment feature. I found [python-markdown2](https://github.com/trentm/python-markdown2) and ran with it. It was great.

It wasn't long after that that I decided I wanted to use it for my articles too, so I instituted a new template directive for my source files to request markdown processing. This way the old HTML articles could stay while I wrote new articles in markdown and converted the old gradually or not at all.

So markdown's generally made me much happier and more efficient... or so I thought. After running into more and more issues with python-markdown2, I eventually started searching for a replacement. The search consumed so much time and was so frustrating that I managed to make [a 5-part dev.to series about it](https://dev.to/yujiri8/the-quest-for-a-better-markdown-processor-31og) before I resigned to lowering my criteria for success and switching to [mistune](https://github.com/lepture/mistune), despite all of its own issues.

This experience has got me thinking: *has markdown actually helped me?* Sure it's saved me a small amount of time and happiness writing each article since, but how much time has it *costed*? As a ballpark, the search probably costed me 12-18 hours in total. Originally finding and plugging in python-markdown2 probably took only 1, but struggling with the issues before I started searching for replacement might've been another 12 (I struggled with [this one](https://github.com/trentm/python-markdown2/issues/342) for a *long* time before I took to reading the source and finally resorted to editing it. It delayed the initial publishing of [The Concise Python Tutorial](https://yujiri.xyz/software/pythontut1) by two days if I remember correctly).

I should also count the time spent looking for a way to *unmarkdown* old HTML articles. (I convert them occasionally, and I think I've done about half of them as of this writing.) I did a few manually, which was tedious, and then found [soffes's unmarkdown](https://github.com/soffes/unmarkdown), which despite being a Ruby library I ended up using. It still requires manual conversions in some cases (like for links I had given `rel="nofollow"`). Add the time it took me to learn enough Ruby to make a script that wrapped that library into a CLI tool (which is almost none, but might be another hour), and I might've spent another 6 converting old HTML articles to markdown.

There's no way the benefits have added up to about 30 hours yet. Will they, given the difficulties aren't over? What else could I have done with these 30 hours if I had never looked into markdown?

And yes, I *needed* some sort of formatting capability for comments without allowing full HTML, but lots of other comment systems (Wordpress, Disqus) use HTML while stopping dangerous stuff like `<script>`. I don't like it, because it's uglier and more verbose and non-technical users probably find it more confusing, but it was an option.

There's no way I'm ever switching away from markdown now. The 30 hour cost is paid, and besides that I have too much of an emotional attachment to markdown to ever go back to garish HTML. But I have to wonder if it was a detriment in the grand scheme of things.

I used markdown as the example here, but I think it applies to other tools too. What if many of our favorite productivity tools are actually not pulling their own weight?

Times like this are when I feel stronger than ever that we should [kill software for great glory](https://yujiri.xyz/software/kill_software). Here I am wondering if it costed *me*, but when I consider how much time the library authors put into this, it starts to look like an absolute tragedy. I have a hard time believing the total cost of inventing, specifying and implementing markdown has been recouped, or ever will be.
