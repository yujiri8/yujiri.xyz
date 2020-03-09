import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

import {readCookie, api, showToast} from './util.js';
import {styles} from './css.js';

customElements.define('a-comment', class extends LitElement {
	static get properties() {
		return {
			comment: {type: Object},
			loggedIn: {type: Boolean},
			hasKey: {type: Boolean},
			admin: {type: Boolean},
			user: {type: String},
			replyOpen: {type: Boolean},
			editMode: {type: Boolean},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host { display: block; }
		.comment {
			border: 1px solid var(--weakcolor);
			border-radius: 6px;
			margin-top: 0.5em;
			margin-bottom: 0.5em;
			box-shadow: 0px 0px 4px 0px var(--weakcolor);
		}
		.header {
			padding: 0.5em;
			overflow-x: auto;
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
		.meta {
			display: flex;
			flex-direction: column;
			justify-content: left;
		}
		.body {
			padding: 0.5em;
			overflow-x: auto;
		}
		hr {
			margin-top: 0;
			margin-bottom: 0;
		}
		comment-submit-area {
			margin-left: 1em;
		}
		`];
	}
	constructor() {
		super();
		this.loggedIn = readCookie('auth');
		this.hasKey = readCookie('haskey');
		this.admin = readCookie('admin');
		this.user = readCookie('email');
	}
	render() {
		return html`
		<div class="comment">
			<div class="header">${this.renderHeader()}</div>
			<hr>
			${this.editMode? html`
				<textarea id="body">${this.comment.body}</textarea>
			`:html`
				<div class="body" id="body">${unsafeHTML(this.comment.body)}</div>
			`}
			<hr>
			<button @click="${() => this.replyOpen = true}">Reply</button>
			<a href="${window.location.origin + window.location.pathname +
				`?c=${this.comment.id}`}#comment-section">
				view subtree
			</a>
		</div>
		${this.replyOpen? html`
			<comment-submit-area reply_to="${this.comment.id}" user="${this.user}">
			</comment-submit-area>
		`:''}
		`;
	}
	renderHeader() {
		return html`
		<div class="meta">
			${this.editMode? html`
				<input id="name" value="${this.comment.name}">
			`:html`
				<b id="name"
					style="${this.comment.name === 'Yujiri'? 'color:var(--yellowcolor)' : ''}">
					${this.comment.name}</b>
			`}
			<small>${this.comment.time_posted}
				${this.comment.time_changed? html`
					- <span style="color:orange">edited ${this.comment.time_changed}</span>
				`:''}
			</small>
		</div>
		${this.loggedIn && this.user? html`
			<div class="actions">${this.renderActions()}</div>
		`:''}
		`;
	}
	renderActions() {
		return html`
		${this.comment.sub == null? html`
			<button @click="${() => this.setNotifs(true)}">Subscribe</button>
			<button @click="${() => this.setNotifs(false)}">Ignore</button>
		`:''}
		${this.comment.sub == true? html`
			<button @click="${() => this.setNotifs(null)}">Unsubscribe</button>
			<button @click="${() => this.setNotifs(false)}">Ignore</button>
		`:''}
		${this.comment.sub == false? html`
			<button @click="${() => this.setNotifs(true)}">Subscribe</button>
			<button @click="${() => this.setNotifs(null)}">Unignore</button>
		`:''}
		${this.admin || this.hasKey && this.comment.owned? html`
			${this.editMode? html`
				<button @click="${this.finishEdit}">Save</button>
			`:html`
				<button @click="${this.edit}">Edit</button>
			`}
		`:''}
		${this.admin? html`
			<button @click="${() => api('DELETE', 'comments', undefined, this.comment.id)}">Delete</button>
		`:''}
		`;
	}
	async setNotifs(state) {
		await api('POST', 'notifs/edit', undefined, {id: this.comment.id, state: state});
		this.comment.sub = state;
		this.requestUpdate();
	}
	async edit() {
		const resp = await api('GET', 'comments', {id: this.comment.id, raw: true});
		try {
			var comment = await resp.json();
		} catch (err) {
			showToast('err', "Couldn't understand response from server");
			throw err;
		}
		this.comment.body = comment.body;
		this.editMode = true;
	}
	async finishEdit() {
		await api('PUT', 'comments', undefined, {
			id: this.comment.id,
			name: this.shadowRoot.getElementById('name').value,
			body: this.shadowRoot.getElementById('body').value,
		});
		this.editMode = false;
		// Re-fetch it.
		const resp = await api('GET', 'comments', {id: this.comment.id});
		try {
			var comment = await resp.json();
		} catch (err) {
			showToast('err', "when re-fetching comment: couldn't understand response from server");
			throw err;
		}
		this.comment = comment;
	}
});
