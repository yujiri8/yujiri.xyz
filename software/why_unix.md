TITLE What Unix Is And Why I Use It - And Why You Should Too
NAV What Unix Is And Why I Use It - And Why You Should Too
TEMPLATE DEFAULT
DESC You don't have to be smart to use Unix. It's not hard to learn, and can make your life much better in the long run.

<br>

I'm going to write this article with the assumption of a fairly computer-illiterate reader who's never heard of Unix, so if you're average at computer use you'll probably already know a lot of what I say - I just want to say that up-front so this won't seem condescending if you do.

<br>

---

<br>

Unix is an alternative to Windows (and Mac / OS X). These three are [operating systems](https://en.wikipedia.org/wiki/Operating_system), the innermost layer of software installed on a computer. Unfortunately Windows has such a majority market share that a lot of people haven't even heard of Unix. A brief history:

[The original Unix was developed around 1970](https://en.wikipedia.org/wiki/Unix), but modern derivatives (they're a very large family) are alive and well. *[Linux](https://en.wikipedia.org/wiki/Linux)* is the more commonly known term, but that's slightly inaccurate - Linux is [Unix-*like*](https://en.wikipedia.org/wiki/Unix-like) but it was written from scratch. (There's also the fact that when people say *Linux* they [usually mean the combination of](https://en.wikipedia.org/wiki/GNU/Linux_naming_controversy) [*GNU*](https://gnu.org) and Linux.) The most widely known operating system today that's still truly derived from Unix is a member of the [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution) [family](https://www.bsd.org), [FreeBSD](https://www.freebsd.org). <span class="note">I've heard Mac is actually based on a BSD kernel, but I don't think that counts because its design philosophy is closer to Windows than to Unix. I admit I don't know much about Mac, though.</span> This is my operating system of choice.

But all the "Unix-like" systems have two major things in common that aren't true of Windows: they're [free and open-source](https://en.wikipedia.org/wiki/Free_and_open-source_software), and they're designed with a major philosophy difference from Windows: a computer should be able to do whatever the user is smart enough to use it for instead of only what the designers anticipated. (The philosophy difference is a lot more intricate and debatable than that, but I like to summarize it that way.)

Unix-like operating systems are meant to be primarily used with a command-line, which is a text-based interface where you enter commands with the keyboard. They have perfectly good facilities for a graphical user interface (GUI) and many of them come with that already installed and configured, but still Unix often scares people off by the appearance that you need to be "smart" to use it. **This is NOT true.** You just need to be willing to invest a little effort to learn something that's much better in the long run. [You weren't born knowing how to use Windows, were you](/protagonism/personal_determinism)?

With that said, here are what I see as the main benefits of using Unix over Windows that would apply to pretty much anyone.

## 1. Efficiency of work.

I can attest from experience that daily work is massively more efficient in a system made to be used from a command-line instead of a GUI. And actually, I've been finding out recently that Windows does have a decent command-line interface with its PowerShell, but I still think the operating system is missing a lot of the benefit of it because most Windows programs are designed with the assumption of being used from a graphical interface. Almost everything you install comes with a graphical interface and only that so you can't automate its use or do other clever things with it.

Command-line interfaces do take some getting used to, I'll admit, since it's not easy to find out about a command you don't already know (my [Unix command reference](commands) should help tremendously with this). But here are some of the advantages that make command-line interfaces vastly more efficient in the long run.

1. Look at the input devices you're using: a mouse only has motion and a couple of buttons, but a keyboard has dozens of keys that can be pressed several per second in arbitrary combinations, allowing you to give more complex commands in a shorter time. With a program designed to be used from a keyboard there's almost no limit to the stuff you can do with hotkeys (especially since most applications made for Unix allow customizing them), and the more of them you're willing to learn, the faster you'll get.

2. Features like tab autocompletion and history search vastly reduce the amount of typing you have to do. Also all of the most common commands on Unix have very short names, documentation available from the command line (and usually automatically displayed when you enter an invalid command), and when you get comfortable with them you can create custom aliases - command-line shortcuts - to make your work even more efficient.

3. You can do anything from anywhere. If you're in Windows File Explorer and you suddenly want to change system settings, you have to open a new application; it probably takes several clicks to even do that. In a Unix terminal, you can run any command from any directory. There's no delay to open the settings app if you want to configure something while browsing your files.

4. The contents of a folder (more commonly called a directory in the Unix world) don't disappear when you change to a different directory. They remain above your current line in the terminal window so when navigating your files you can usually see the contents of many directories at once without doing anything special.

5. Commands are designed to be used in combination. Most of them give output in such a form that it can be passed to other commands to do things that neither command can do alone and which would just be impossible in a graphical interface. One of the best examples is the `find` command, which allows you to find any file matching some criteria, *and then combine it with another command to automatically do something to all of those files*. For example, this command will delete all files in the current directory and any subdirectories that are links and have a space in their name, but before each one show the name of the file and ask you for confirmation: `find . -type l -and -name '* *' -ok rm '{}' \;`.

6. Command-line glob expressions are another really useful feature. Imagine you have a folder with 100 files and you want to move all of the .txt ones - but not the others - into a different folder. With Windows File Explorer, you're out of luck as far as I'm aware. In a Unix terminal, this is a one-line command: `mv *.txt otherfolder`.

7. Also, what do you do in Windows File Explorer if you want to, say, take a bunch of text files and find out which one has some snippet of text in it? You give up. But Unix has the `grep` command to search for text patterns, allowing yet another stunning one-liner: `grep 'some text' *` will search all files in the current directory and show you all lines in them that contain the words 'some text'. `grep` even supports a common (in the Unix world) feature called [regular expressions](https://www.regular-expressions.info) that allows you to find text in a file *even without knowing exactly what it is*. I now scoff at any program that claims to offer a 'text search' feature but doesn't support regular expressions.

## 2. Customizability.

Unix operating systems let you modify literally anything about them without any legal ramifications or even much difficulty, if you're knowledgeable enough. It's easy to rename commands, tweak their default behavior, or even write your own. When was the last time you saw a Windows application that you could add your own buttons to?

## 3. Available for free.

I know most personal computers come with Windows preinstalled, but that doesn't mean Unix's lack of a price isn't important. If something happens to your Windows installation (whether a malware infection, a critical bug, a mistake you made or a hardware failure) you probably have to buy another Windows installation. Unix you can reinstall for free as many times and on as as many computers as you want to.

## 4. Open Source.

The source code for Unix and basically everything that runs on it is publicly available. The benefits should be clear.

1. Any random programmer can help find and fix bugs, which means bugs in Unix are far more likely to be found and fixed promptly.

2. Any random programmer can create a fork of Unix software and bring in [the benefits of free market competition](/protagonism/market).

3. The Unix distributors can't hoodwink you. They couldn't install software on your computer that does something other than what it says it does even if they wanted to, because anyone could catch them doing it.

4. No risk of [vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in). Maybe the thought doesn't scare you as much as it scares me, but I find that a very compelling reason to avoid a closed-source operating system.

## 5. Everything is possible.

Windows lacks basic functionality in some areas, like writing a disc image to a USB drive. From what I've found it can't be done natively and you're forced to install third-party software for it. Unix looks at that and says, "What the hell? Why not let the same commands that work on normal files work on device files?" Unix users can burn a .img file to a USB drive or a rewritable CD using the `dd` command, which is a built-in, general-purpose command with itself infintely more flexibility than anything you could install on Windows.

<!--dd almost certainly works with nothing special for .img to USB.-->
<!--dd may or may not work with nothing special for .iso to USB.-->

<!--<h2>7. Installing things is easier.</h2>
<p>
This might sound backward. But on Unix.
</p>-->

## 6. Less worrying about malware.

It's certainly not true that Unix is immune to viruses and malware of any kind, but it's a lot less of a concern. There are several reasons:

1. Because Windows is the market leader, most people who write malware are writing it with the assumption that their victim's computer runs Windows, because they know that's how they can reach the most victims. Fewer people develop malware made to infect a Unix operating system. Additionally, the malware developers know that most of the people who use Unix are far more knowledgeable about computers than average Windows users, so not only might they able to fix their computers, but they're a lot less likely to make a mistake that leads to them getting infected in the first place.

2. Even if your computer were to be infected with malware, this would be a lot less of a problem if you're running Unix, since you can just reinstall for free in the worst case. You might lose some of your data but if you're not doing backups anyway, then really what are you doing with your life. (I'm lazy and don't do off-computer backups as much as I probably should, but I still do them every month or so, and outside of completely destroying my computer there's almost no other way I could need my backups due to ZFS, a FreeBSD filesystem feature that basically allows me to roll back my entire hard drive to almost any point in time on a whim.)

	And because the malware developers know this too, that's another motive for them to write viruses for Windows and not for Unix.

3. Windows itself doesn't handle permissions very well. Any program you run is running with your full privileges, which means there's really no way at all to safely run untrusted programs. Unix operating systems have a lot of ways to deal with this, like using a 'guest' or program-specific unprivileged account (and a lot of programs come with these), which you can do without signing out of your current account, or FreeBSD jails that prevent a process from touching anything else on your system (albeit setting up a jail is a bit involved).

4. Since, as I've mentioned, almost all Unix software is open-source, and on top of that almost everything you'll need to install is available from your distribution's standard, official repository, even needing to run a program that you don't trust is extremely rare in the Unix world. On Windows, on the other hand, you often find yourself installing third-party, closed-source software to get stuff done, and that's why you have to be so careful about downloading shady stuff.

5. Unix distribution maintainers have no possible perverse incentive. They're not getting paid when you download their software so their only motivation here is simply writing good software out of some combination of fun and altruism. Microsoft arguably *stands to gain* from your computer being infected with malware, because it's likely to lead to you paying for tech support or paying for a new installation. That should be disconcerting at the least.

	And I'm not suggesting that Microsoft intentionally infects people's computers or anything, but I imagine it does bias them toward putting less effort into making Windows secure, and the way Windows handles permissions - see above - supports this theory.

[Here's another interesting article that corroborates this point.](https://www.pcworld.com/article/202452/why_linux_is_more_secure_than_windows.html)

## 7. Recourse.

When a Windows program has an error, there's usually nothing you can do about it. You can't see the source code or the log file, and the error message, if any, is one that's completely meaningless to you. When a Unix program fails, you'll have the information to find out what's wrong and most of the time it's possible for you to fix it.

<br>

---

<br>

As biased as I am here, I'm not going to pretend that Unix doesn't have any downsides relatives to Windows or Mac, especially for the average computer-illiterate person. I do think it's almost certainly worth it for you to switch in the long run, but here are some drawbacks.

## 1. Compatibility.

Since Windows is by far the market leader, most commercial software and hardware is developed with Windows in mind. If you need to use a commercial program developed for Windows it's going to be hit-and-miss getting it to work on a Unix operating system. It won't work natively, but you might be able to get it working using something like [WINE](https://www.winehq.org), a program developed for Linux and other Unix-likes to achieve compatibility with Windows.

Even within the Unix world there are a lot of compatibility issues. Software made for GNU/Linux sometimes has issues running on BSD, et cetera.

## 2. Stability.

Unix is developed by volunteers. Because of that, it's inevitable that even a good open source operating system is likely to have more bugs than Windows software. (Although as I said above the open-source nature offsets this downside significantly.)

<br>

---

<br>

# Interested?

If I've made Unix sound like something you might want to look into to, I encourage you to install a version of it on some computer. The website for almost any Unix operating system will have a walkthrough. It doesn't even have to remove Windows - it's possible to have both installed on the same computer, and even on the same hard drive, although switching between them requires rebooting. Unfortunately some hardware vendors make this difficult (my current Lenovo ThinkPad T480s refuses to boot from its secondary hard drive slot and I had to jump through quite some hoops to get around that). If you're unlucky you might have to toy with the [BIOS](https://en.wikipedia.org/wiki/BIOS) a bit, but it's almost certainly easier for your computer than it was for me to set up this one :)

There are some issues with device drivers on some hardware, particularly WiFi. Much of that stuff is proprietary and so some wireless cards aren't supported well or at all on Unix. Of course, if you're looking at installing Unix on a computer you already have, this isn't a big concern since you don't stand to lose much if it doesn't work. But when buying a computer as a Unix user it's a very good idea to do a little research on the hardware and just make sure someone else has gotten it working before. I've heard Linux usually has it better than BSD here, especially OpenBSD.

If you decide you want to try installing it, I'd recommend putting it on a separate hard drive if possible (if you put it on the same hard drive it's easy to clobber your existing operating system if you don't know what you're doing, and I've also heard horror stories about Windows taking the liberty of deleting other operating systems on the hard drive).

It also makes a huge difference which distribution you install. I'm a fan of FreeBSD but I don't recommend that if you're new to Unix because it comes without any graphical utilies installed - just the command line and the basic tools to build your own system. I've heard of [Project Trident](https://project-trident.org), which is a distribution of Void Linux that comes with a graphical environment preinstalled, but I've not used it.

[Ubuntu](https://ubuntu.com) is definitely the most popular Unix-like. It's so newcomer-friendly that it can look at first like it's just a reskin of Windows - its desktop has a different default background image and slightly different layout, but it's the same idea. I'd recommend avoiding it though. The reason is that I think in Ubuntu's quest to be friendly to newcoming Windows users they've lost a lot of the beauty of Unix and taken on many of the horrible problems Windows has. For one thing, Ubuntu needs to reboot every couple weeks or so for no reason. No other Unix-like operating system I've seen needs to do that and it's a sign that something is very deeply wrong with their programming. For another, it's become somewhat difficult to customize: the last time I was a major user of Ubuntu I tried to
switch window managers (from [gnome](https://www.gnome.org) to [xfce](https://xfce.org)) and sank many hours into it, I don't remember if I even succeeded in the end (this is a 5 minute task on FreeBSD or Gentoo). It also just seems bloated in general: it has dozens more processes running in the background than a more minimal system like FreeBSD without doing anything that FreeBSD doesn't, and that also says something about its development. I'll admit I have limited experience with Ubuntu in recent years, but all the more experienced Unix users I talk to seem to agree that it's bad.

I wish I could offer a confident suggestion for which Unix to start with, but the truth is I've only used a very small handful of them and Ubuntu was the only one of those that was designed for people new to Unix. My most confident suggestion right now is Trident.

I've also posted several more articles here aimed at Unix beginners and I plan to post more at some point. The next one "in track" would be [Unix Shell Use For The Absolute Beginner](shell_basics). The [Rute User's Tutorial and Exposition](https://rlworkman.net/howtos/rute) is another guide with an unfathomable volume of good information, but I think his explanations are overly technical, and he often includes long sections in the early chapters about concepts I wouldn't have touched yet. The book also assumes Linux. Still, it's an excellent resource.

Also, if by some chance I actually convince you to try out Unix and you get stuck with something installing or using it, seriously do not give up without asking for help. I'd totally enjoy the chance to help a new person get into the Unix world if you comment below, although my ability to help may be limited. There are also an incredible number of helpful people on the forums and mailing lists for every Unix operating system. [This article](http://catb.org/~esr/faqs/smart-questions.html) is a very good read on how to ask questions.
