TITLE What Unix Is And Why I Use It - And Why You Should Too
NAV What Unix Is And Why I Use It - And Why You Should Too
TEMPLATE DEFAULT
DESC You don't have to be smart to use Unix. It's not hard to learn, and can make your life much better in the long run.

<br>

I'm going to write this article with the assumption of a fairly computer-illiterate reader who's never heard of Unix, so if you're average at computer use you'll probably already know a lot of what I say - I'm saying that up-front so this won't seem condescending if you do.

<br>

---

<br>

Unix is an alternative to Windows and Mac. These are [operating systems](https://en.wikipedia.org/wiki/Operating_system), the innermost layer of software installed on a computer. Unfortunately Windows has such a majority market share that a lot of people haven't even heard of Unix. A brief history:

[The original Unix was developed around 1970](https://en.wikipedia.org/wiki/Unix), but modern derivatives (they're a very large family) are alive and well. *[Linux](https://en.wikipedia.org/wiki/Linux)* is the more commonly known term, although Linux isn't technically Unix; it's [Unix-*like*](https://en.wikipedia.org/wiki/Unix-like) but it was written from scratch. (There's also the fact that when people say *Linux* they [usually mean the combination of](https://en.wikipedia.org/wiki/GNU/Linux_naming_controversy) [*GNU*](https://gnu.org) and Linux.) The most widely known operating system today that's still truly derived from Unix is a member of the [BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution) [family](https://www.bsd.org), [FreeBSD](https://www.freebsd.org). <span class="note">Unless you count Mac, which I've heard is technically based on a BSD kernel.</span>

But all the "Unix-like" systems have a lot in common that sets them apart from Windows and Mac: they're [free and open-source](https://en.wikipedia.org/wiki/Free_and_open-source_software), and they're designed with a very different philosophy: a computer should be able to do whatever the user is smart enough to use it for instead of only what the designers anticipated. (There's a lot more to the philosophical differences, but I like to summarize it that way.)

Unix-like operating systems are meant to be primarily used with a command-line, which is a text-based interface where you enter commands with the keyboard. They have perfectly good facilities for desktop use and many of them come with that already installed and configured, but still Unix often scares people off by the appearance that you need to be "smart" to use it. **This is NOT true.** You just need to be willing to invest a little effort to learn something that's much better in the long run. [You weren't born knowing how to use Windows, were you](/protagonism/personal_determinism)?

With that said, here are what I see as the main benefits of using Unix over Windows that would apply to pretty much anyone.

## 1. Efficiency of work.

Command-line interfaces are generally much more efficient and flexible than a desktop and file-explorer. And actually, Windows does have a decent command-line interface (PowerShell), but I still think the operating system is missing a lot of the benefit of it because most Windows programs are designed with the assumption of being used from a graphical interface. Almost everything you install comes with a graphical interface and only that so you can't automate its use or do other clever things with it.

Command-line interfaces do take some getting used to, since they tend to suffer from a lack of discoverability (which is why I made a [Unix command reference](commands)). But here are some of the advantages that make command-line interfaces more efficient in the long run.

1. The input devices. A mouse only has motion and a couple of buttons, but a keyboard has dozens of keys that can be pressed several per second in arbitrary combinations, allowing you to convey more in a shorter time. With a program designed to be used from a keyboard, there's almost no limit to the stuff you can do with hotkeys (especially since most Unix applications allow customizing them), and the more of them you're willing to learn, the faster you'll get.

2. Features like tab autocompletion and history search vastly reduce the amount of typing you have to do. You can often just type the first couple letters of something and then have your command shell complete it.

3. All of the most common commands on Unix have very short names, documentation available from the command line (and usually automatically displayed when you enter an invalid command), and when you get comfortable with them you can create custom aliases - command-line shortcuts - to make your work even more efficient.

4. You can do anything from anywhere. If you're in Windows File Explorer and you suddenly want to change system settings, you have to open a new application; it probably takes several clicks to even do that. In a terminal, you can run any command from any directory. There's no delay to open the settings app if you want to configure something while browsing your files.

5. The contents of a folder (more commonly called a directory in the Unix world) don't disappear when you change to a different directory. They remain above your current line in the terminal window so when navigating your files you can usually see the contents of many directories at once without doing anything special.

6. Commands are designed to be used in combination. Most of them give output in such a form that it can be passed to other commands to do things that neither command can do alone and which would just be impossible in a graphical interface. One of the best examples is the `find` command, which allows you to find any file matching some criteria, *and then combine it with another command to do something to all of those files*. For example, this command will delete all files in the current directory and any subdirectories that are links and have a space in their name, but before each one show the name of the file and ask you for confirmation: `find . -type l -and -name '* *' -ok rm '{}' \;`.

7. Command-line "glob expressions". Imagine you have a folder with 100 files and you want to move all of the .txt ones - but not the others - into a different folder. With Windows File Explorer, you're out of luck as far as I'm aware. In a terminal, this is a one-line command: `mv *.txt otherfolder`.

8. What do you do in Windows File Explorer if you want to, say, take a bunch of text files and find out which one has some snippet of text in it? Open each one in a text editor and use the editor's find feature? But Unix has the `grep` command to search for text patterns, allowing yet another stunning one-liner: `grep -l 'some text' *` will search all files in the current directory and show you the names of ones that contain the words 'some text'. `grep` even supports a common (in the Unix world) feature called [regular expressions](https://www.regular-expressions.info) that allows you to find text in a file *even without knowing exactly what it is*. I now scoff at any program that claims to offer a 'text search' feature but doesn't support regular expressions.

## 2. Customizability.

Unix operating systems let you modify literally anything about them without any legal ramifications or artificial barriers. It's easy to rename commands, tweak their default behavior, or even write your own. When was the last time you saw a Windows application that you could add your own buttons to?

## 3. Available for free.

Most personal computers come with Windows preinstalled, so you're paying the initial price of a Windows installation anyway, but that doesn't mean Unix's lack of a price isn't important. Ever had something happen to your Windows installation like a malware infection or a hardware failure that trashed it? You probably have to buy another Windows installation. Unix, you can reinstall for free as many times and on as as many computers as you want to.

It also applies to the programs running on it. The Unix community has developed free alternatives to most commercial Windows.

## 4. Open Source.

The source code for Unix and basically everything that runs on it is publicly available. The benefits should be clear.

1. Anyone can help find and fix bugs, which means bugs in Unix are far more likely to be found and fixed promptly.

2. Anyone can create a fork of Unix software and bring in [the benefits of market competition](/protagonism/market).

3. Unix developers have much less power to abuse than Microsoft and Apple, since all their code is public.

4. No risk of [vendor lock-in](https://en.wikipedia.org/wiki/Vendor_lock-in). Maybe the thought doesn't scare you as much as it scares me, but I find that a very compelling reason to avoid a closed-source operating system.

## 5. Everything is possible.

Windows lacks basic functionality in some areas, like writing a disc image to a USB drive. From what I've found it can't be done natively and you're forced to install third-party software for it ([Rufus](https://rufus.ie) is a great one). Unix looks at that and says, "What the hell? Why not let the same commands that work on normal files work on device files?" Unix users can burn an ISO file to a USB drive using the `dd` command, which is a built-in, general-purpose command with itself infintely more flexibility than anything you could install on Windows.

## 6. Less worrying about malware.

Unix isn't immune to malware altogether, but it's a lot less of a concern. There are several reasons:

1. Because Windows is the market leader, most people who write malware are writing it with the assumption that their victim's computer runs Windows, because they know that's how they can reach the most victims. Fewer people develop malware made to infect a Unix operating system. Also, malware developers know that average Unix users are far more knowledgeable than average Windows users, so they're a harder target.

2. Even if your computer were to be infected with malware, this would be a lot less of a problem if you're running Unix, since you can just reinstall for free in the worst case. You might lose some of your data but if you're not doing backups anyway, then really what are you doing with your life. (I'm lazy and don't do off-computer backups as much as I probably should, but I still do them every month or so, and outside of completely destroying my computer there's almost no other way I could need my backups due to ZFS, a FreeBSD filesystem feature that basically allows me to roll back my entire hard drive to almost any point in time on a whim.)

	And because the malware developers know this too, that's another motive for them to write viruses for Windows and not for Unix.

3. Windows itself doesn't handle permissions very well. Any program you run is running with your full privileges, which means there's really no way at all to safely run untrusted programs. Unix operating systems have a lot of ways to deal with this, like using a 'guest' or program-specific unprivileged account (and a lot of programs come with these), which you can do without signing out of your current account, or FreeBSD jails that prevent a process from touching anything else on your system (albeit setting up a jail is a bit involved).

4. Since, as I've mentioned, almost all Unix software is open-source, and on top of that almost everything you'll need to install is available from your distribution's standard repository, even needing to run a program that you don't trust is extremely rare in the Unix world. On Windows, on the other hand, you often find yourself installing third-party, closed-source software to get stuff done, and that's why you have to be so careful about installing shady stuff.

5. Unix distribution maintainers have no perverse incentive. They're not getting paid when you download their software, so their only motivations are some combination of fun and altruism. Microsoft arguably *stands to gain* from your computer being infected with malware, because it leads to you paying for tech support or paying for a new installation. That should be disconcerting at the least.

	And I'm not suggesting that Microsoft intentionally infects people's computers or anything, but I imagine it does bias them toward putting less effort into making Windows secure.

[Here's another interesting article that corroborates this point.](https://www.pcworld.com/article/202452/why_linux_is_more_secure_than_windows.html)

## 7. Recourse.

When a Windows program has an error, there's usually nothing you can do about it. You can't see the source code or the log file, and the error message, if any, is completely meaningless to you. When a Unix program fails, you'll usually have the information to find out what's wrong and fix it (or at least come up with a temporary workaround).

<br>

---

<br>

As biased as I am here, I'm not going to pretend that Unix doesn't have any downsides relatives to Windows or Mac, especially for the average computer-illiterate person. I do think it's worth it for most people to switch, but here are some drawbacks.

## 1. Compatibility.

Since Windows is by far the market leader, most commercial software and hardware is developed with Windows in mind. Like I said, open-source alternatives exist for the most part, but if you need a specific piece of commercial software (like AAA games), you might be out of luck. [WINE](https://www.winehq.org) is a venerable compatibility tool, but it's hit and miss.

Even within the Unix world there are some compatibility issues. In particular, software made for GNU/Linux doesn't always work on FreeBSD.

## 2. Stability.

Unix is developed by volunteers, so things do tend to have more bugs and outdated documentation than Windows software. (Although as I said above, the open-source nature offsets this.)

<br>

---

<br>

# Interested?

A Unix operating system can be installed without removing Windows. You can have both on the same hard drive, although switching between them requires rebooting. (Tip for Google searching: it's called dual booting.)

Incase I've made this sound worth a try, I'll give a few pointers as the install process can be hard to navigate without previous experience. The website for almost any Unix operating system will have a walkthrough, but they tend to be incomplete or outdated.

One difficulty you might run into  If you're installing onto the same hard drive as an existing Windows installation, you may have to shrink the Windows partition. You can do this from within Windows, and there are decent guides on the internet, but installing onto a separate hard drive is ideal if you have one.

It also makes a huge difference which distribution you install. Again, Unix is a large family, and many Unixes are aimed at experienced users. I'd suggest Devuan or Project Trident (Trident doesn't support dual booting though).

[Ubuntu](https://ubuntu.com) is definitely the most popular Unix-like. It's popular because it looks familiar to Windows users, but I think it's also become like Windows in very bad ways: regular reboots, bloated crapware all over everything, harder to customize, and ads.

I've also posted several more articles here aimed at Unix beginners. The next one "in track" would be [Unix Shell Use For The Absolute Beginner](shell_basics). The [Rute User's Tutorial and Exposition](https://rlworkman.net/howtos/rute) is another guide with an huge volume of good information, but I think his explanations are overly technical, and he often includes long sections in the early chapters about concepts I wouldn't have touched yet. Still, it's an excellent resource.

Also, if I've convinced you to try out Unix and you get stuck with something installing or using it, don't give up! There are an incredible number of helpful people on the forums and mailing lists for every Unix operating system, and comments below are welcome - I'd be thrilled to help a new person get into the Unix world. ([This article](http://catb.org/~esr/faqs/smart-questions.html) is a valuable read on getting help :))
