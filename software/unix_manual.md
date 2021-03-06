TITLE How to read Unix manual pages
NAV How to read Unix manual pages
DESC Unix manual can look like an illegible mess if you're not used to them. Here I explain the basics of their syntax.

Unix manual pages can look like an illegible mess if you're not used to them. The SYNOPSIS section at the top lists the syntax of the command; the syntax of this listing itself calls for some explanation.

Stuff inside brackets is optional. Usually these are flags.

Things with a bar between them are alternatives - they're mutually exclusive.

Underlined words that are not bold <span class="note">if you're not on FreeBSD the text style might differ from what I'm saying but it'll be consistent across the system</span> are not to be typed literally; they're descriptions of parameters. For example, the synopsis:

<pre><code><b>dosomething</b> [-f | -q] [-w] <i>file</i>
</code></pre>

means the command is called `dosomething`, anyd it takes an argument which should be the name of a file. The command supports three flags: `-w`, `-q`, and `-f`; `-f` and `-q` are mutually exclusive. Exactly what each flag does will be described in the rest of the command's manual page.

`...` means multiple things can be put here. If the `dosomething` command's synopsis had said:

<pre><code><b>dosomething</b> [-f | -q] [-w] <i>file ...</i>
</code></pre>

That would mean you can pass it more than one filename and it'll do whatever it does to all of those files. (Almost all commands allow this.)

Sometimes the synopsis is also specified in multiple parts, like:

<pre><code><b>dosomething</b> [-f | -q] [-w] <i>file ...</i>
<b>dosomething</b> -h
</code></pre>

This would mean that the command can be used like above, or it can be used as just `dosomething -h` with no other flags or operands. (Usually if a command has a `-h` flag, it stands for 'help' and causes the command to print a short description of how to use it instead of doing anything.)

There's [a web version of the FreeBSD manual pages](https://www.freebsd.org/cgi/man.cgi), and it looks much nicer, but you still need to know the synopsis syntax.

## Manual sections

There are manual pages on more than just usable commands. The manual is organized into a number of sections, with section 1 usually being for general commands and section 8 being for system administration commands. Section 5 is for information about file formats, sections 2, 3, 4, and 9 are for C programmers, section 7 is for "miscellaneous information" (section 6 is "games" but that's a misleading name). Normally the `man` command will search all the sections and show you the first one that matches the argument you specify. If you want to only search for pages in a specific section, you can do something like `man 1 ls` to search for a page on something called `ls` in section 1. The `-a` flag will show all the matching pages found in sequence (as opposed to just the first one).

When we want to talk about a specific manual page by section, it's standard notation to write `ls(1)`, to specify that we're talking about the page on `ls` in section 1, incase there are pages called that in other sections.
