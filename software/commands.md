TITLE Unix Command Reference
NAV Unix command reference
TEMPLATE DEFAULT

<style>
code.ess {
	background-color: #00ffff;
	color: black;
}
code.basic {
	background-color: #0000ff;
	color: white;
}
code.com {
	background-color: #22ff22;
	color: black;
}
code.med {
	background-color: #ffff22;
	color: black;
}
code.adv {
	background-color: #ff0000;
	color: white;
}
</style>

I'm aiming this article mostly at absolute beginners to [Unix](why_unix), as I feel the guidance resources available for a Windows user switching to Unix on their own are woefully inadequate right now. It's meant to be read after my [guide on basic shell use](shell_basics). Note that a lot of my descriptions of the less essential commands refer to concepts I don't expect new users to know about; when I have time I plan to write more about those things, but you can probably find decent explanations with a web search.

There are lots of places that list "the basic" Unix commands, but I've never seen one of those references that lists enough of them to really show how awesome Unix is to someone who hasn't seen it. My eventual goal here is to list almost all the commands I know of, but I'll categorize them, so the reference is still usable. I'm writing this based on experience with [FreeBSD](https://freebsd.org), but most of it should apply to any Unix system.

I'll also color-code the commands according to how important they are. <code class="ess">Cyan</code> commands are the most essential; <code class="basic">blue</code> commands are very common; <code class="com">green</code> are somewhat common; <code class="med">yellow</code> are intermediate commands; and <code class="adv">red</code> are advanced commands that are either hard to learn or not used frequently.

## Basic filesystem usage

* <code class="ess">cd</code> - change directory. Equivalent to clicking on a folder in Windows File Explorer.

* <code class="ess">ls</code> - list the files in the current directory, or the specified directories if any.

* <code class="ess">cat</code> - show the contents of the named file(s) in the terminal window.

* <code class="ess">rm</code> - remove files.

* <code class="ess">mv</code> - move/rename files (those are actually the same thing).

* <code class="ess">cp</code> - copy files.

* <code class="ess">ee</code> - "easy editor". A basic built-in text editor that runs in the terminal. It's easy to use, but far better editors exist.

	If you're running Linux, you probably have `nano` installed by default. `nano` is much better than `ee`, and still shows help at the bottom with the default configuration. `nano` is very newcomer-friendly. I'd not recommend using `ee` unless your operating system doesn't have `nano` built-in. In fact, in that case you should probably just install Nano or another text editor rather than using `ee`.

* <code class="basic">pwd</code> - print working directory. Shows the directory you're in (although any decently configured shell shows this automatically in the prompt).

* <code class="basic">ln</code> - create links (called shortcuts on Windows).

## Getting help

* <code class="ess">man</code> - "manual". Shows the manual page for the argument you pass it (so `man rm` will get you the manual page on the `rm` command). (And yes there's a manual page on `man`.) I cover manual pages more [here](unix_manual). The other commands in this section are not nearly as important.

* <code class="med">apropos</code> - search the list of manual pages for one related to the argument.

* <code class="med">whatis</code> - equivalent to `apropos -f`. `whatis ls` will show all the manual pages that have 'ls' in their name.

* <code class="med">whereis</code> - show the location of the executable, manual page, and source code for a program.

## More advanced filesystem usage

* <code class="ess">stat</code> - display information about a file (on a BSD system, it displays in a very terse format by default; `-x` to make it display in a more human-readable way)

* <code class="basic">locate</code> - Search the hard drive for a filename containing the given argument. Since it uses a cached database, it can search the entire hard drive almost instantly, but the downside is that its database can get out of date. Depending on your operating system it's probably updated once a week or once a day (but you can change that).

* <code class="basic">touch</code> - Change a file's access and modification timestamps (useful for just creating an empty file).

* <code class="basic">file</code> - determine the type of content in a file (this can sometimes even detect programming languages and stuff).

* <code class="com">find</code> - print the paths of all files in the specified directory and below it (can be passed options, like `-type f -name foo` to search for a regular file named foo)

* <code class="com">chmod</code> - "change mode". Changes file permissions.

* <code class="com">chown</code> - "change owner".

* <code class="com">du</code> - "disk usage". Show the size of a file or directory.

* <code class="med">truncate</code> - change a file's size, by deleting the end or by adding zero-bytes to the end.

* <code class="med">tee</code> - write input both to stdout and to the named file.

* <code class="med">dd</code> - "data duplicator", basically like `cat` but has some different capabilities. (And the way it takes arguments is nonstandard as hell. I think this is a command that got ported from another operating system decades ago and never got adapted to follow standard Unix syntax.)

* <code class="adv">chflags</code> - "change flags". Sets certain flags on files, such as an immutability flag that prevents even root from changing a file without first unsetting the flag, or a flag that makes it possible to append to a file but not to overwrite it. I don't know most of these myself.

* <code class="adv">mkfifo</code> - create a fifo.

## Text files

* <code class="basic">less</code> - like `cat`, but lets you scroll through the output instead of printing it all at once. Useful for large files. You scroll with the up and down arrows (or the page up and page down keys), and might have to press q to get out of it.

	I believe the story behind this command's name is that first there was `more`, which did this job and was called so because it lets you see *more* than your screen can fit, and then somebody wanted to make a better version of it and so they called it *less*. Nowadays, `less` has basically replaced `more`.

* <code class="com">head</code> - show the beginning of a file. By default, the first ten lines. See its manual page for more info.

* <code class="com">tail</code> - show the end of a file. `tail` has a particularly useful flag `-f` that makes it keep following the file and print out any new data that gets appended to it. That's mostly useful for log files, but that's not something new Unix users are expected to deal with.

* <code class="com">grep</code> - search through files (or stdin if no files are specified), printing out only lines that match a certain pattern. The first argument specifies the pattern. For more info look up <a rel="nofollow" href="https://en.wikipedia.org/wiki/Regular_expression">regular</a> [expressions](https://www.regular-expressions.info) (or use `fgrep` which is a version that interprets the text to search for literally instead of as a regex).

* <code class="com">wc</code> - "word count". Print the number of words, bytes, and lines in a file.

* <code class="med">diff</code> - show the differences between two files.

* <code class="med">vis</code> - Like cat, but transforms nonprintable characters into printable representations.

* <code class="med">unvis</code> - Undo vis.

* <code class="med">nl</code> - Like cat, but number the lines.

* <code class="adv">sed</code> - "stream editor". Extremely flexible tool to do something to its stdin, like search/replace, and then send the output to stdout.

* <code class="adv">patch</code> - Take the output of a `diff` command and apply it to a file, making all the indicated changes. We don't often have to use this command directly because version control systems like git do it internally, although I'm not sure if they call out to `patch` or just implement the logic themselves.

## Shell utilities

* <code class="com">which</code> - find the location of the executable for a command. `which ls` should show `/bin/ls`, for example.

* <code class="med">source</code> - run a file as a shell script.

* <code class="med">xargs</code> - run a command on each input. `find . | xargs cat` will run `cat` on every file found by `find .`.

* <code class="med">umask</code> - show or set the default permissions of files you create.

* <code class="med">yes</code> - spam the specified message, or 'y' by default. Mostly used for piping into commands that would stop and ask for confirmation; piping `yes` into them effectively automatically says yes to everything they ask so you can walk away without the other command stopping and waiting for you. (And you could use `yes n` to make it spam 'n', to autmatically say no if the other command asks you anything.)

* <code class="adv">logger</code> - shell interface to `syslog(3)`.

* <code class="adv">tty</code> - get the filename of the TTY attached to stdin.

* <code class="adv">stty</code> - terminal driver settings.

* <code class="adv">perror</code> - 'print error' - show the description of an OS error code by number.

* <code class="adv">units</code> - a handy little CLI unit converter.

## Shell utilities - text

* <code class="com">echo</code> - print text to stdout. Mostly useful for scripts.

* <code class="med">uniq</code> - print only uniques lines in a file or in stdin.

* <code class="adv">printf</code> - like `echo`, but works in the fashion of the `printf` function from C.

## Shell utilities - filepaths

* <code class="med">readlink</code> - get the target of a symbolic link.

* <code class="med">realpath</code> - get the full path of a file.

* <code class="med">dirname</code> - get just the part of a filepath that shows the directory containing it.

* <code class="med">basename</code> - get just the base name part of a filepath, not the directories before it.

## Shell utilities - job control

* <code class="basic">bg</code>, <code class="basic">fg</code> - Move a job to the background/foreground.

* <code class="med">wait</code> - Wait until background jobs complete.

* <code class="med">time</code> - Run another command and print how long it took.

* <code class="med">disown</code> - Disassociate a process from your shell session, so that it won't die when your shell exits and your shell won't wait for it.

* <code class="adv">nohup</code> - Invoke a command immune to SIGHUP.

## Process management

* <code class="basic">ps</code> - "processes", or "process status". show a list of running processes and their PIDs. Often used with `grep` to find the PID of a particular process. `ps | grep firefox` is an easy way to find out what Firefox's PID is. Also by default it only displays processes owned by you and that have a controlling terminal. The flags for it vary by operating system, but on FreeBSD the normal flags you want are `-a` and `-x`.

* <code class="com">pgrep</code> - an easier way of finding a process's ID by its command name, but it doesn't show any other information.

* <code class="com">kill</code> - the main way of sending signals to processes. By default, sends the TERM signal.

* <code class="com">killall</code> - kill all processes with the given name. Useful as a shortcut for killing a process without having to first find out its PID.

* <code class="com">pkill</code> - does basically the same thing as `killall`, but has some different options, and doesn't print anything to stderr if the process doesn't exist.

* <code class="med">nice</code> - print the "nice value" of a process (how much priority it gets relative to other processes).

* <code class="med">renice</code> - change a process's nice value.

* <code class="med">procstat</code> - similar to `ps`, but shows different information by default. I'm not sure if either one can actually achieve anything the other can't, but `ps` is shorter.

## Monitoring

* <code class="com">top</code> - "table of processes". Monitor running processes and resource usage.

* <code class="med">uptime</code> - show how long the system's been up for.

* <code class="adv">fstat</code> - "file status". Get information about open files.

* <code class="adv">sockstat</code> - get information about open sockets.

* <code class="adv">netstat</code> - get information about open network connections. (`netstat -r` shows
the routing table.)

* <code class="adv">gstat</code> - "GEOM status". Get information about disk I/O.

* <code class="adv">iostat</code> - get information about all IO.

* <code class="adv">vmstat</code> - "virtual memory status". Get various statistics about the system. This command has a ton of options and I don't know half of its functionality.

## Timed command execution

* <code class="med">crontab</code> - set commands to run at regular intervals, such as every day, every hour, et cetera. This command is very useful but it requires understanding the format of the crontab files. The crontab(5) manual page has the needed information.

* <code class="med">at</code> - schedule a command to run just once at a specified time in the future.

## System administration

* <code class="basic">shutdown</code> - watch out; on most systems, this command doesn't work quite how you expect. On FreeBSD you have to pass the flag `-p` to make it actually turn the power off instead of just "halting" the system. It also requires specifying a time to do it at, which can just be "now".

	The time argument is useful if you have a computer that multiple people are logged in to remotely, and you want to warn everyone else before you turn it off. That may not be a common situation today, but as I understand it it was in the environent Unix was invented in.

	`reboot` and `poweroff` are aliases to make it easier to do exactly what it says, but I'm not if they exist on every Unix system.

* <code class="com">date</code> - get or set the system time.

* <code class="com">uname</code> - get information about the system. `uname -a` is the usual form to get more information. You should always include the output of this command when asking for help with Unix.

* <code class="com">service</code> - control system 'services' - programs that run in the background and are usually started at boot. For example, there's a service (`netif` on FreeBSD) that manages your internet connectivity, ones for a lot of stuff I don't know much about, and ones for a lot of programs you install that need to run in the background, like web servers. `service netif restart` will restart your **net**work **i**nter**f**ace service, which is an often helpful command for internet troubleshooting.

	As far as I know, the `service` command exists on every Unix, but on most Linuxes, system services are managed by the [systemd](https://www.freedesktop.org/wiki/Software/systemd) facility, and `systemctl` is the canonical way to control them, with `service` just being an alias for compatibility. <!--https://nosystemd.org/-->

* <code class="adv">sysctl</code> - "system control". Get or set system settings. These settings won't stay set on reboot; on FreeBSD you're supposed to set them in `/etc/sysctl.conf` if you want them to persist.

* <code class="adv">dmesg</code> - print the diagnostic messages printed at startup.

* <code class="adv">kldstat</code> - "kernel **l**oa**d** status", I guess? Lists currently loaded kernel modules. I think it's a BSD-specific concept, but I'm not sure.

* <code class="adv">kldload</code>, <code class="adv">kldunload</code> - load or unload kernel modules.

## Hardware and filesystem stuff

* <code class="med">pciconf</code> - get information about connected <a rel="nofollow" href="https://en.wikipedia.org/wiki/Conventional_PCI">PCI</a> devices. `pciconf -lv` to get the most information (probably wanna pipe that through `less`).

* <code class="med">acpiconf</code> - control <a rel="nofollow" href="https://en.wikipedia.org/wiki/Advanced_Configuration_and_Power_Interface">ACPI</a> power management. To get information about the laptop battery, at least for me the command is `acpiconf -i 0`. (And yes a well-configured Unix system will show that information in some kind of statusbar if it's a laptop, but there's no limit to how you can set that up and this is the underlying command that gets the information.)

* <code class="med">mount</code> - "mount" a device, making its contents accessible at a directory you specify (you have to do this when you connect a flash drive or similar). (Note I find this usually has to be passed `-t msdosfs` for flash drives; telling it the filesystem type.)

* <code class="med">umount</code> - unmount (pass it the place you mounted it at, not the name of the device).

* <code class="med">fstyp</code> - "filesystem type". Attempt to detect the type of a filesystem given the filename under `/dev`.

* <code class="adv">gpart</code>, <code class="adv">geom</code> - disk partitioning. I don't know much about these commands, but the goto for finding out a drive's partition table is `gpart show`.

* <code class="adv">diskinfo</code> - show physical information about a hard disk like its sectorsize and disk identifier and stuff.

* <code class="adv">zfs</code>, <code class="adv">zpool</code>, <code class="adv">zdb</code> - [ZFS](https://www.freebsd.org/doc/handbook/zfs.html)-specific utilities. ZFS is one of two main filesystems in use on FreeBSD (the other being UFS), and from what I've heard ZFS is pretty much better and more modern. These commands to some extent replace other hardware and filesystem-related commands on ZFS, for example `zfs mount` is needed to mount a ZFS filesystem. (But that's only for mounting filesystems that are themselves ZFS; you still use `mount` to mount things like flash drives if your machine uses ZFS.)

	To check disk usage, the usual commands I go to are `zfs list` and `zpool list`.

* <code class="adv">df</code> - "disk free". Show the used and availablee space of your disk. Can't be trusted on ZFS, but on other filesystems it's the equivalent of `zfs list`.

## Networking - configuration

Unfortunately, configuring networking on a Unix system if it doesn't work out of the box is very hard and frustrating, like any operating system. With any luck it'll work out of the box.

* <code class="com">ifconfig</code> - "interface config". The main tool to configure network interfaces.

* <code class="med">resolvconf</code> - DNS configuration.

## Networking - diagnostics

* <code class="com">ping</code> - Users coming from Windows or Mac might already be familiar with this command (it exists everywhere as far as I know). It sends a meaningless message to another machine, just to test that a connection can be established. Ping is arguably the single most important network troubleshooting tool.

* <code class="med">traceroute</code> - Show the path from the local machine to the specified destination.

* <code class="med">host</code> - Do a DNS lookup.

* <code class="med">drill</code> - More advanced DNS tool.

* <code class="med">whois</code> - Do a WHOIS lookup.

* <code class="adv">tcpdump</code> - Watch a network interface and dump all the packets it receives. Despite the name, not limited to TCP.

* <code class="adv">ping6</code> - IPv6 version of `ping`.

## Networking - use

* <code class="com">ssh</code> - "Secure SHell". The main way to log into a machine remotely. `telnet` is often taught first but it's not really easier to use and it sends all its data in unencrypted text, which is giving up any pretense of security. I'm planning to write a primer at some point in the near future on how encryption works. Or maybe I shouldn't bother because there are plenty of good ones I could just link to instead? I've yet to find a completely satisfactory one though. <!--ssh -XYC for graphical login-->

* <code class="med">scp</code> - "secure copy". Copy files between machines using a secure, encrypted connection.

* <code class="adv">nc</code> - "netcat". Send low-level network traffic. It's mostly useful for examinging stuff at the low-level to learn about how the internet works or debug my site (I've used it for both of those quite a bit :)). Although `ncat` (not builtin) seems to outmode it.

* <code class="adv">cu</code> - "call Unix". Used to connect over serial cables. This is probably by far the most obscure thing I list, but I've needed it to connect to a home-assembled BSD router when its internet wasn't working.

## Non-plain files

* <code class="med">gzip</code>, <code class="med">tar</code>, <code class="med">bzip2</code>, <code class="med">xz</code>, <code class="med">zstd</code> - compression and archiving tools. They all use different algorithms and produce different output formats. (The Windows-standard .zip file format can be worked with on Unix but at least on FreeBSD the program isn't preinstalled; `pkg install zip` will fix that problem.)

* <code class="med">hexdump</code> - read the byte codes in binary files.

* <code class="adv">strings</code> - Extract printable strings from a binary file.

* <code class="adv">uuencode</code>, <code class="adv">uudecode</code> - encode/decode files into a pure ASCII form (can do base64).

## User account management

* <code class="com">su</code> - "switch user". Switch to another user to run commands with their credentials. Most commonly used to switch to root. (Note that since this starts the other user's shell, Ctrl-D gets you back to yourself, by exiting your shell session as the other user.)

* <code class="med">pw</code> - I think it's BSD-specific, but on FreeBSD this is the main program for account management. It has subcommands to do most if not all acconut management stuff.

* <code class="med">chsh</code> - "change shell", although it does more than change an account's default shell. This command opens an editor (probably `vi` by default) and lets you use that to change any of the user information stored in /etc/passwd. (The information will be laid out in a friendlier format for editing.)

* <code class="med">passwd</code> - change a user's password. This one I think is standard on all Unix systems, but I'm not sure.

* <code class="med">id</code> - find out what user and group IDs a user has (yourself by default).

* <code class="med">w</code> - "who". Display info about currently logged in users (also `who` for less information).

* <code class="med">finger</code> - like `w`, but shows different information.

* <code class="adv">last</code> - find out when a user last logged in (there's a lot I don't know about this)

* <code class="adv">pwd_mkdb</code> - Update user information after directly editing `/etc/passwd` or `/etc/master.passwd`. Commands like `chsh` do this automatically so you don't have to.

## Compiled code files

* <code class="med">ldd</code> - "list dynamic dependencies". Shows the shared libraries an executable is linked against. Very nice for learning about the ecosystem.

* <code class="adv">size</code> - get segment size information about compiled ELF files.

* <code class="adv">nm</code> - read the symbol table of a compiled executable.

* <code class="adv">strip</code> - strip unneeded information from an ELF, reducing the size.

## Encryption

* <code class="adv">openssl</code> - Tool for working with SSL/TLS; can verify, create and sign certificates and stuff. The `s_client` subcommand can be used to fetch a server's certificate and initiate a TLS connection, essentially functioning as the TLS version of `nc`.
