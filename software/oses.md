TITLE Notes on operating systems I've tried
NAV Notes on operating systems I've tried
TEMPLATE DEFAULT
DESC I've tried and researched a lot of Linux and BSD distributions in search of two goals. Here are my notes.

<style>
.good {
	color: #0b0;
}
:root[data-theme=dark] .good {
	color: #0f0;
}
</style>

I've tried and researched a lot of Linux and BSD distributions in search of two goals:

1. One to recommend to newcomers to Unix.

2. One I'd want to use myself.

	I'm a software idealist - I don't want to use an operating system that isn't the best practical one. Where practicality and design quality conflict, I seek a balance, because I realize practicality is the point of it all, and I'm not an OS dev, but I want to support and encourage good architecture and also I think using it helps me grow wiser about software.

Here are my notes on the ones I've tried or researched and why I won't or will use them. When I say things like "broken install process", I mean that when I tried it, I ran into things that were clearly releng mistakes, such as the installer telling me to run a command that doesn't exist. I consider egregious instances of this pretty much disqualifiers; I don't want to use a distribution that's had problems like that, even if they've fixed it since.

### <span class="bad">Anything Debian-based (incl. Ubuntu, Mint)</span>

Reputation: stable, user-friendly

Init system: systemd

Tried: Ubuntu years ago, Mint in 2020 summer

* Development headers are in separate packages from corresponding libraries, a huge pain for anyone who does development in C-family languages. (I don't even do development in C-family languages, but the occasional need to compile a program from source is enough to make me abhor this.)

* Packages are often years out of date.

### <span class="bad">Devuan</span>

Reputation: fork of Debian that switches out systemd for sysvinit. Everything else from Debian applies.

Tried: 2020 summer

* Broken install process: live environment's README referred me to nonexistent commands. I got it working anyway.

* Apparently supports OpenRC as an init system option now, but not default?

### Fedora

Reputation: cutting-edge

Init system: systemd

Tried: 2020 summer

* Good package manager. Colored output and ability to get more detailed info on uninstalled packages than other package managers allow.

### <span class="bad">Arch</span>

Reputation: DIY for advanced users

Init system: systemd

### <span class="mixed">Void</span>

Reputation: Linux/BSD hybrid

Init system: runit

Tried: 2020 summer, multiple times.

* Uses ZFS in user space to get around the license issues.

* Rolling release.

* LibreSSL instead of OpenSSL.

* I haven't been able to get [Sway](https://swaywm.org) working.

* Package manager hell. Just running normal install and uninstall commands produced a broken system that I could not fix.

### <span class="mixed">Trident</span>

Reputation: desktop distribution of Void

Tried: 2020 summer

* Guided installer works well, but doesn't support dual booting (understandably).

### <span class="bad">Gentoo<span>

Reputation: DIY for advanced users, nightmarish install process

Tried: years ago (mentor helped with install); no first-hand recent experience.

* Rolling release.

* No binary packages.

### <span class="bad">Slackware</span>

Init system: sysvinit

* No binary packages.

### <span class="bad">Alpine</span>

Tried: 2020-09-17

Reputation: secure, lightweight. Uses musl libc, which is argued to be better than glibc but means binaries compiled for glibc won't work.

* Broken install process: guided installer wrote invalid syntax to wpa_supplicant.conf and left me to figure it out. Wiki written in very poor English.

### <span class="good">Artix</span>

Tried: 2020 summer - present.

Reputation: Arch without systemd.

Init system: choice of OpenRC, runit or s6. I use OpenRC.

* Due to the three init system options, packages with service files are separated into variants like `thing-openrc`, `thing-runit`, `thing-s6` and just `thing` which is only the program itself without a service file. This makes it a bit cumbersome to figure out exactly what you need to install, but the service versions pull in the main package as a dependency, so it's not too bad.

* There are desktop and manual installers. The guide for the manual installation is really unclear about partitioning, but once you know what to do, it works. At least it isn't years out of date.

* Package manager supports colored output and protected packages but they need to be configured. (Same package manager as Arch so I assume this applies there too, but I didn't put it there because I don't know for sure.)

### <span class="good">FreeBSD</span>

Tried: unknown year - 2020 summer.

Reputation: the go-to BSD.

Init system: BSD init

* SIGINFO!

* Native ZFS!

* [Jails](https://www.freebsd.org/doc/handbook/jails.html)!

* Unlike Linux, FreeBSD separates stuff that comes with the base system from user-installed stuff. User-installed stuff goes in `/usr/local`. It seems to be done in the name of safety, but I mildly dislike it because it overemphasizes the arbitrary selection of what's shipped with the distribution.

* More fringe than Linux; lots of things support Linux but not FreeBSD or take manual effort to make work. Especially problematic as a dev; this was one of the main reasons I started looking into Linux.

* Sound system is OSS instead of ALSA. I've heard positive opinion of OSS, but it unfortunately makes it very difficult to record speaker output.

---

## Init systems

I keep referencing these and as you can see, systemd is a disqualifier at least for my own use. I explain this now.

### <span class="bad">systemd</span>

I don't have much personal experience with systemd. My negativity from it pretty much comes from hearsay, but well-sourced hearsay. Two in particular:

* [Randy Westlund's critique](https://www.textplain.net/blog/2015/problems-with-systemd-and-why-i-like-bsd-init/). This is someone I know and consider pretty reliable, and he's balanced too. He's not an anti-systemd zealot.

* [The Suckless folks](https://suckless.org/sucks/systemd/) have a much harsher condemnation. They wouldn't normally be very reliable on it, but they link the systemd patch notes on every criticism they make for proof. Read some of the list. It's absolutely horrifying.

### BSD init

Works well enough, but service files are extremely cumbersome.

### <span class="good">OpenRC</span>

Colored output. Service files are concise.

### sysvinit

Legacy standard. I don't know much about it, but the prevailing opinion seems negative.

---

A few other things I explain about the connection between my notes and my judgements: 

* I do not have a stake in rolling release vs point release.

* I want binary packages so things don't take forever to install.
