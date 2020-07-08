TITLE Yujiri's homepage
NAV Yujiri's homepage
TEMPLATE DEFAULT
ONLOAD resizeIndex()
ONRESIZE resizeIndex()
DESC I'm a programmer, writer, and philosopher of all things. I post about everything from game design and storytelling and conlangs to philosophy.

<script>
function resizeIndex() {
	const container = document.querySelector('.indexlayout');
	const cardSeries = document.querySelector('card-series');
	const containerStyle = getComputedStyle(container);
	const containerWidth = parseFloat(containerStyle.width);
	const emSize = parseFloat(containerStyle['font-size']);
	const cardStyle = getComputedStyle(document.querySelector('a.card'));
	const cardWidth = parseFloat(cardStyle.width) + parseFloat(cardStyle.marginRight);
	const recentCommentsWidth = parseFloat(getComputedStyle(document.querySelector('recent-comments')).minWidth);
	const maxCols = Math.floor((containerWidth - recentCommentsWidth) / cardWidth);
	if (maxCols < 2) {
		container.style['flex-wrap'] = 'wrap';
		// If there's no recent comments panel, expand the other one.
		cardSeries.classList.add('solo');
		cardSeries.style.minWidth = '';
		cardSeries.style.width = '';
	} else {
		container.style['flex-wrap'] = 'nowrap';
		cardSeries.classList.remove('solo');
		const t = maxCols * cardWidth + 'px';
		cardSeries.style.minWidth = t;
		cardSeries.style.width = t;
	}
}
</script>
<style>
.indexlayout {
	display: flex;
}
card-series {
	display: flex;
	height: min-content;
	flex-wrap: wrap;
	flex-shrink: 1;
	flex-grow: 0;
}
card-series.solo {
	justify-content: space-evenly;
}
card-series > * {
	margin-right: 1em;
	margin-bottom: 1em;
}
recent-comments {
	min-width: 20em;
	flex-grow: 1;
}
a.card {
	display: flex;
	flex-direction: column;
	color: var(--textcolor);
	background-color: var(--tintcolor);
	box-shadow: 0px 0px 2px 0px var(--textcolor);
	text-decoration: none;
	width: 220px;
	padding: 2px;
}
.card-title {
	text-align: center;
}
a.card > img {
	display: block;
	margin: 2px;
	margin-left: auto;
	margin-right: auto;
	width: 220px;
}
.card-text {
	flex-grow: 1;
	text-align: center;
}
</style>
<p>
I'm a programmer, writer, and philosopher of all things. I post all kinds of stuff here.
</p>
<div class="indexlayout">
<card-series>
<a class="card" href="prismata/">
	<div class="card-title"><b>Prismata</b></div>
	<img src="category_images/prismata.jpg" alt="Prismata">
	<div class="card-text">I used to play this game devoutly, and wrote a lot of beginner guides and stuff for it.</div>
</a>
<a class="card" href="spem/">
	<div class="card-title"><b>Spem</b></div>
	<img src="category_images/spem.png" alt="Spem">
	<div class="card-text">The philosopher's conlang. Join me, and together we will rule our own minds.</div>
</a>
<a class="card" href="software/">
	<div class="card-title"><b>Software</b></div>
	<img src="category_images/code.png" alt="Software">
	<div class="card-text">As my primary skill set, I naturally love to talk about software.</div>
</a>
<a class="card" href="protagonism/">
	<div class="card-title"><b>Protagonism</b></div>
	<img src="category_images/protagonism.jpg" alt="Protagonism">
	<div class="card-text">Does it count as a religion if it's all a priori? 🤔</div>
</a>
<a class="card" href="argument/">
	<div class="card-title"><b>Argument</b></div>
	<img src="category_images/argument.jpg" alt="Argument">
	<div class="card-text">Wherein I talk about conversational tricks and the role of psychology in arguments, and debunk random bad ideas.</div>
</a>
<a class="card" href="music/">
	<div class="card-title"><b>Music</b></div>
	<img src="category_images/music.jpg" alt="Music">
	<div class="card-text">I'm a musician... sort of...</div>
</a>
<a class="card" href="game_design/">
	<div class="card-title"><b>Game Design</b></div>
	<img src="category_images/go.png" alt="Game Design">
	<div class="card-text">Many people think that different people enjoy different things and so all judgements of games are nothing more than personal preferences, but I don't subscribe to that nihilism.</div>
</a>
<a class="card" href="fiction/">
	<div class="card-title"><b>Storytelling</b></div>
	<img src="category_images/writing.jpg" alt="Storytelling">
	<div class="card-text">What <i>makes</i> a good story? I'm not quite sure myself, but I have plenty of ideas.</div>
</a>
<a class="card" href="reviews/">
	<div class="card-title"><b>Reviews</b></div>
	<img src="category_images/reviews.jpg" alt="Reviews">
	<div class="card-text">I enjoy enumerating all the flaws in other people's stories and games, and occasionally gushing over good ones.</div>
