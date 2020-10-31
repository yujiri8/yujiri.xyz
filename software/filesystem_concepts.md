TITLE Unix Filesystem Concepts For Beginners
NAV Unix filesystem concepts
TEMPLATE DEFAULT

This is part of my [Unix](why_unix) tutorial track, and assumes you've read [Basic shell use](shell_basics).

## Paths

All the files on any computer are organized in a tree of directories (folders). The one your shell starts in by default is your **home directory**. This actually applies to Windows too, but Windows hides the directory tree somewhat by making your "main" place your Desktop rather than your home directory, and providing shortcuts to "Documents", "Downloads" and "Pictures" or whatever else. Well, regardless of whether you're on Windows or Unix your *home* directory is actually a level "above" your Desktop and contains it, along with your Documents, Downloads, and whatever other subdirectories.

A file's "path" is its location in the directory tree. In other words, it contains the name of every directory on the path down to this file. On Unix, the directories are separated by a /, so a file's path might be `/home/bob/Downloads/image.png`, if your username is `bob`.

The reason it starts with a `/` is because `/` on the beginning of a path means the **root directory** - the directory at the top of everything that encompasses everything else. If a path doesn't start with `/`, it means the path *from the current directory* instead of from the root directory. For example, the path `Downloads/image.png` would be the same as `/home/bob/Downloads/image.png` if you're currently in `/home/bob` - but if you're in `/home/alice`, the same filepath would mean `/home/alice/Downloads/image.png`. These are called **relative paths**, as opposed to **absolute paths** or full paths.

Slashes at the end of a path just mean that it's the path of a directory and not a regular file. These slashes aren't usually necessary, but are still written sometimes for clarity. For example, `/home/alice/` is the same path as
`/home/alice`.

The directory `.` means the current directory. (And so `./Downloads` is also the same as just `Downloads`.) `..` means the parent directory, the one that contains the current directory.

## Links

"Links" are what shortcuts are called on Unix - files that, when you access them, are equivalent to accessing a different file instead. There are two kinds of links. *Soft* links or *symbolic* links (or just 'symlink') are the kind that are *only* a link.

*Hard* links are not a pointer to the original file; they're really just a different name for the same file. The hard link is indistinguishable from the original: if you delete the original, the hard link is still there and still has its contents, whereas with a symlink if you delete the original the link is broken.

Hard links are still different from copying the file. Hard links point to the same data; if you change one the other is changed too. That's because, again, they're just the same file accessible from two different paths. If you copy a file you're duplicating the data and the two copies don't automatically stay synchronized after that.

It might sound from that like hard links are pretty much just better than symlinks, but there are some times you can't use hard links. You can't hard-link a directory (due to the way directories are stored on disk), and you can't make a hard link to a file on a different filesystem (not even just a different storage device, but a different partition of the same device wouldn't work) because hard links are not two different files, and so they have to be stored in the same physical location.

<br>

---

<br>

That's not all I'm going to cover in this article; I plan to update it eventually with more content.
