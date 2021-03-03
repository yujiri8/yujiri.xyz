TITLE Why I live as root
NAV Why I live as root
DESC I log in as root on my laptop for everything. I have an unprivileged account, but I never use it unless I need to run programs that require it. And to horrify you further, I have d aliased to rm -r.

I log in as root on my laptop for everything. I have an unprivileged account, but I never use it unless I need to run programs that require it. And to horrify you further, I <a href="https://github.com/yujiri8/configs">have <code>d</code> aliased to <code>rm -r</code></a>. It's been this way for years.

Seemingly everyone agrees this is a horrible idea, but I do it because I've weighed the benefits against the risks and decided it's far more than worth it. How many seconds do you lose each day as a result of forgetting to type `sudo` before `pkg install`, or `nano /etc/rc.conf`, or anything else you do that gets met with "permission denied" and then re-entered with `sudo`? I probably do more system tinkering than the average Unix user, but for me, the time losses were utterly massive. Something like a minute a day, maybe. Especially since shell aliases don't work through sudo.

Additionally, most destructive mistakes either wouldn't be protected by not being root (for example, wiping out all of your work which would be under your unprivileged account), or are made with commands that require root even to use safely, like ZFS operations, or really any kind of system config changes.

Automatic ZFS snapshots made from (root's) crontab mean I essentially can't cause my system any serious harm except with ZFS commands, which again require root anyway.

I have never had a major disaster as a result of being root. The worst I ever did was try to `rm /*` (not `rm -r`, since I wasn't using my aliases - it was a shell script gone wrong). I deleted a couple of things like `/COPYRIGHT` and `/entropy`, which I recovered from ZFS snapshots, and all was well. The whole event costed me only about 1 hour (and most of that time was spent assessing the damage rather than recovering from it.)

So that's why I live as root. I'm very happy with the decision, and find the pervasive insistence that it's some kind of horrible mistake a little insulting. I know what I'm doing with my own system and [don't need to be protected from myself](safety_choice).
