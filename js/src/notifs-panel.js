import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

import {readCookie, api, showToast, summarizeComment, login} from './util.js';
import {styles} from './css.js';

customElements.define('notifs-panel', class extends LitElement {
	static get properties() {
		return {
			user: {type: String},
			subs: {type: Array, attribute: false},
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
		this.user = readCookie('email');
		this.subs = [];
		if (!readCookie('auth')) {
			this.setAttribute('hidden', 'true');
			return window.addEventListener('load', login);
		}
		this.fetchData();
	}
	render() {
		return html`
		<p>
		If you want, you can set a password. You don't need one since the cookie is stored
		in your browser now, but if you clear the cookie, it might be more convenient to have
		a password to get a new one so you don't have to go through email confirmation again.
		</p>
		<label for="pw">password:</label>
		<input type="text" id="pw"></input>
		<button @click="${this.setPw}">submit</button>
		<p>
		Setting a comment to "ignore" will prevent you receiving notifications even
		if you're subscribed to a parent of it.
		</p>
		<div>
		<h2>Subscriptions</h2>
		<table>
			<thead><tr>
			<td>Comment</td>
			<td>Actions</td>
			</tr></thead>
			<tbody id="subs">
				${this.subs.filter(s => s.sub).map(s => html`
				<tr>
					<td>${summarizeComment(s.comment)}</td>
					<td>
					<button @click="${() => this.editSub(s.comment.id, null)}">clear</button>
					<button @click="${() => this.editSub(s.comment.id, false)}">ignore</button>
					</td>
				</tr>
				`)}
			</tbody>
		</table>
		<h2>Ignores</h2>
		<table>
			<thead><tr>
			<td>Comment</td>
			<td>Actions</td>
			</tr></thead>
			<tbody id="ignores">
				${this.subs.filter(s => !s.sub).map(s => html`
				<tr>
					<td>${summarizeComment(s.comment)}</td>
					<td>
					<button @click="${() => this.editSub(s.comment.id, null)}">clear</button>
					<button @click="${() => this.editSub(s.comment.id, true)}">subscribe</button>
					</td>
				</tr>
				`)}
			</tbody>
		</table>
		`;
	}
	async fetchData() {
		const resp = await api('GET', 'notifs/see');
		try {
			this.subs = (await resp.json()).subs; // The email field may be deprecated.
		} catch {
			showToast('err', "Couldn't understand response from server");
		}
	}
	async setPw() {
		const pwBox = this.shadowRoot.getElementById('pw');
		await api('POST', 'setpw', undefined, pwBox.value);
		showToast('success', "Password set.");
		pwBox.value = '';
	}
	async editSub(id, state) {
		await api('POST', 'notifs/edit', undefined, {id: id, state: state});
		this.fetchData();
	}
});
