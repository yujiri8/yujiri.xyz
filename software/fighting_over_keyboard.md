TITLE Fighting over the keyboard
NAV Fighting over the keyboard
DESC Some thoughts about better application design. Hopefully people will consider.

Most interactive applications have hotkeys, and most of us have at some point run into a situation where two applications that are on different levels (for example, window manager and browser) both want the same hotkey and one of them gets it and the other doesn't. I want to express some thoughts about what application designers should do to avoid this situation.

First of all, use all the modifiers. A keyboard has Ctrl, Shift, Alt, Windows/Command, and many also have Function (not even to mention the F keys), yet most application hotkeys are either Ctrl-, Ctrl-Alt-, or Ctrl-Shift-. There are some combinations I think I've *never* seen used, like Alt-Windows.

I think we should have a standard for what types of applications get which keys. I think the window manager should keep its hands to the Windows key and not touch the other modifiers. This is how I have my machine set up. Window managers usually don't need that many hotkeys anyway.

Main applications, like text editors and browsers, should get Ctrl- and Alt- (and probably also Ctrl-Shift-, Alt-Shift-, and Ctrl-Alt-Shift-). They're likely to need a lot more than the window manager. Take it from a [Nano](nano) user. Shells also belong in this category because line editing bindings are super important for productivity.

The terminal emulator is slightly more difficult. It probably shouldn't be in the same space as the window manager, but it needs some hotkeys of its own, like scrolling up. Maybe terminal emulators should get the Ctrl-Shift- space.

As for Function, maybe application launching hotkeys? On keyboards without Function it's probably passable to have them shared with the window manager's mod key.

Another thing applications should do is if they have customizable keybinds, allow the user to set mod keys instead of just individual hotkeys. For example, "Open" should be "Mod1 + O" and the user can set which key Mod1 is, as opposed to Open being Ctrl-O and Save being Ctrl-S. This way if you want to change the application to use Alt for most of its hotkeys instead of Ctrl you only have to change it in one place. (And of course I'd allow setting multiple "Mod#" placeholders.)
