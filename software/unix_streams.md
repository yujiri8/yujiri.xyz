TITLE Unix process streams explained
NAV IO and standard streams
TEMPLATE DEFAULT
DESC The default streams are stdin, stdout, and stderr - standard input, standard output, and standard error.

**I/O**, or **IO**, stands for input/output. Anything a program does that affects or uses something outside of its own memory, like writing data to a file, or using a device (such as playing audio), is I/O.

Some terms you'll encounter a lot in the Unix world are *stdin*, *stdout* and *stderr*. These stand for standard input, output, and error, and are the main ways processes do I/O. For example, the `cat` command after reading the named file writes its contents to stdout. Normally when you run `cat` in a terminal its stdout will be the terminal, so you'll see the text of the file appear on screen. But you can make it go somewhere else instead.

The `|` character (that's a pipe, not a 1, I, or l) is the symbol used by most [shells](shell_basics) to redirect a command's stdout to be the stdin of another command. For example, if you have a progam called `sendemail` that lets you type text when you run it and then sends it as an email, but you want to automatically feed it the contents of a file named `letter`, one way to do it is:
```sh
cat letter | sendemail
```
`sendemail` will run as if you had manually typed the contents of `letter` into it, and you won't have to do anything else.

This would be extremely useful, except that most Unix commands I can think of that you would want to `cat` a file into support just giving it the filename as an argument, making `cat` unnecessary. Piping is super useful in general though; just not with `cat`. (`grep | less` is a common example of where it's useful.)

## So what's stderr?

Stdout is for normal output - the expected output of a command. Commands write to their stderr stream instead of stdout if they fail. For example, if you try to `cat` a file that doesn't exist, `cat` will print an error message, and it'll still show up in the terminal just like it was sent to stdout. But the `|` only redirects stdout (at least in shells I've seen). So if you do the same `cat letter | sendemail` command, but the file `letter` doesn't exist, cat won't send the error message to `sendemail` and cause it to get sent it as an email. The error message will still show up on your terminal. (It's still up to the person who wrote `sendemail` to make it not react to this by sending an empty email, but at least this way you'll find out that something went wrong.)

## Other forms of stream redirection

There's a lot of other useful stuff you can do by changing where a process's stdin, stdout, and stderr are coming from or going to. For example, in most shells the `>` character is like `|` except that it writes the output to a file instead of to the stdin of another command. `dmidecode > output` would run `dmidecode` but save its output to the file named `output` instead of printing it to the terminal. You can do this with any command.

Another useful form of this is **command substitution**, which lets you use the stdout of a command as arguments to another. Most shells do this with backquotes (\`). For example, <code>stat &#96;cat files&#96;</code> will run `cat files`, reading the text from the file named `files`, and then run `stat` on each file listed in there.

Shells do have ways of redirecting stderr, mixing it in with stdout or sending it to a different file, et cetera, but I think you get the idea now. The rest of that stuff is just a matter of looking up the syntax for your shell.

## Clarifications

There are some possible misunderstandings I should dispel before I end this.


* Not every command uses the standard streams at all. In general, if it doesn't take interactive input, it's not using its stdin stream.

	(Notably, `cat` *does* use its standard input - or at least it can. You may have noticed that if you run it without any filenames it waits for you to type input. Whatever you type will be echoed back line-by-line. Ctrl-D to get out of this.)


* Things like reading files and playing music are not done with the stdin, stdout or stderr streams. When a program reads a file it's not using its stdin; it's just calling a function that opens the file behind the scenes. Likewise, a command that plays music is doing it by accessing your sound card, not writing the audio to stdout.

	The downside of programs not using the standard streams is that then the user can't easily change where they're going, which makes the command less flexible. But for something like playing music that wouldn't really be useful anyway because you don't want the raw audio data dumped on your terminal screen; and if a program used stdin to read its configuration file then you'd have to know where that file is and pipe it in to the command every time you wanted to use it.

* The definition of a "stream" is that it can be read or written to gradually. A process's stdin doesn't have to all be available for the program to start running, whereas if the output of another command is part of its arguments, then that other command does have to complete first because a process has to have access to all of its arguments upfront. Streams allow us to run commands in parallel, whereas arguments are more convenient for things that are supposed to be treated as distinct items rather than a stream of data.
