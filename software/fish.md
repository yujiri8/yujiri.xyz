TITLE Review of the Fish shell
NAV Review: Fish
DESC Fish is a shell that emphasizes "user-friendliness" and discoverability. Despite that pitch, it's quite sophisticated.

# How Fish and I met

[fish](https://fishshell.com) is a shell that emphasizes "user-friendliness" and discoverability. Its name stands for "friendly interactive shell". You wouldn't expect based on that that it'd be something for experienced Unixers, but it absolutely is.

Around the same time I learned [Go](go), fish was suggested to me, so I tried it out and initially shared the referer's opinion that it was awesome. I was a happy user for about a year. Then I had some bad experiences with fish, ran into some things fish actually had solutions for but I didn't know about them, and ended up giving [zsh](http://zsh.sourceforge.net) a try.

I had about the same experience with zsh as with fish: I was thrilled to leave behind my frustrations with fish, learned zsh's upsides, then learned zsh's downsides, and ended up going back to fish to give it another try after having gained some wisdom. (In particular, my biggest gripe with fish had been the context-aware autocompletion - see below - and I realized that I could probably disable it.) I've stuck with fish ever since and I've learned to be quite happy with it.

<h1 class="good">Little configuration required</h1>

fish's best features all work out of the box: syntax highlighting, history-based autosuggestions, better tab completion (see below), and everything else I'm going to mention. Pretty much the only configuration you need to do is shell aliases, environment variables, and your prompt. Other shells can more or less get those things but require a *lot* of tinkering to do so.

<h1 class="good">Tab completion isn't restricted to the beginning of a word</h1>

Other shells I've used can only autocomplete a filename if you type the start of it. fish's autocompletion is more advanced. From what I can tell, the algorithm is:

* If what you've typed matches the beginning of any filenames, autocomplete to that one or the biggest prefix common to all of them. If there's nothing that starts with what you've typed, proceed to the next rule.

* If what you've typed matches a contiguous part of exactly one filename, even if it's not at the beginning, autocomplete to that one. If no matches, proceed to the next rule.

* If exactly one filename contains the characters you've typed in order, autocomplete to that one.

This means if you have a number of files that start with the same few characters, you can skip that part and just type the first letter or two that's different. In another shell, you'd have to type at least the first character of the common part and autocomplete that first.

To be fair, this feature isn't a strict positive. There are some times when it results in unintended autocompletions where other shells wouldn't.

<div class="indent">

Example: `qww` and `saw` exist. If I mean to type `rm q` but my finger slips and I type `rm a`, and then press tab and enter instantly because I'm confident that the autocompletion will work, fish completes me to `saw` - because that's the only filename in the directory with an `a` in it - and I end up removing the wrong file. But the times it helps far outweigh the times it hurts in my experience.

</div>

<h1 class="good">Better response on failed autocomplete than any other shell</h1>

fish shows the list of possibilities after the first failed tab press, instead of requiring a second. I can't think of any rationale for not doing this.

fish is also the only shell I've seen that lets you use tab and shift-tab to navigate through the list of possibilities with the current option highlighted and even gives you a description of each item (for a file, it's type and size; for a command, the synopsis from the man page). Every other shell I've seen is missing at least one of the latter two facets of this feature, at least without heavy manual tinkering.

<h2 class="good"><code>**</code> globs</h2>

fish has a glob sequence that I don't know of existing in any other shell: `**` matches any string of characters even including a `/`, so basically it's like `(find`...`)` but without the clunk of embedding a subcommand. I can't express how many times I've benefitted from this convenience.

<h2 class="good">Manual pages for builtins</h2>

Thank the source! Other shells I've used don't have manual pages on builtins like `cd`; they just redirect to `man builtin`. The page for `bash` itself does explain most of them but for the love o' Unix, `man` pages are such an antiquated primitive system for documentation that putting *all* shell builtins *and* a complete description of shell grammar in one manual page is like saying, "We'll pay you $100 to not read the documentation", because that's how desirable it makes it to read. Why not put the whole source code for bash in one file while you're at it? There's a reason we don't do that.

Thankfully, fish comes to the rescue and has `man` pages for most builtin commands, in addition to a builtin named `help` that opens locally-stored HTML documentation on the shell's mechanics in your browser!

<!--Maybe the cd functionality-->

<h2 class="bad">The idea of "context-aware autocompletion" sounds awesome until you use it for a few months.</h2>

The other big difference between fish autocompletion and other shells', and the one where fish doesn't have the good side of the comparison, is that fish tailors its autocompletion to the command, meaning tab doesn't behave the same for different commands.

The fundamental problem with this is that intelligent autocompletion is only useful to me insofar as I knows how it works. If I don't know how my tools work, I can't predict their behavior, and so I can't pre-schedule more keypresses until after I've seen what my tab press did. Worse, more often I forget this and try to pre-schedule following keypresses only to realize my tab press didn't do what I thought it would and I'm looking at a messed up string of characters that causes me a delay before I even start backspacing them. Multiple seconds can be wasted each time fish surprises me with its "smart" autocompletion, which it still was on a regular basis after probably a year of using it exclusively.

The worst part of the context-aware autocompletion is the crazy shit fish does in a `git` repo. While it's nice to be able to type just the first letter of the first component of a long path with `git add`  and have fish spell out the entire path for me, it's not necessary in most cases because `git add` (and most if not all similar commands) works on directories. There are even some times when it actually can't do things normal tab completion can. When I try to `git add` a file that already has staged changes, fish won't autocomplete it even if it's the only possibility. Sometimes I hit tab multiple times and then stare at the command for an entire 1-2 seconds wondering why it won't work. *Did I misspell something? Did I inadvertenly remove the file at some point?* A common scenario to play out after that is that I backspace the last component of the path and tab hoping to see the automatic pseudo-`ls` output, but fish autocompletes me to a different file in the directory.

Of course, it's possible to delete all of fish's contextual autocompletions (on FreeBSD I just `rm /usr/local/share/fish/fish_completions/*`) and that's why I made this an h2 element. I didn't remove the criticism because "disable the feature by deleting stuff" isn't a satisfactory answer to "this feature that's on by default and can't be configured off as far as I could find is horrid".

<h2 class="bad">No <code>[]</code> globs</h2>

Zsh and bash both have these. They're not the most useful feature ever, but I miss them from time to time.

<h2 class="bad">Case correction</h2>

Fish tab completion or accepting suggestions will case-correct what you've typed in a lot of situations. Sometimes this is actually pretty neat, like for environment variables (since they're usually named in all caps). But what's truly horrid about this feature is that if you type letters and fish thinks they're the wrong case, it'll actually *display* them as the "corrected" case even before you press tab or accept a suggestion. But then, of course, if you enter the command without pressing tab, it receives the letters as the case you typed. So fish will show you a command and then execute a different one if you press enter.

Another issue with the case correction is exemplified by an experience I had recently. I had `st TODO *` in my history (`st` is my `grep` alias - 'search text'), but `st todo *` more recently. I type `st TODO` - I was holding down shift - then accept suggestion to get the ` *`, and I get `st todo *`. I had typed the right thing and fish incorrected my case.

<br>

---

<br>

Verdict: fish is a good shell. I'd hate to go back to bash or even zsh now. I absolutely recommend fish.
