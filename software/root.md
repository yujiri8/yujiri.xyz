TITLE The Unix 'root' account
NAV Unix 'root'
TEMPLATE DEFAULT

The concept of the "root" user on Unix systems is this: even people who have full ownership of the computer usually only occasionally need administrative privileges, so they have accounts that don't actually have permission to do those things. Instead, they can temporarily assume the powers of the "root" (administrator) user using the `su` (*switch user* or *super user*, an alternate name for root) command (or the more sophisticated `sudo` (superuser do), which might not be preinstalled). This is equivalent to the "ALLoW tHiS PrOGrAm To MaKE ChANgEs To YoUr CoMpUtER?!?" popup you get on Windows (I always hated that because everything you do on a computer is making changes to it), except that you usually have to enter your password to confirm, and that if you run a program without root privileges it'll fail instead of asking for your password (because it's `su` that actually asks for your password).

There are two main argued benefits on single-user systems:

1. Running untrusted software. If you ever need to run a program you don't trust, running it under an account that has full access to the system is kind of asking for trouble. If you run it as a normal user account, it won't be able to do anything that could harm the system without you entering your password.

2. The prevention of damaging mistakes - most commands that could royally mess up your system won't ask for confirmation if you're root, they'll just go right on ahead. Making you manually switch to root before doing this stops you from accidentally using administrator commands.

Honestly though, I [disagree](why_root) with the seemingly unanimous consensus that one should not log in as root.
