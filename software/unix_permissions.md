TITLE Crash course on Unix permissions
NAV Unix permissions

Unix was conceived with the idea of multi-user systems in mind, so it has a permission framework to allow different users to use a machine with different levels of access and to share files.

* Each file is owned on different levels by both an individual user and a group.

* A **group** is an arbitrary list of users. Each user also has a group that includes only them.

* Files can have three main types of permissions: read, write, and execute. Each of these permissions can be allowed or denied for three groups of users: the user that owns the file, the groups that owns the file, and other users.

	The most obvious use of group ownership might be to have a file that you can edit, a select group of other people can read but not change it, and people outside that group can't even read it.

* Seeing a file's metadata (who owns it, what its permissions are, how big it is, et cetera) doesn't require any of these permissions.

* Changing a file's permissions requires being the individual owner. Being a group owner and having all three permission bits won't do.

* The permission bits set on a file are also called its **mode**, hence the name of the `chmod` command: change mode.

For directories, the read bit by itself only lets you see the names of the files inside. To go into the directory, or to do anything else to its contents - even just to use the permissions you have on the files - you need *execute* permission on the directory.

Basically, you can think of a directory as a program that gives you access to the files inside. Take that analogy with a grain of salt, though.

There are some weird interactions possible. For example, if you have execute permission but not read permission on a directory, you can go into it with `cd`, but you can't see anything inside it. If you have permissions on some of the contents, you can do whatever you're allowed to do on those files, but can't even see that they're there with `ls`.

Write permission on a directory does nothing without execute permission. With both, you can add new files to the directory or rename files in it, and also delete files in it (see The Sticky Bit below).
<!--
You don't need write permission to a file to delete it. You just need
write permission to the directory that contains it. This makes sense if you think about it: having write permission to a file
already lets you effectively delete it, by just emptying it, so the only thing deleting a file really does is removes it from
the directory.
</p><p>
It also starts to make even more sense when you learn about how diretories are stored on the disk, but that's something I won't
go into here (I don't understand it that well myself).
-->

Sometimes, it might look like seeing the contents of a directory requires execute permission. This is because if you have `ls` colored output enabled (which your shell probably does by default), `ls` is actually doing that by `stat`ting every file it finds. `stat` tells it what type of file it is and what the access mode is, so it can color it bold blue if it's a directory, red if it's executable, et cetera. But of course `stat`ing a file needs execute permission on the directory that contains it.

## The setuid and setgid bits

There are a couple of special flags that can be set on files. ('Flag' here means a boolean (either on or off) piece of data.)

The **setuid** bit (set user ID) is a way of giving users a permission they wouldn't normally have, but only through a specific program. If you have execute permission on a setuid file, you'll be able to run that program *with the permissions of the user who owns it*. This is how commands like `su` work in Unix: the executable is owned by [root](root), but anyone can execute it and the program's internal logic will see about granting them root access. No one can *change* `su` though - no one has write permission - so you couldn't, say, change the program to do something destructive and then take advantage of its setuid feature to elevate your privileges.

The setgid bit works the same way, but gives you the permissions of the group that owns the file.

## The sticky bit

The sticky bit is the most complicated. Normally, write permission on a directory lets you delete *anything* inside it, even something you don't own and don't have write permission to. The sticky bit changes this rule so that even if you have write permission to the directory, you can't delete or rename stuff inside it that you don't own.

On regular files, the sticky bit has no effect.

<br>

You can find more information about this stuff in the manual pages `chmod(1)`, `chmod(2)`, and `sticky(7)`.

<br>

Information about the user accounts and groups on the system is stored in the files `/etc/passwd` and `/etc/group`. (`/etc/passwd` doesn't actually have the passwords; those are in a different file that only root can read, like `/etc/master.passwd` if you're on FreeBSD (I think it's different on Linux).) See `passwd(5)` and the like for more info on how those files are formatted.
