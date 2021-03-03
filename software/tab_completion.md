TITLE Breadth-first versus depth-first autocompletion
NAV Breadth-first versus depth-first autocompletion
DESC There are a couple reasons I prefer breadth-first. With depth-first, there's state I can't see.

I've seen two approaches taken to autocompletion in shells and similar environments. As far as I know they don't have names, but I think breadth-first and depth-first accurately describe them.

* Breadth-first: The Unix shell standard. Pressing tab adds the largest prefix common to all possible completions.

* Depth-first: Used in Windows command prompt, [Micro editor](https://micro-editor.github.io), and a few other places. Pressing tab will type out the first complete possibility, even if there are others, and pressing tab more will cycle through possibilities.

There are a couple reasons I prefer breadth-first. With depth-first, I *can't* get the common prefix. If there are a lot of possibilities before the one I want, I have to press tab several times. And if I actually *just* want the prefix (for example to create a new file), depth-first probably can't help at all. Whereas if I have breadth-first and I just want to get the first suggestion, I can probably just type the first letter after the common prefix and tab again. In other words, breadth-first is better in depth-first's ideal case than vice versa.

And with depth-first, there's *state I can't see*. There's a difference between having typed `prefix` and having typed `pre` and completed it to `prefix` - in the former case, tab will cycle me through things starting with `prefix`, and in the latter case, through things starting with `pre`. My command-line is showing the same thing but it means something different. I trip over this occasionally.

Some environments, like [fish](https://yujiri.xyz/software/fish), use breadth-first completion but move into depth-first if you continue to press tab after a completion that didn't give you a full possibility. This is obviously better than having only one available, but if I only get one, I definitely prefer breadth-first.
