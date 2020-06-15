TITLE Recommended packages to install on Unix
NAV Unix packages to install
TEMPLATE DEFAULT

This page kind of serves three purposes: part of my Unix tutorial track, a place to recommend stuff to more experienced Unixers, and a personal checklist for when I set up a new system. Not everything's aimed at all three.

Since I'm a FreeBSD user, I'll be calling them by their FreeBSD package names, which might be different on other systems. (And for the Unix beginers, most Linux distros probably have a lot of these preinstalled.)

## Basic terminal utilities

* [`nano`](https://nano-editor.org) - text editor. Easy to learn (it shows help on the bottom by default) and yet quite configurable and powerful.

	Nano's often derided as primitive among experienced Unixers (editors more popular with them are [Vim](https://www.vim.org) and [Emacs](https://www.gnu.org/software/emacs)), but I think this reputation's undeserved. I've [written more about the unsung power and efficiency of Nano.](nano)

* [`fish`](https://fishshell.com) - "friendly interactive shell". My current shell of choice. The main sellings points are syntax highlighting, history-based autosuggestions, and better tab autocompletion without needing to install extra stuff and configure a whole bunch of crap (like you do to get those things with `zsh`). I've [written more about Fish and what's so great about it](fish).

* [`git`](https://git-scm.com) - one of the most popular [version control](https://en.wikipedia.org/wiki/Version_control) systems. I use it for all kinds of stuff, even besides code.

## Window manager and main graphical applications

* [`xorg-server`](https://www.freedesktop.org/Software/xorg) - X (the graphical window system) doesn't come with FreeBSD, and this is the package for it.

* [`dwm`](https://dwm.suckless.org) - My window manager of choice. A tiling window manager with no desktop and a wonderful way to use a computer productively. The only possible criticism of it I could see is the configuration. It needs a custom config file to be good (albeit it only takes a few changes to the default, unlike [xmonad](https://xmonad.org)), and its config file has to be compiled in, which means you *have* to build it from source. (And you have to rebuild it every time you change the config.) On the bright side, it builds in like 1 second.

* [`conky`](https://github.com/brndnmtthws/conky) - a configurable tool to easily get system status information. Most useful as a statusbar for `dwm`.

* `xfce4-terminal` - my currently preferred terminal emulator.

* [`firefox`](https://www.mozilla.com/firefox) - Firefox web browser.

* [`chromium`](https://www.chromium.org/Home) - Chromium web browser (different from but related to Chrome).

## Networking

* [`py37-httpie`](https://httpie.org), [`curl`](https://curl.haxx.se), [`wget`](https://www.gnu.org/s/wget/) - swiss army knives of HTTP (and some other protocols). `curl` and `wget` are both classics written in C; `wget` is GNU software and `curl` is MIT licensed. `httpie` is a much younger implemention in Python (also BSD-licensed) and is nicer in just about every way, but doesn't support everything the others do. I keep all three installed.

* [`youtube_dl`](https://yt-dl.org) - Download videos from Youtube and a few other sites. Yeah, apparently this isn't illegal...

* [`nmap`](https://nmap.org) - "network mapper". `nmap` is a tool for network exploration and security auditing, widely known as a port scanner; the package also contains `ncat`, which is a more sophisticated version of `nc` that supports TLS!

* [`tor`](https://torproject.org) - The Onion Router, a network anonymity tool. I strongly recommend you read about this if you haven't heard of it.

* [`vnstat`](https://humdi.net/vnstat/) - analyze network traffic statistics over long times.

* [`py37-scapy`](https://scapy.net) - Python library for sending and analyzing packets. *Horrible* documentation, but I think it is really powerful if you learn to use it.

* [`wireshark`](https://wireshark.org)/`tshark` - Wireshark is a renowned packet analysis tool. It can't *send* custom packets like Scapy can as far as I know, but for receiving and analyzing them it's much easier to use without trawling through huge amounts of vague documentation and experimenting for hours. `tshark` is a terminal version of wireshark. For some horrible reason, you can't have both installed at once on FreeBSD, and I remember thinking Wireshark's interface was horrid.

* [`siege`](https://www.joedog.org/siege-home/) - load testing tool (but HTTP/1.1 only).

* [`nghttp2`](https://nghttp2.org) - gives `h2load`, an HTTP/2 load testing tool. I remember thinking it wasn't as nice though. (That's not all this package is; just all I know about it.)

* [`openvpn`](https://openvpn.net/index.php/open-source.html) - open source VPN server and client. I followed [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-configure-and-connect-to-a-private-openvpn-server-on-freebsd-10-1) to set one up.

## Resources and monitoring

* [`lsof`](https://people.freebsd.org/~abe) - list open files. This might be preinstalled on GNU/Linux. It's a little different from `fstat`; I'm not sure if either can do anything the other can't, but I find `lsof` convenient to have.

* [`htop`](https://hisham.hm/htop) - like `top`, but looks nicer (has color).

* [`iftop`](http://www.ex-parrot.com/~pdw/iftop) - like `top`, but for network traffic.

## Misc CLI utilities

* [`gnupg`](https://www.gnupg.org) - GNU Privacy Guard, a renowned encryption tool.

* [`rsync`](https://en.wikipedia.org/wiki/Rsync) - swiss army knife of copying and backups. The `--delete` flag is one of the biggest things that makes it worth having over `cp` in my opinion.

* [`pv`](https://www.ivarch.com/programs/pv.shtml) - "pipe view". Monitor progress of data through a pipeline. `cmd1 | pv | cmd2` and it pipes `cmd1` into `cmd2`, but shows you the progress.

* [`tmux`](https://en.wikipedia.org/wiki/Tmux) - "terminal multiplexer". It has a lot of features I don't know about, but among them are the ability to use a terminal window in the fashion of a [tiling window manager](https://en.wikipedia.org/wiki/Tiling_window_manager) and to reconnect to sessions that get interrupted (for example, if the network cuts out while you're using `ssh`). I haven't taken the time to really learn `tmux` but I want to.

* [`entr`](http://entrproject.org) - "Event Notify Test Runner". Monitors files and runs a given command when they change. As of this writing I'm using it on this server.

* [`sudo`](https://www.sudo.ws) - more sophisticated account permission control than `su`. Due to [the way Unix treats the root account](root), even if your system is single-user, this is probably worth installing if it isn't preinstalled.

* `beep` - beep. All the laptops I've had have had significant difficulty getting this to work, but on this one I managed it. One of the useful traits of this tool is that, at least on my system, it ignores volume (although not muting).

* [`jq`](https://stedolan.github.io/jq/) - I'm not sure what it stands for, but it pretty-prints and manipulates JSON data. "`sed` for JSON".

* [`cloc`](https://github.com/AlDanial/cloc) - Count Lines Of Code. The advantages over `wc` are that it can count blank lines and comments separately from code lines, can automatically find just the source code files in a hierarchy, and it can separate them by language.

## Hardware and filesystems

* [`dmidecode`](https://www.nongnu.org/dmidecode/) - massive amount of info on all hardware. I can't think of any commonly useful information I don't know how to get without this command, but `dmidecode` simplifies things.

* [`cdrtools`](http://cdrtools.sourceforge.net/private/cdrecord.html) - burn CDs (and do other things with them I guess).

* [`zfsnap`](https://www.zfsnap.org) - makes automatic ZFS snapshots slightly easier.

## Media and file formats

* [`mpv`](https://mpv.io) - terminal-based music and video player.

* [`sox`](http://sox.sourceforge.net) - "SOund eXchange" is what this is apparently supposed to stand for. It's not as nice as `mpv` for playing music, but it's the most convenient way I know of to record audio from my laptop microphone.

* [`ffmpeg`](https://ffmpeg.org) - swiss army knife of multimedia manipulation.

* [`libreoffice`](https://www.libreoffice.org) - open source tool that can read "document" formats like `.xlsx`, if you ever have the displeasure of needing to work with those.

* [`antiword`](http://www.winfield.demon.nl/index.html) - convert `.doc` files to plaintext.

* [`zip`](http://infozip.sourceforge.net/Zip.html) - tool to work with the Windows-standard `.zip` file format.

* [`rar`](https://rarlab.com), `unrar` - tools for `.rar` files. (They're separate packages on FreeBSD.)

* [`xpdf`](https://www.xpdfreader.com) - dedicated PDF reader and manipulator.

* [`geeqie`](http://geeqie.org) - image viewer. It's not like you need `geeqie` to view images, and I don't even like the program, but I find it useful for viewing all the image files in a directory in a single window.

* [`tesseract`](https://github.com/tesseract-ocr/tesseract) - [Optical Character Recognition](https://en.wikipedia.org/wiki/Optical_character_recognition) for Unix! FOSS, and works out of the box.

* [`speech-dispatcher`](https://devel.freebsoft.org/speechd) - speech synthesis CLI tool.

## Art production tools

* [`lmms`](https://lmms.io) - Linux MultiMedia Studio, for writing music. Not great, but it's the only free one I know of.

* [`gimp`](https://www.gimp.org) - the GNU Image Manipulation Program. Again, I have plenty of gripes with it, mostly interface-related, but it's free and has been indispensible to me.

* [`ImageMagick7`](https://imagemagick.org) - libraries and CLI tools for image manipulation.

## X utilities

* `xinit` - ships the `xinit` and `startx` commands, which make dealing with X much simpler.

* [`xbindkeys`](https://www.nongnu.org/xbindkeys/xbindkeys.html) - set keybinds in the X environment. Incredibly useful. Don't live your life without it.

* `xmodmap` - manipulate the keymap in X.

* `xset` - X window system settings

* `xsetroot` - set the title of the "root window" in X. `dwm` uses this to set statusbar text, making it even easier to plug `conky` into it.

* [`xsel-conrad`](http://www.vergenet.net/~conrad/software/xsel/) - manipulate the X selection buffer (clipboard). (The command is `xsel`).

* [`scrot`](https://github.com/resurrecting-open-source-projects/scrot) - CLI tool for SCReenshOTs.

* `xmessage` - display a message in an X window. It's primitive and ugly, but sometimes this is the tool you need, for a script to get your attention or something.

* [`dmenu`](https://tools.suckless.org/dmenu) - an easy launcher solution from the same people that make `dwm`. The `dmenu` command by itself takes a list of options from stdin and displays a menu on the top where you can select one via typing, arrow keys and tab completion, and returns the selected option on stdout. The `dmenu_run` script it comes with is used as a plugin for `dwm` to make it easier to launch stuff you don't have a hotkey for without opening a terminal to type the command.

* `xev` - report X events. Enormously useful for debugging.

* [`xdotool`](https://www.semicomplete.com/projects/xdotool/) - programmatically do key strokes, mouse clicks, and other X events.

* `xlsclients` - list X client applications (applications running in X windows).

* `xwininfo` - get info about an X window by clicking on it.

* `xinput` - get information about X input devices.

## Other

* `linux-base-c7` - files needed for Linux compatibility. Also load kernel modules `linux`, `linux64`, and `linux_common`.
