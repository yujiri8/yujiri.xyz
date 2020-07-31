import {LitElement, html, css} from 'lit-element';

import './a-comment.js';
import './comment-submit-area.js';
import './login-pane.js';
import * as util from './util.js';
import {styles} from './css.js';

customElements.define('comment-section', class extends LitElement {
	static get properties() {
		return {
			loggedIn: {type: String, attribute: false},
			subscribed: {type: Boolean, attribute: false},
			admin: {type: Boolean, attribute: false},
			comments: {type: Array, attribute: false},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host { display: block; }
		`];
	}
	constructor() {
		super();
		this.loggedIn = util.readCookie('auth') && util.readCookie('email');
		this.admin = util.readCookie('admin');
		this.comments = [];
		this.loadComments();
		this.addEventListener('comment-posted', this.loadComments);
		if (this.loggedIn)
			util.api('GET', 'users/notifs', {path: location.pathname}).then(resp =>
				resp.json().then(d => this.subscribed = d));
	}
	render() {
		return html`
		<h1>Comments</h1>
		<p>
		You can post without an account; if you provide an email, an account will be created and a confirmation email
		sent. Accounts provide reply notifications, and, with a PGP key uploaded, the ability to edit your comments.
		</p><p>
		Markdown formatting (<a href="https://github.com/lepture/mistune">this library</a>) is supported.
		I also support the &lt;spem&gt; tag which makes text monospace like &lt;code&gt; but without
		changing the background color, meant for <a href="/spem/">spem</a> text.
		</p><p>
		Comments made before the page's modification timestamp have orange timestamps.
		</p>
		<login-pane></login-pane>
		<br>
		${this.loggedIn? html`
			<label for="sub-post">Be notified of new top-level comments on this page</label>
			<input id="sub-post" type="checkbox" ?checked="${this.subscribed}" @change="${this.toggleSubscribe}">
		`:''}
		<comment-submit-area open ?logged-in="${this.loggedIn}" reply-to="${location.pathname}">
		</comment-submit-area>
		${util.parseQuery(location.search).c? html`
			You're viewing a subtree of the comments.
			${this.comments[0] && this.comments[0].reply_to? html`
				<a href="${location.origin + location.pathname}?c=${
					this.comments[0].reply_to}#comment-section">view parent</a> or
			`:''}
			<a href="${location.origin + location.pathname}#comment-section">
				view all comments on this page</a>
		`:''}
		<div id="comments">
			${this.comments.map(c => html`<a-comment .comment="${c}"></a-comment>`)}
		</div>
		`;
	}
	async loadComments() {
		const subtree = util.parseQuery(location.search).c;
		const resp = await util.api('GET', 'comments', subtree?
			{id: subtree} : {reply_to: location.pathname}
		);
		try {
			const data = await resp.json();
			this.comments = data instanceof Array? data : [data];
		} catch (err) {
			util.showToast('err', "Couldn't understand response from server");
			throw err;
		}
	}
	async toggleSubscribe(e) {
		await util.api('PUT', 'users/notifs', undefined, {path: location.pathname, state: e.target.checked});
		util.showToast('success', "Setting saved");
	}
});

