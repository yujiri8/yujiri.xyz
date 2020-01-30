import {LitElement, html, css} from 'lit-element';

import './a-comment.js';
import './comment-submit-area.js';
import {readCookie, setCookie, api, showToast, parseQuery} from './util.js';
import {styles} from './css.js';

customElements.define('comment-section', class extends LitElement {
	static get properties() {
		return {
			user: {type: String},
			admin: {type: Boolean},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host {
			margin: var(--outer-margins);
			display: block;
		}
		div#signup {
			margin-bottom: 2em;
		}
		`];
	}
	constructor() {
		super();
		this.user = readCookie('email');
		this.admin = readCookie('admin');
		this.addEventListener('comment-posted', e => this.loadComments(e.detail));
	}
	render() {
		return html`
		<h1>Comments</h1>
		<p>
		You don't need an account or anything to post. Accounts are only for email notifications on replies.
		Markdown formatting is supported.
		</p>
		<div id="signup">
			<label for="email">Email address:</label>
			<input type="email" id="email">
			<button @click="${this.signup}">Make account without posting / recover account</button>
		</div>
		<comment-submit-area open user="${this.user}"
			reply_to="${window.location.pathname}">
		</comment-submit-area>
		${parseQuery(window.location.search).c? html`
			You're viewing a subtree of the comments.
			<a href="${window.location.origin + window.location.pathname}#comment-section">
				view all comments on this page</a>
		`:''}
		<div id="comments">
		</div>
		`;
	}
	async firstUpdated() {
		super.firstUpdated();
		const subtree = parseQuery(window.location.search).c;
		// This is a janky solution, but we need to fetch the
		// specific comment first if we're looking at a subtree.
		if (subtree) {
			const req = await api('GET', 'comments', {id: subtree});
			try {
				var comment = await req.json();
			} catch (err) {
				showToast('err', "Couldn't understand response from server");
				throw err;
			}
			// pass '/' as reply_to even though it's false, because this needs to be treated as the root.
			this.insertComments([comment], '/');
		};
		// Now load everything under the subtree root, or all the comments.
		this.loadComments(subtree || window.location.pathname);
	}
	async loadComments(reply_to) {
		const req = await api('GET', 'comments', {reply_to: reply_to});
		try {
			var comments = await req.json();
		} catch (err) {
			showToast('err', "Couldn't understand response from server");
			throw err;
		}
		this.insertComments(comments, reply_to);
		// Recursively fetch replies to comments that have them.
		for (let comment of comments) {
			if (comment.has_replies) this.loadComments(comment.id);
		}
	}
	insertComments(comments, reply_to) {
		// Reverse them so more recent are last. Due to the way I insert them, they'd otherwise be in reverse.
		comments.reverse();
		// If these are not top-level comments, they need to be indented under their parent.
		// TODO ideally find a more declarative way of doing this.
		if (!reply_to.includes('/')) {
			const parent = this.getComment(reply_to);
			var addComment = c => {
				this.increaseIndent(c, parent);
				parent.insertAdjacentElement('afterEnd', c);
			};
		} else {
			const commentSection = this.shadowRoot.getElementById('comments');
			var addComment = c => commentSection.insertBefore(c, commentSection.firstChild);
		}
		for (let comment of comments) {
			if (this.getComment(comment.id)) continue;
			const commentElem = document.createElement('a-comment');
			commentElem.id = comment.id;
			commentElem.comment = comment;
			addComment(commentElem);
			window.c = commentElem;
		}
	}
	getComment(id) {
		return this.shadowRoot.getElementById(id);
	}
	async signup() {
		const email = this.shadowRoot.getElementById('email').value;
		setCookie('email', email);
		await api('POST', 'notifs/claim', undefined, email);
		showToast('success', "Confirmation email sent.");
	}
	// This function takes a child and parent element and indents the child under the parent element in-place.
	increaseIndent(child, parent) {
		// Shortcut.
		const parentStyle = getComputedStyle(parent);
		const parentIndent = parseInt(parentStyle['margin-left']) / parseInt(parentStyle['font-size']);
		child.style['margin-left'] = parentIndent + 1 + 'em';
	}
});

