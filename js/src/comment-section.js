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
			timestamp: {type: String},
			comments: {type: Array},
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
		this.comments = [];
		this.loadComments();
		this.addEventListener('comment-posted', this.loadComments);
	}
	render() {
		return html`
		<h1>Comments</h1>
		<p>
		You don't need an account or anything to post. Accounts are only for email notifications on replies.
		Markdown formatting (<a href="https://github.com/lepture/mistune">this library</a>) is supported.
		I also support the &lt;spem&gt; tag which makes text monospace like &lt;code&gt; but without
		changing the background color. I use that tag for formatting <a href="/spem/">spem</a> text.
		</p><p>
		This article was last modified ${strftime('%Y %b %d, %A, %R (UTC)', new Date(this.timestamp))}.
		Comments made before then have orange timestamps.
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
		    ${this.comments.map(c => html`<a-comment .comment="${c}"></a-comment>`)}
		</div>
		`;
	}
	async loadComments() {
		const subtree = parseQuery(window.location.search).c;
		const resp = await api('GET', 'comments', subtree?
			{id: subtree}
			: {reply_to: window.location.pathname}
		);
		try {
			const data = await resp.json();
			this.comments = data instanceof Array? data : [data];
		} catch (err) {
			showToast('err', "Couldn't understand response from server");
			throw err;
		}
	}
	getComment(id) {
		return this.shadowRoot.getElementById(id);
	}
	async signup() {
		const email = this.shadowRoot.getElementById('email').value;
		setCookie('email', email);
		await api('POST', 'users/claim', undefined, email);
		showToast('success', "Confirmation email sent.");
	}
});

