TITLE What goes into making a website
NAV What goes into making a website
DESC I thought I'd make a sorta guide on how to set them up for people with little technical knowledge.

I generally encourage having personal websites. They have a lot of uses, and [contrary to the widespread anti-self-promotion sentiment](https://yujiri.xyz/argument/self_promotion), I actually like it when people link themselves. It gives me a way to find out what they're about if I'm interested.

So I thought I'd make a sorta guide on how to set them up aimed at people with little technical knowledge. (This involves *picking up* some technical knowledge, but not as much as you might think.)

## Cookie-cutter solutions

First, there are a lot of "website builder" platforms or [CMS](https://en.wikipedia.org/wiki/Content_management_system)es out there, like Wordpress and Wix. These aren't what I'm on about. They're a quick path to putting up some content, but they don't give you full control over the website - you're limited to what the platform offers as far as layout and style, post format, comment/account systems which are usually confusing and buggy, and anything else you might want. <span class="note">This may not actually be true of Wordpress if you run it yourself on a self-hosted server, which you can do. I don't know much about that option, honestly.</span>

This guide is gonna be about "the real way" which has the following benefits:

1. Flexibility. You can do anything with a server you control, not just things the platform supports.

2. Independence. If your website is built on a platform like the above, migrating off it can be difficult. You can probably export all your text content, but putting your website back up with a different solution would take a lot of manual work and it'd probably never be the same; especially things like user accounts or comments wouldn't carry over easily. If you self-manage your website like I do, you could set it up on a new server in an hour. I even scripted my install process so I wouldn't have to do hardly anything. That's impossible with a hosted platform.

So what I'm getting at here is, the quick and easy path leads to the dark side :P

---

So there are a few essential components that go into a website:

* A domain name - the part like `yujiri.xyz`. See [this wonderful explanation of the Domain Name System](http://tldp.org/HOWTO/Unix-and-Internet-Fundamentals-HOWTO/internet.html) if you're not familiar. You'll need the nameserver for the [TLD (top-level domain)](https://en.wikipedia.org/wiki/Top-level_domain) to resolve requests for your domain. This does cost money, but barely (I get mine from Namecheap for like $13/year).

* A computer to act as a server. It's actually possible to just use a home computer for this, but not necessarily a good idea because it means your website goes down whenever *your* internet does. Your connection may also be too slow to give a good experience to viewers from around the world.

	The easiest way to get a server that avoids those problems is to rent one from a service like Digital Ocean or Ramnode. This also costs very little (I get mine from Digital Ocean for $5/month). Note that these don't give you a Remote Desktop Connection-like interface to your server (although I'm sure there are ways to set up something like that), only SSH access. If you don't know what that is but aren't scared off by it, my [Unix tutorial track](https://yujiri.xyz/software/shell_basics) can probably help - the server will be running an open-source Unix-like operating system. Be aware that you can use SSH from Windows with [PuTTY](https://www.putty.org).

* A web server program to run on the serving machine. I use [Nginx](https://yujiri.xyz/software/nginx) for this; its configuration is very simple (it can do with just a small text file that's mostly default settings) and it supports modern protocols like HTTP 2.0 out of the box.

* Content.

Something that's not required but that you should get as soon as possible is an [HTTPS certificate](https://en.wikipedia.org/wiki/HTTPS), so users can connect securely and know that they're connected to the right website. (Sites without HTTPS support are also penalized in Google search results.) These used to be expensive, but nowadays you can [get one from Letsencrypt for free with their Certbot utility](https://certbot.eff.org).

## Content

It's possible to just write a plain text file and have Nginx or another web server program serve it. That wouldn't be very interesting though, because plain text doesn't allow for any kind of layout, style or formatting - not even things like italics. For real web content, there are three core technologies involved:

* HTML (HyperText Markup Language) is what the actual content of web pages is written in. HTML is pretty easy to learn, especially since you only need to know a small subset of it unless you make spiffy web apps or something. It's worth learning even if you don't hand-write all your content in HTML, since it helps you understand how it works; it's also useful to know in general because many websites' comment systems (eg. Wordpress and Disqus) offer HTML formatting. [HTMLDog has an excellent tutorial](https://htmldog.com/guides/html/beginner/gettingstarted/).

* CSS (Cascading Style Sheets) is how the style or appearance of a page is defined. CSS isn't something you use regularly though; for a blog you probably just need one CSS file that's used on every page. HTMLDog also has [an excellent CSS tutorial](https://htmldog.com/guides/css/beginner/).

* Javascript is the programming language used to give pages dynamic behavior, like popup ads, animated scrolling that hijacks the user's control and gives them a bad day... or more innocent uses like a button that can close an ad, or a dark mode switch. You don't need any Javascript outside of dynamic behavior like that. [HTMLDog's Javascript tutorial](https://htmldog.com/guides/javascript/) is also decent but outdated.

* Markdown - not a core technology, but it's a more human-readable language that's meant to be converted to HTML by a markdown processor, so you don't have to write manual HTML. Markdown supports formatting like italics, bold, headings, links, and even images with an intuitive syntax. For example, you make something italics by putting asterisks around it. Of course markdown doesn't offer the full flexibility of HTML, and it requires running the markdown processor on the text before giving it to Nginx, but it can work alongside HTML (I write my pages in markdown but I can still put manual HTML in them when I need something markdown can't do).

The hardest part about rolling your own website is if you want a comment system. That requires a backend server and a database to store the comments in. The web server's job is just to serve the files containing HTML, CSS, and Javascript, so it doesn't handle that part, but they're designed to communicate with a backend so you still get the benefits of them. Backend or application servers are written in actual programming languages (and aren't the sort of thing we task newbie programmers to write). However, I develop [a solution for this, Didact,](/didact) that solves the obstacle of comments out of the box, while inviting customization and not taking over the way you write your content. (I did not write this article as a pitch for Didact - I actually wrote Didact *after* this because other people reading it made me realize it was necessary.)

---

That's all the ingredients to a website. If you're a non-programmer following this and get stuck, feel free to ask me.
