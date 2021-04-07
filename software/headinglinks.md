TITLE How to make fragment links survive position:sticky
NAV How to make fragment links survive position:sticky
DESC The problem: your site has a top bar with position:sticky that covers the top of the fragment.

Tidbit I think might be useful for others since it took me so long to come to this solution.

**The goal:** you want to give your headings `id`s so you can use URL fragments to link to sections.

**The problem:** your site has a top bar with `position:fixed` or `position:sticky` that covers the top of the fragment when you load the page with a fragment link.

There are two solutions I know about: an elegant pure CSS one and kludgy Javascript one; that said, there's at least one potential reason you might favor the Javascript one.

## Elegant CSS solution

The elegant CSS solution (credit to [Mark Chaves](https://dev.to/marklchaves/comment/110pb) for showing me this) involves the selector `:target`, which matches the element referred to by the URL fragment.
```css
:target::before {
	content: "";
	display: block;
	height: 6rem;
	margin-top: -6rem;
}
```
I sure wish I'd discovered that 2 years before I did. The only inadequacy is that it hardcodes the height of the top bar. If your top bar can vary wildly in height, you might be able to dynamically adjust this CSS, or resort to...

## Kludgy Javascript solution

The kludgy Javascript solution involves setting event listeners bound to both `load` and `hashchange`. (It has to be both since `hashchange` doesn't fire on load even with a fragment and `load` doesn't fire when you change fragments without reloading the page.)
```javascript
function scrollFix() {
	const section = document.getElementById(window.location.hash.slice(1));
	if (!section) return;
	const offset = section.offsetTop;
	const navbarHeight = document.querySelector('navbar-selector').offsetHeight;
	window.scrollTo(0, offset - navbarHeight);
}
```
For my own use case, `offsetHeight`, `clientHeight` and `scrollHeight` are all equivalent. I used `offsetHeight` (back when I used this) because it's the most semantically correct for the task; `scrollHeight` would (theoretically if the top bar itself had a scrollbar) include content scrolled out of view in the top bar, and so would not be a measure of the visible height. `clientHeight` is more subtly wrong; it excludes the height of borders (which my navbar doesn't have).

There are a couple of caveats with this fix, though. The `hashchange` event - as well as its sibling `popstate` (which is inferior here because it needs to be punted to the ended of the event loop with `setTimeout(..., 0)`) - only fires when the fragment *changes*, not when the user naigates back to the same fragment. If your heading links are the Google-style ones that just copy the link to your clipboard, that's okay, but if they're `<a>` elements that link to the fragment, that means the fix doesn't work when a user clicks on the pilcrow of a heading they were already navigated to.

Another drawback is that it messes with scroll restoration when you reload - if you're navigated to a fragment and scroll away from it and then reload, it scrolls you back to the fragment. There might be a fix for that I don't know of. The elegant CSS doesn't do that (at least, not with a soft reload).
