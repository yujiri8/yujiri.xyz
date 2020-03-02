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
		.outline {
		    border: 1px solid var(--weakcolor);
		    border-radius: 4px;
		}
		`];
	}
	constructor() {
		super();
		this.user = readCookie('email');
		this.hasKey = readCookie('haskey');
		this.subs = [];
		if (!readCookie('auth')) {
			this.setAttribute('hidden', 'true');
			return window.addEventListener('load', login);
		}
		this.fetchData();
	}
	render() {
		return html`
		<div class="outline">
			<p>
			It's not strictly necessary to set a password since the cookie is stored
			in your browser now, but if you clear the cookie, it'll be more convenient to have
			a password to get a new one so you don't have to go through email confirmation again.
			</p>
			<label for="pw">password:</label>
			<input type="text" id="pw"></input>
			<button @click="${this.setPw}">submit</button>
		</div>
		${this.hasKey ? html`
			<br>
			<div class="outline">
				<p>
				Now that you've set a key, you can claim your name, preventing others from
				commenting as it.
				</p>
				<label for="name">name:</label>
				<input type="text" id="name"></input>
				<button @click="${this.setName}">submit</button>
			</div>
		`:''}
		<br>
		<div class="outline">
			<p>
			You can upload a PGP public key. If you do, reset emails will be encrypted,
			you'll be able to excluding others from comments as your name, and you'll
			be able to edit your comments.
			</p>
			<input type="file" id="key" name="key"></input>
			<button @click="${this.setKey}">submit</button>
		</div>
		<p>
		Normally, you get notifications for replies to any comment you're subscribed
		to or are subscribed to a parent of. Setting a comment to "ignore" will prevent
		you receiving notifications even if you're subscribed to a parent of it.
		Basically, it travels up the tree and obeys the first subscription or ignore it finds.
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
	async setName() {
		const nameBox = this.shadowRoot.getElementById('name');
		await api('POST', 'setname', undefined, nameBox.value);
		showToast('success', "Name set.");
		nameBox.value = '';
	}
	async setKey() {
		const keyFile = this.shadowRoot.getElementById('key').files[0];
		const formData = new FormData();
		formData.append("key", keyFile);
		// TODO this should use the main api handler somehow.
		await fetch('/api/setpubkey', {method:"POST", body: formData});
		window.location.reload();
	}
	async editSub(id, state) {
		await api('POST', 'notifs/edit', undefined, {id: id, state: state});
		this.fetchData();
	}
});
