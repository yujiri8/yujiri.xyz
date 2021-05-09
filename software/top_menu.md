TITLE Please exit the top menu cult
NAV Please exit the top menu cult
DESC The top menu most programs share is a menace. The categorization is nonsense.

You know the standard top menu bar that most applications share - usually File, Edit, View, Tools, Help, and sometimes others? The use of that menu makes me pretty mad for reasons other than what it's associated with to me (and other than that for most of the things there, you'd be crazy to not use the keyboard shortcuts - I understand the importance of discoverability). The categories just don't make sense in half the places it's used. It mostly makes sense in text editors, but for some reason the designers of almost every application mindlessly copy these categories no matter how inapplicable.

I open Firefox. Its menu tabs are File, Edit, View, History, Bookmarks, Tools, Help. File contains tab and window actions, "Email link" (what an insanely obscure feature, I don't know why that's there at all), Work Offline, Quit (because anyone needs that in a world where computer-illiterate people use window managers that put the X on everything), and "Restart (Developer)". What do *any* of those things have to do with files?

Their thinking behind putting tabs and windows there seems to be that tabs and windows in a browser are analogous to files in a text editor. The analogy is fair, but isn't a justification for the design. Put tab actions under a menu called Tabs, or maybe Window since it also opens new windows.

To be fair, there are a couple of options under there that do have to do with files, like Save Page As and arguably Print and Import from Another Browser. Not nearly enough to justify the category.

The Edit tab contains text editing buttons, which... I mean okay, you do write comments and stuff in browsers. Still completely redundant since those things are also available on right click in a text field which is much faster than pointing your mouse halfway across the screen (and the *widely standarized* keyboard shortcuts are faster still). But it also contains Find in This Page, which is not remotely about editing, and *Preferences*. What idiot thought it made sense to put *Preferences* under *Edit*? Especially when there's a *Tools* tab?

The View tab is pretty sensible, only thing to criticize there is... yes, this is for real in Firefox 75 (and I just noticed it while writing this): Enter Reader Mode has the same hotkey as Restart (Developer), and if I press it it restarts Firefox. I have not customized this. This must've been an oversight in development. I'd be pretty embarrassed if I shipped a bug like that to production, nevermind that for such a high-profile project, it should've been tested by multiple people before release.

`xfce4-terminal` has File, Edit, View, Terminal, Tabs, Help. File has *exclusively* tab and window actions, not even a single thing that has to do with files.

Wait - yes. Opening, closing, and detaching tabs is not under *Tabs*. This is less defensible than the Firefox one because this time there's literally a menu called *Tabs*. The Tabs tab only has buttons for switching and moving tabs, which... I mean I guess it's useful for keyboard users discovering the shortcuts, on the off chance that a keyboard user doesn't already know them?

Edit has Preferences, as in Firefox.

Naming a tab "Terminal" in a terminal program is about equivalent to naming it "Stuff". As expected, there's no real common thread between the things there: Set Title, Find, Set Encoding, Read Only (which I feel belongs under either Edit or View), Scroll on Output (which is also in the Preferences window), Reset (which doesn't seem to do anything), Clear Scrollback and Reset, and one other thing: *Save Contents*. The one thing in any of these menus that has to do with files isn't under File.

Finally, the Help tab contains About and *Contents*. *Contents* isn't a very clear label for the button that opens documentation.

---

Can app designers just put a few minutes of thought into these menus? Is it so hard?
