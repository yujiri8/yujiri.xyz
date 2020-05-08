TITLE Unix Shell Use For The Absolute Beginner
NAV Basic shell use
TEMPLATE DEFAULT

A [Unix](why_unix) system is usually used through a command **shell**, which reads typed commands, runs them, and shows their output. The window the shell runs in is called a **terminal**. While there are lots of different shells, the basics are mostly the same between them, and that's all I plan on talking about here.

## Basic terminology

An **argument**, also called a parameter or an operand, is something specified as part of a command that tells the command what to do its thing to. For example, a command that displays the contents of a file would take the name of the file as an argument.

**Syntax** is the way information is formatted so it can be read and understood by a computer, like the grammar of a natural language, except that it has to be followed exactly.

A directory is the same thing as a folder. If you're used to Windows you're probably used to hearing them called folders, but in the Unix world directory is the more common term.

"Printing" text in the context of Unix usually means displaying it on the terminal, not printing with a printer.

## Basic command syntax

With that out of the way, the basic syntax of shell use is: the name of the command, then a list of operands, all separated by spaces. For example, the command `rm` removes files. Typing `rm file1 file2` would remove the file named 'file1' and the one named 'file2'.

## The prompt

Your shell displays its **prompt** before every command you enter. Depending on your shell, the prompt shows different information, usually including your username and the directory you're in (also called your **working directory**). The prompt can be customized, but that's a lesson for another article (and you can also find out how to do this by searching the web or by reading the manual page for your shell).

And that's all the bare necessities of shell use. For a command reference (including how to get help from the shell), see [my command reference](commands). The rest of the stuff I'm going to talk about here is super important, but not as important as knowing a few basic commands.

## Flags

This isn't technically about the shell, but most Unix commands can be passed certain special arguments called **flags** (also called options or switches). Flags won't be treated as an operand; they change the behavior of the command in some way. Flags usually start with `-`. For example, the `rm` command supports the `-i` flag, which stands for "interactive" or "inquire", and causes `rm` to ask for confirmation before each file it removes, showing the name of the file and waiting for you to enter 'y' or 'n'. You can make this the default behavior for the command if you want (but that's a lesson for another article).

Do be warned that some commands expect flags to be specified before operands - `rm -i file` will ask you for confirmation to remove the file named 'file', but `rm file -i`, at least on my system, removes the file named 'file' and then tries to remove the file named '-i', and prints a message saying that it couldn't remove it because it doesn't exist.

(There are ways to operate on files that start with dashes without relying on this. Usually you can prevent a command from interpreting something as a flag by passing the special flag `--` first, which means "don't interpret anything after this as a flag".)

### History search

Almost any shell has command history, which allows you to press the up arrow to put the last command you ran on the command line (but without running it - you'll have to press enter to run it again). You can go as far back in your history as you want by pressing up. Pressing down takes you to the next more recent command. This feature is insanely useful. Not only can you recall exact commands, you can edit them - if you ran a super long command a few entries ago and you want to run a slightly different version of it, you can use the up arrow to get the command back, and then edit it just as you normally would - you could just make the one change you wanted and not have to retype the rest of the command.

### Tab autocompletion

The tab key is probably an even more useful feature. If you press tab while typing a command, the shell will see if it can automatically complete the word you're typing. If you need to type a long filename, usually you can just type the first few letters of it and then press tab; the shell will type out the rest for you as long as there's only one file that starts with the characters you've typed. And it won't enter the command automatically after doing this so you'll be able to make sure it was what you expected before running it.

Tab autocompletion also works for command names if you're on the first word on your entry (since the first word is always the command name), but that's not as important since most Unix commands have short names anyway.

Most shells also have a feature where if you press tab and it can't guess what file you want because there's more than one possibility, pressing tab again will show you all the possibilities.

### Line editing

Shells provide special key sequences that help you edit the command-line you're typing more easily. For example, Ctrl-C in most shells clears the current line so you don't have to backspace it all. Ctrl-A usually takes your cursor to the beginning of the line (and Ctrl-E takes you back to the end). The Home and End keys also do that, but nobody uses those; they're too far out of the way on most keyboards. Ctrl+left/right arrows are usually interpreted as "move by word"; pressing ctrl-left will move your cursor one word to the left.

Most shells support quite a few line-editing functions and they're extremely useful, but they vary between shells and can be configured, so I'll not talk about them too much.

### Other control sequences

There are a lot of Ctrl+&lt;letter&gt; sequences that are very useful besides line-editing.

* Ctrl-D: signal that you're done sending input (you can imagine it stands for 'done'). If you use this with an empty command-line it'll exit the shell. Most programs that take text input when you run them use this as their signal to stop.

* Ctrl-C while a command is running: ask the command the stop (you can imagine it stands for 'cancel'). Most commands stop immediately when you Ctrl-C them, but they can be programmed not to. If you need to *force* a program to stop, there are other ways of doing that.

* Ctrl-Z while a command is running: pause the command (I think it's obvious what this one stands for). You'll get back to the shell prompt. (But like Ctrl-C, the program can be programmed to not respect this.)

* Ctrl-\\ while a command is running: ask the command to die. This is similar to Ctrl-C but a lot of programs treat it differently. This also requests the program to make a *core dump*, but that's something I won't get into.

	I guess if you want you can imagine that \ as a sword that kills the command.

* Ctrl-T: this actually only exists on BSD systems and not Linux, but it asks the command to print some information about what it's doing. A lot of commands just print a basic status line showing some cryptic information I won't get into here, but some commands print more useful and application-specific stuff.

	This one stands for "tell". And yes I just made that up.