</a>
<a class="card" href="works/">
	<div class="card-title"><b>My Works</b></div>
	<img src="category_images/reading.jpg" alt="My Works">
	<div class="card-text">Novels, DDLC mods, poems</div>
</a>
<a class="card" href="misc/">
	<div class="card-title"><b>Miscellany</b></div>
	<img src="category_images/logo.svg" alt="Miscellany">
	<div class="card-text">Personal ramblings, stories, and secure contact info.</div>
</a>
</card-series>
<recent-comments></recent-comments>
</div>

---

This site wouldn't be what it is without my dedicated contributor main_gi. He's been my de-facto editor for a long time, has helped me with CSS troubles, found two vulnerabilities in my comment feature, and even contributed valuable insight that got me to change some beliefs. His page is [here](https://igniam.xyz).

The above photos, where they're not mine, are from: [unknown pxhere user](https://pxhere.com/en/photo/986424), [Aaron Burden](https://negativespace.co/pen-notebook-notepad-paper-writing/), [sthenostudio](https://pixabay.com/illustrations/ratings-stars-quality-best-ranking-1482011/), and [César A. Mazillo Jr](https://unsplash.com/photos/tN9h1vuAp6Y).

I also have a presence on [Twitter](https://twitter.com/Yujiri3), [dev.to](https://dev.to/yujiri8), [Youtube](https://www.youtube.com/channel/UCmTi4rq5oOp2S9UER0BH3sQ) (on Youtube I currently only post [DDLC](reviews/ddlc)-related content), and [minds.com](https://minds.com/yujiri) (passively trying out, might start posting more in the future).

---

Recent update log:

<expand-note open openText="collapse" closedText="show">

**July 7:**
Added [Breadth-first versus depth-first autocompletion](software/tab_completion).

**July 5:**
Added [Dialog practice: best and worst lines in Star Wars](fiction/dialog_star_wars).

**July 3:**
Added [FreeBSD source code is bullshit](software/unix_src).

**June 30:**
I posted [part 8 of The Concise Python Tutorial](software/pythontut8).

**June 29:**
My old article "The inherent logical problem with identity politics" has been superseded by [Protagonist versus leftist ideas of bigotry](protagonism/bigotry).

**June 28:**
Removed the Counterplay Infinity page and stopped hosting the game. I didn't want to keep it running anymore - it was a potential security risk - and its link card was taking up space. Really the only reason I was still hosting it was because I started hosting it before I got disillusioned.

**June 27:**
Added [Interpreted languages versus compiled languages](software/interpret_vs_compile), revised my language reviews with my more explicit, consistent standards, and finally [reviewed Haskell](software/haskell).

**June 26:**
Added [The GOLD Spec](software/gold) and [My baseline for language reviews](software/lang_baseline).

**June 24:**
Deleted a couple of obsolete articles, several minor edits, and added [In defense of communism](argument/communism).

**June 23:**
Several changes:

* Login panel is now in the comment section, so the navbar is less cramped on mobile.

* Timestamp is just outside of the comment section, so it renders without Javascript.

* Most importantly, the navbar is no longer a web component and the nav HTML is computed on the server, so you can still have navigation without Javascript.

* The make/recover account button no longer appears while logged in.

**June 20:**
I cleared old history, fixed [the comment box bug](https://github.com/yujiri8/yujiri.xyz/issues/21) and made it so the email entry box doesn't appear if you're logged in. I thought it was confusing as to how it works (since it's your autosub setting that determines whether you subscribe to it) and raised questions about scenarios like being logged in and commenting with the email field empty or filled with something else.

**June 16:**
It's been a while. Updated [Wikipedia's neutrality policy is a sham](argument/wikipedia_bias) to not object to the policy itself so much, and moved [An attempt to pin down the meaning of political 'left' and 'right'](argument/left_right) and [The common error behind leftist economics](argument/leftist_economics) to Argument.

**June 8:**
I improved the layout of the [Spem dictionary interface](spem/search) so it uses the horizontal space more on wide screens. Good God, I hate CSS. I spent a few hours and there's still a lot to be desired. The things I want are so simple, but CSS... the damn thing is a pile of inscrutable special cases instead of an elegant, organized way of describing layout like you'd expect from a language dedicated to that only.

**June 7:**
Added a link on the Argument index to [the article that converted me to base 6](https://www.xanthir.com/b4y30).

**June 6:**
Changed the tags of a lot of Spem words, and added several new ones, including <spem>rɪl</spem>, <spem>hoi</spem>, <spem>teu</spem>, <spem>dim</spem>, and <spem>ði</spem>; and removed <spem>pel</spem>.

**June 3:**
I wrote [What's a Protagonist?](protagonism/protagonism) and got back to Spem a little bit, revising possession verbs (again) so that there's a better way to express giving.

</expand-note>
