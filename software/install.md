TITLE Recommended packages to install on Unix
NAV Unix packages to install

This page kind of serves three purposes: part of my Unix tutorial track, a place to recommend stuff to more experienced Unixers, and a personal checklist for when I set up a new system. Not everything's aimed at all three.

For packages that I [recommend installing through language package managers instead of distribution ones](https://dev.to/yujiri8/dreams-of-an-ideal-world-package-managers-1d7e), I'll indicate it with a prefix.

## Basic terminal utilities

* [`nano`](https://nano-editor.org) - text editor. Easy to learn (it shows help on the bottom by default) and yet quite configurable and powerful.

	Nano's often derided as primitive among experienced Unixers (editors more popular with them are [Vim](https://www.vim.org) and [Emacs](https://www.gnu.org/software/emacs)), but I think this reputation's undeserved. I've [written more about the unsung power and efficiency of Nano.](nano)

* [`fish`](https://fishshell.com) - "friendly interactive shell". My current shell of choice. The main sellings points are syntax highlighting, history-based autosuggestions, and better tab completion without needing to install extra stuff and configure a whole bunch of crap (like you do to get those things with `zsh`). I've [written more about Fish and what's so great about it](fish).

* [`git`](https://git-scm.com) - one of the most popular [version control](https://en.wikipedia.org/wiki/Version_control) systems. I use it for all kinds of stuff, even besides code.

## Window manager and main graphical applications

* [`sway`](https://swaywm.org) - A tiling window manager with no desktop and an incredibly productive way to use a computer. Great configuration and can reload the config without restarting. It's a remake of i3 for Wayland instead of X.

	Unfortunately Sway [outright prevents running as root](safety_choice#root), so I had to modify the source to get a satisfactory version. Building was easy enough though.

* [`alacritty`](https://github.com/alacritty/alacritty) - my currently preferred terminal emulator. Actually leaves out tabbing, which is a pain if you use a floating-only window manager but I think Sway actually makes it unnecessary.

* [`conky`](https://github.com/brndnmtthws/conky) - a configurable tool to easily get system status information. Most useful as a statusbar for Sway or DWM.

* [`dmenu`](https://tools.suckless.org/dmenu) - an easy launcher solution for simple, tiling window managers like DWM and Sway.

## Networking

* (pip) [`httpie`](https://httpie.org), [`curl`](https://curl.haxx.se), [`wget`](https://www.gnu.org/s/wget/) - swiss army knives of HTTP (and some other protocols). `curl` and `wget` are both classics written in C; `wget` is GNU software and `curl` is MIT licensed. `httpie` is a much younger implemention in Python (also BSD-licensed) and is nicer in just about every way, but doesn't support everything the others do. I keep all three installed.

* (pip) [`youtube-dl`](https://yt-dl.org) - Download videos from Youtube and a few other sites. Yeah, apparently this isn't illegal...

* [`nmap`](https://nmap.org) - "network mapper". A tool for network exploration and security auditing, widely known as a port scanner. The package also contains `ncat`, which is a more sophisticated version of `nc` that supports TLS!

* [`tor`](https://torproject.org) - The Onion Router, a network anonymity tool. I recommend you read about this if you haven't heard of it.

* [`wireshark`](https://wireshark.org) - a renowned packet analysis tool.

* [`openvpn`](https://openvpn.net/index.php/open-source.html) - open source VPN server and client. I followed [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-configure-and-connect-to-a-private-openvpn-server-on-freebsd-10-1) to set one up.

## Resources and monitoring

* [`lsof`](https://github.com/lsof-org/lsof) - list open files. It's a little different from `fstat`; I'm not sure if either can do anything the other can't, but I find `lsof` convenient to have.

* [`htop`](https://htop.dev) - like `top`, but looks nicer (has color).

* [`iftop`](http://www.ex-parrot.com/~pdw/iftop) - like `top`, but for network traffic.

* [`vnstat`](https://humdi.net/vnstat/) - analyze network traffic statistics over long times.

## Misc CLI utilities

* [`gnupg`](https://www.gnupg.org) - GNU Privacy Guard, a renowned encryption tool. Antiquated, but still used.

* [`rsync`](https://rsync.samba.org) - swiss army knife of copying and backups. The `--delete` flag is one of the biggest things that makes it worth having over `cp` in my opinion.

* [`pv`](https://www.ivarch.com/programs/pv.shtml) - "pipe view". Monitor progress of data through a pipeline. `cmd1 | pv | cmd2` and it pipes `cmd1` into `cmd2`, but shows you the progress.

* [`tmux`](https://en.wikipedia.org/wiki/Tmux) - "terminal multiplexer". It has a lot of features I don't know about, but among them are the ability to use a terminal window in the fashion of a [tiling window manager](https://en.wikipedia.org/wiki/Tiling_window_manager) and to reconnect to sessions that get interrupted (for example, if the network cuts out while you're using `ssh`). I haven't taken the time to really learn `tmux` but I want to.

* [`entr`](http://entrproject.org) - "Event Notify Test Runner". Monitors files and runs a given command when they change. As of this writing I'm using it on this server.

* [`sudo`](https://www.sudo.ws) - more sophisticated account permission control than `su`. Due to [the way Unix treats the root account](root), even if your system is single-user, this is probably worth setting up if it isn't already.

* [`jq`](https://stedolan.github.io/jq/) - I'm not sure what it stands for, but it pretty-prints and manipulates JSON data. "`sed` for JSON".

* (cargo) [`tokei`](https://github.com/XAMPPRocky/tokei) - Count lines of code in a directory. Distinguishes blank lines and comments from code lines and categorizes by language. Lots of other handy functionality.

* [`rlwrap`](https://github.com/hanslub42/rlwrap) - ever used a CLI application that really needed some goddamn line editing? Use the ReadLine Wrapper.

## Hardware and filesystems

* [`dmidecode`](https://www.nongnu.org/dmidecode/) - massive amount of info on all hardware. I can't think of any commonly useful information I don't know how to get without this command, but `dmidecode` simplifies things.

* [`zfsnap`](https://www.zfsnap.org) - makes automatic ZFS snapshots slightly easier.

* [`snapper`](https://snapper.io) - like zfsnap for BTRFS.

## Media and file formats

* [`mpv`](https://mpv.io) - terminal-based music and video player.

* [`sox`](http://sox.sourceforge.net) - "SOund eXchange" is what this is apparently supposed to stand for. It's not as nice as `mpv` for playing music, but it's the most convenient way I know of to record audio from my laptop microphone.

* [`obs`](https://obsproject.com) - flexible all-in-one app for recording and streaming.

* [`ffmpeg`](https://ffmpeg.org) - swiss army knife of multimedia manipulation.

* [`libreoffice`](https://www.libreoffice.org) - open source tool that can read "document" formats like `.xlsx`, if you ever have the displeasure of needing to work with those.

* [`antiword`](http://www.winfield.demon.nl) - convert `.doc` files to plaintext.

* [`zip`](http://info-zip.org/Zip.html) - tool to work with the Windows-standard `.zip` file format. `unzip` may be a separate package.

* [`rar`](https://rarlab.com), `unrar` - tools for `.rar` files.

* [`eog`](https://wiki.gnome.org/Apps/EyeOfGnome) - "eye of GNOME" (image viewer). It's not like you need a program like this to view images, but I find it useful for viewing all the image files in a directory in a single window.

* [`tesseract`](https://github.com/tesseract-ocr/tesseract) - [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) for Unix! FOSS, and works out of the box.

* [`speech-dispatcher`](https://devel.freebsoft.org/speechd), [`espeak`](https://espeak.sourceforge.net) - speech synthesis CLI tools. I've had success with espeak on Linux and speech-dispatcher on FreeBSD.

* [`zbar`](https://github.com/mchehab/zbar) - read QR codes.

## Art production tools

* [`lmms`](https://lmms.io) - Linux MultiMedia Studio, for writing music. Not great, but it's the only free one I know of.

* [`gimp`](https://www.gimp.org) - the GNU Image Manipulation Program. Again, I have plenty of gripes with it, mostly interface-related, but it's free and has been indispensible to me.

* [`ImageMagick`](https://imagemagick.org) - libraries and CLI tools for image manipulation.

## Other

* To get Linux compatibilty on FreeBSD, install `linux_base-c7` and load kernel modules `linux`, `linux64`, and `linux_common`.
