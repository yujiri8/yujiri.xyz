TITLE Stop trying to take the user's choice
NAV Stop trying to take the user's choice
DESC If security designed to protect "me" involves me not having a choice, something's wrong with the underlying philosophy.

A software practice that needs to die is artificially preventing the user from doing things "for their own good". Two examples come to mind.

## HSTS

Defined in [RFC 6797](https://tools.ietf.org/html/rfc6797), HSTS aims to make it impossible to accidentally connect to a website over unsecured HTTP. But section 12.1, "No user recourse", reads:
```
Failing secure connection establishment on any warnings or errors
(per Section 8.4 ("Errors in Secure Transport Establishment")) should
be done with "no user recourse".  This means that the user should not
be presented with a dialog giving her the option to proceed.  Rather,
it should be treated similarly to a server error where there is
nothing further the user can do with respect to interacting with the
target web application, other than wait and retry.

Essentially, "any warnings or errors" means anything that would cause
the UA implementation to announce to the user that something is not
entirely correct with the connection establishment.

Not doing this, i.e., allowing user recourse such as "clicking
through warning/error dialogs", is a recipe for a man-in-the-middle
attack.  If a web application issues an HSTS Policy, then it is
implicitly opting into the "no user recourse" approach, whereby all
certificate errors or warnings cause a connection termination, with
no chance to "fool" users into making the wrong decision and
compromising themselves.
```
So they're saying not just that the browser should warn you when it has a certificate error, but that it should *not offer you a choice*, even though there's no technical reason why proceeding is impossible. And indeed the browsers have implemented this; Firefox and Chromium both won't *allow* me to connect if there's a cert error.

This is a flagrant breach of respect for the user. There have been plenty of times where I wanted to connect anyway, such as because the cert is expired and I need to find the contact information to tell the webmaster.

[An excellent quote from Linus](http://quotes.cat-v.org/programming/): "... If you think your users are idiots, only idiots will use it." Unfortunately, this time, even the smart people have no choice but to use it.

Luckily, [curl](https://curl.haxx.se) and [httpie](https://httpie.org) can be used to circumvent this for a single request, but that I need to get out of my browser to do so is absurd and makes some use cases unfeasible.

## root

Another example is programs that don't allow running them as root. [I live as root](why_root), and while I haven't the faintest quarrel with those who don't share my choice, I do have a quarrel with those who try to *prevent* me from making the choice by writing special cases into their software to check if they're running as root and artificially fail.

If it prints a warning and then proceeds (like [Tor](https://torproject.org)), that's perfectly cool (and on seeing that message I did make the necessary changes to make Tor not run as root). If it requires a flag to run it as root (like [LMMS](https://lmms.io) and Chromium), that's annoying, especially if the error message is [very condescending](https://stackoverflow.com/questions/25672924/run-bower-from-root-user-its-possible-how), but okay. What really insults me is applications that outright don't allow it. For example, GTK (I know GTK isn't an application). Well, funnily enough, GTK doesn't seem to have a problem with being run as root but *does* have a problem with running *setuid*. I once decided it would be good to have my browser - my least trusted application - have non-root privileges, so I tried to set Chromium to be owned by a guest user 'browser' and setuid, so I could be root but run my browser without those privileges. This plan initially failed with the following message:
```
(process:15337): Gtk-WARNING **: 15:42:24.216: This process is currently running setuid or setgid.
This is not a supported use of GTK+. You must create a helper
program instead. For further details, see:

    http://www.gtk.org/setuid.html

Refusing to initialize GTK+.
```
Note that their attempt to stop insecure uses of GTK actually stopped me from *dropping* root privileges. So I gave up on it and just continued running my browser as root. This is a good example of the broader truth that taking away people's options is often counterproductive.

Later on, I learned C and wrote a `browser_wrapper.c` that would let me do this, and later after that, decided it still wasn't worth the effort of making this actually work. since so many other files and directories had to be writable by `browser` for Chromium to work, and different browsers required different ones, and which ones seemed to change periodically, breaking my shell script to assign them. I'm not really worried about my browser compromising my OS. After all, it's open-source, and the odds that it will ever cause me harm that would've been prevented by not being root are pretty negligible.
