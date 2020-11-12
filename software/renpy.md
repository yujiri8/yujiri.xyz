TITLE Renpy Review
NAV Review: Renpy
TEMPLATE DEFAULT
DESC Most of Renpy's DSLs are confusing and full of as many arbitrary restrictions as redundant features.

# How Renpy and I met

[Renpy](https://renpy.org) is a visual novel engine. I got into it after playing [Doki Doki Literature Club](/reviews/ddlc), which is made with it. DDLC is far and away the best story I've ever seen and had such a huge impact on me than it was the first game I ever played mods for. There's a large modding community and they've come up with some really great extensions to the story. After playing a few (I got lucky and tried most of the best ones first), I was finally motivated to make one myself.

Hence came [MC's Revenge](/kaliruk/mc_revenge), a project I picked up from another modder who abandoned it for adoption. I finished MCR and the reception was good, so not long later I took up a much larger project that I'd actually been planning while I was making MCR, [Return To The Portrait](/kaliruk/return_to_the_portrait).

RTTP was a lot more ambitious and required me to deal with Renpy in a lot more depth, so I got to see the ugly complexities and learned to understand most of Dan's code in the original DDLC. So that's my experience with Renpy.

Okay, this is going to be kind of an unfair review because I'm only counting my grievances. That's genuinely how I feel about Renpy - I just never encountered anything that worked better or more easily than I expected. This is probably because I've never used any other VN engine, so I don't know, maybe Renpy isn't below average. But I do know that it has a lot of weak areas, many of which don't seem like they would've been hard to implement better.

<h1 class="bad">Complex character sprites aren't well supported</h1>

Expresive characters in a VN will have different sprite components that can be mixed and matched for a large number of posssible "poses". The standard of flexibility I've come to see as meager for a main character is: 2 left arm positions, 2 right arm positions, 6 mouths, 2 cheeks (normal and blush), 4 eyes (normal/shocked/side/closed), and 3 eyebrows (normal, angry, scared/remorseful); and you can combine them into hundreds if not thousands of combinations.

Unfortunately, Renpy seems designed with the assumption of sprites vastly less expressive than that, since you have to define each image you're going to use during init with an `image` statement, and for character poses that means a line for *every permutation you're going to use*. You can't dynamically generate their pose tags.

They've got [the `layeredimage` statement](https://www.renpy.org/doc/html/layeredimage.html) as an attempt at a more sophisticated way of handling this, but it's got a slew of its own problems. It makes your tags insufferably long since each component has to be space-delimited *and* have a unique prefix typed out everywhere you use it <span class="note">compare `sayori u11111` to `sayori ul1 ur1 m1 c1 e1 b1`</span>, it doesn't support composing other layered images as far as I can tell, and it seems to cause incorrect image composition (some layers appear with lines of pixels missing between them that worked with hardcoding `im.Composite`), and so despite how badly I needed this feature for RTTP and how many hours I sank into trying to make it work, I ended up not using it. (Part of the difficulty is that the main DDLC characters also have two different outfits and *secondary poses* which make this even more complicated, and one of them has two heads (normal and looking away), both of which can be used on either pose. The `layereredimage` system didn't seem able to accomodate that easily.)
<!--
and more critically, when you have optional slots with the <code>layeredimage</code>
approach, setting a pose code without an option for a slot doesn't erase the currently drawn option.
-->

A good visual novel engine would be designed with the assumption that a character will have too many possible poses to hardcode them all, so it would support using a function that converts the posecode as a string to whatever object the VN engine takes for its `show` statement.

This inadequacy is the whole reason u/AgentGold had to write the 1800-line `Create_Definitions.pl` for DDLC modders. Implementing pose codes better would have saved most if not all of that tremendous amount of work, as well as hundreds of lines of `image` declarations in almost every VN made with Renpy (which noticeably slow down startup - starting RTTP for the first time can take a whole minute before the window comes up). It would enable developers and their artists to create more flexible and more expressive character sprites.

<h1 class="bad">Too many DSLs... that all do the same thing</h1>

I'd expect to run into at least one DSL for a visual novel engine. Script language makes sense. But Renpy has two DSLs besides script language and the `layeredimage` language: [screen language](https://www.renpy.org/doc/html/screens.html) and ATL ([animation/transformation language](https://www.renpy.org/doc/html/atl.html)), and neither of them is simple or intuitive.

In screen language, you give each button an `Action` attribute, and the `Action` is syntactically treated as a Python function call. Even the `NullAction` used when you want a button to do nothing is specified with `action NullAction()`.

The worse problem I have with screen language is that a lot of it seems to just be duplicating the functionality of either Python or Renpy script. [Built-in Actions](https://www.renpy.org/doc/html/screen_actions.html) include `Call`, `Jump`, `Show`, `Hide`, `Return`, `SetVariable`, `NullAction`, `If` (it takes a condition / action if true / action if false)... any of those sound familiar? There's a screen language version for just about every Renpy script statement I can think of, which is just capitalized and has different syntax. (Note that you also use actual Python flow control constructs in screen definitions, and even outright embed Python code and use variables, so I'm honestly not sure if there's ever a need for `If`.)

You also can specify multiple actions by passing a *Python list* of actions to the `action` attribute, even though you don't wrap it in a list if there's only one. This is a shining example of why convenience shortcuts can be harmful: if you're learning by example like I was, you see an action specified without brackets and naturally assume that passing a Python list would be either a SyntaxError or a TypeError. If single actions had to be wrapped in brackets, the readability cost of finished code would be minimal and Renpy would be more self-documenting. But to be fair I admit this point is arguable. I'm saying it because it's going to be important in a second.

And there's a lot more to this myriad of redundancy and confusion. Buttons in screen language can be made to show up but not be clickable with their `sensitive` property. *Or* this can be done by using the `SensitiveIf()` action - *as a member in a list of actions*. Because *that* makes sense. (I learned this way of doing it first, which led me to believe that it was the only way because it's so obviously the worst that I don't think anyone would choose it if they knew any other way.)

Similarly, there's a Python equivalent for almost anything Renpy script does. `renpy.image` can be used from a `python` block (which embeds literal Python code in script) as equivalent to the `image` statement, for example. But the Renpy way is almost always clearer and better, because, of course, that's how it was made to be used.

This all flies in the face of "[There should be one-- and preferably only one --obvious way to do it.](https://www.python.org/dev/peps/pep-0020)" Having this kind of ambiguity only confuses me and forces me to wonder what the difference is and which one I should be using.

Renpy's the best demonstration I've seen of why [features are bad](features). Even after working with Renpy for over a year and getting experience with almost every major area of functionality, there are still a *lot* of things I don't understand about it, and I never will since with any luck I'll never have to work with Renpy again.

<h1 class="bad">ATL doesn't support blocking animations or even uncancelable ones</h1>

Okay, so ATL has this distinction between *transformations*, which are for transforming or moving a sprite, and *transitions*, which are for defining how to transition between two images. Transitions are mostly used for things like scene fades. Transforms are used for positioning and focusing characters (zoom them in slightly) when they speak.

Apparently transitions are always blocking and transformations are always non-blocking. This is a reasonable *default* but not a reasonable hard rule. Sometimes I want to wait for an animation to finish or let other things keep happening while the scene fades.

It wouldn't even be a huge deal, but here's the worse problem with transforms: since they're non-blocking, and any transform you apply to a sprite replaces the previous one, transforms get interrupted and left unfinished by subsequent ones depending on how quickly the player moves through.

For example, if I apply my focus transform to a character at the start of their line, which only affects zoom, give them the unfocus transform at the end of their line, and then on the next line I give them an x-move transform to make room for another character to come on screen, it only works if the player waits for the transforms to finish before continuing. If they press space too quickly after the character's line, the x-move transform supersedes the unfocus transform and the character is left half-focused.

There's not apparently a way to tell Renpy that a transform should be instantly completed if it gets superseded (I went on the Renpy Discord and asked about it and got that response from the creator). You wouldn't believe the shitty ways I had to come up with to hack around this in Return To The Portrait. In the original DDLC, Dan's approach was to have every single use of a character animation specify both their destination position and their destination status (normal, focused, sunk). But that approach couldn't really work for my script because it doesn't play well with nonlinearity. There are scenes where a player choice affects what position a character's at but the dialogue is mostly the same. So if I'd done it Dan's way I'd have littered every such scene with a vomit-inducing amount of if/else branches.

<h2 class="bad">ATL doesn't support flow control</h2>

Of course, ATL is the only DSL that's not only well-designed enough to not reinvent Python flow control with its own unique syntax but also to *not support Python flow control*. If you want to do branching in ATL logic, you have to find some hideous workaround like having two different transforms and the decision logic actually be the in script.

<h2 class="bad">ATL doesn't support non-idempotent animations</h2>

You normally use the `pos` (`xpos` and `ypos`) properties to set positions. The `offset` properties (basically `pos` that can't take a fraction of the screen dimensions) are independent of those and could be used to work around this in some situations, but they still have to be idempotent, so at best this could work if you know you'll only need to nudge the character once.

And there's another problem with trying to use `offset` to get around this: since they're independent and transforms don't touch any properties they don't mention, if you later apply a transform that only sets `pos`, `offset` will stay how the previous one left it.

So pretty much, if you ever want to animate a character moving a specified distance instead of to a specified position, you have to keep track of their position. And you know what that means if your script is non-linear...

<h2 class="bad">ATL doesn't allow mixing relative and absolute positions to the same property</h2>

ATL parameters interpret position as absolute pixels if it's an int, and a proportion of screen width if it's a float. But of course this means you can't mix them. Want to show a character at 100 pixels to the right of the middle of the screen? Too bad, cause `xpos 0.5 + 100` would mean `xpos 100.5` - 100.5 times the screen width.

It's worse than that. That limitation's at least understandable why it's that way, but you can't even mix them in different places in the same transform. For example,
```
transform test:
    xpos 200
    linear 1 xpos 0.5
```
will make a character appear at 200 times the screen width and move to the middle over 1 second.
```
transform test:
    xpos 0.5
    linear 1 xpos 100
```
makes the character appear at half a pixel in and move to 100 pixels in. So apparently it just goes by whichever is last.

Again, in some situations you could use `xoffset` to get around this, but that's a timebomb for a few fun hours debugging when you add a transformation that needs to not touch `xoffset`.

<h2 class="bad">ATL doesn't support defining the duration of an animation based on moving at a constant speed rather than the total duration being a constant</h2>

I don't think I need to elaborate here. It's not needed that often, but this would've been the first thing I'd think of if I wrote the ATL specification.

<h2 class="bad">The zorder problem</h2>

Here's a common problem that needs solving in visual novels: different characters are shown on screen at once, and we generally want whoever's speaking to be "on top".

The zorder solution: each image onscreen has a zorder and images with higher zorders are shown on top of lower zorders. Whenever a character who's partly behind someone else has a line, you increase their zorder to be higher than the surrounding characters'.

The central problem of the zorder system is a lack of *purity*, in the functional sense. Since characters' zorders increase throughout a conversation as they need to be put on top of each other (but rarely decrease since it's always the person who's speaking that motivates a change), snippets of conversation have *side effects*, which makes it very troublesome to edit them or write nonlinear scenes, because if you change a snippet of conversation, it can affect the zorders everyone comes out of it with, which means everything from then until the next screen clear could need to be edited to reflect it.

Renpy also has the `behind` keyword to save you from having to keep track of the ugly growing zorder numbers, but it seems to be syntactic sugar on `zorder` (ie. it adjusts the character's zorder to put them behind the given other characters), and so it has its own problem. Imagine I have four characters on screen:

Alice(zorder 2), Bob(zorder 3), Carl(zorder 1), Dana(zorder 2)

Carl needs to start speaking. So I `show dana behind carl`, then `show bob behind carl`. Problem is, that puts Bob behind Alice as well!

In general, to avoid these unintended side effects we need the zorder change to be *on the character who's motivating the change* and not on the characters around them, otherwise the effects can ripple, requiring me to also `show alice behind bob` - three separate `show` statements for one character's zorder change.

`behind` is exactly the wrong solution. An `infrontof` keyword (ideally with an `all` parameter) would've been 100x more helpful.

<h3 class="bad"><code>persistent</code> object returns <code>None</code> on accessing undefined fields</h3>

No, that's really what happens. [Javascript](javascript) has infected Renpy. Goodbye run-time typo detection.

This isn't even how Python objects work. Someone presumably added extra code to make the global `persistent` object behave in an unexpected, useless and bug-prone way.
