TITLE How to make fragment links survive position:sticky
NAV How to make fragment links survive position:sticky
TEMPLATE DEFAULT
DESC The problem: your site has a top bar with position:sticky that covers the top of the fragment on load.

Tidbit I think might be useful for others since it took me so long to come to this solution.

**The goal:** you want to give your headings `id`s so URL fragments can be used to link to sections.

**The problem:** your site has a top bar with `position:fixed` or `position:sticky` that covers the top of the fragment when you load the page with a fragment link.

**The solution:** *kludgy Javascript workarounds*.

Here is the function we want to use:
```
function scrollFix() {
	const section = document.getElementById(window.location.hash.slice(1));
	if (!section) return;
	const offset = section.offsetTop;
	const navbarHeight = document.querySelector('navbar-selector').offsetHeight;
	window.scrollTo(0, offset - navbarHeight);
}
```

For my own use case, `offsetHeight`, `clientHeight` and `scrollHeight` are all equivalent. I used `offsetHeight` because I think it's the most semantically correct for the task; `scrollHeight` would (theoretically if the top bar itself had a scrollbar) include content scrolled out of view in the top bar, and so would not be a measure of the visible height. `clientHeight` is more subtly wrong; it excludes the height of borders (which my navbar doesn't have).

The window should have event listeners bound to this for both `load` and `hashchange` since `hashchange` doesn't fire on load.

With this, you could trivially build in a table of contents with links that would survive a `position:sticky` top bar and function properly.

There are a couple of caveats with this fix, though. The `hashchange` event - as well as its sibling `popstate` (which is inferior here because it needs to be punted to the ended of the event loop with `setTimeout(..., 0)`) - doesn't fire on a hash navigation if the hash is the same. If your heading links are the Google-style ones that just copy the link to your clipboard, that's okay, but if they're `<a>` elements that link to the section, that means the behavior doesn't work when a user clicks on the pilcrow of a section they were already navigated to (I'm thinking about switching mine to the other kind which is why I haven't looked into plugging this).

This also messes with scroll restoration when you reload - if you're navigated to a fragment and scroll away from it and then reload, it scrolls you back to the fragment. There might be a fix for that I don't know of. But hey, this is what we get for using klugdy Javascript workarounds. If only there was a canonical solution!