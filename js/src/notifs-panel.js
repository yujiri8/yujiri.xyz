import {LitElement, html, css} from 'lit-element';

import * as util from './util.js';
import {styles} from './css.js';

customElements.define('notifs-panel', class extends LitElement {
	static get properties() {
		return {
			email: {type: String, attribute: false},
			user: {type: String, attribute: false},
			subs: {type: Array, attribute: false},
			autosub: {type: Boolean, attribute: false},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host { display: block; }
		fieldset {
		    border: 1px solid var(--weakcolor);
		    border-radius: 4px;
		}
		`];
	}
	constructor() {
		super();
		this.email = util.readCookie('email');
		this.name = util.readCookie('name');
		this.key = util.readCookie('key');
		this.subs = [];
		if (!util.readCookie('auth')) {
			this.setAttribute('hidden', 'true');
			return window.addEventListener('load', async () => {
				await util.login();
				window.location.reload();
			});
		}
		this.fetchData();
	}
	render() {
		return html`
		<fieldset>
			<p>
			It's not strictly necessary to set a password since the cookie is stored
			in your browser now, but if you clear the cookie, it'll be more convenient to have
			a password to get a new one so you don't have to go through email confirmation again.
			</p>
			<label for="pw">password:</label>
			<input type="text" id="pw">
			<button @click="${this.setPw}">submit</button>
		</fieldset>
		${this.key ? html`
			<br>
			<fieldset>
				<p>
				Now that you've set a key, you can claim your name, preventing others from
				commenting as it.
				</p>
				<label for="name">name:</label>
				<input type="text" id="name" placeholder="${this.name}">
				<button @click="${this.setName}">submit</button>
			</fieldset>
		`:''}
		<br>
		<fieldset>
			<p>
			You can upload a PGP public key. If you do, reset emails will be encrypted,
			you'll be able to exclude others from commenting as your name, and you'll
			be able to edit your comments.
			</p>
			${this.key? html`<p>Your current key's fingerprint is ${this.key}.</p>` : ''}
			<input type="file" id="key" name="key">
			<button @click="${this.setKey}">submit</button>
		</fieldset>
		<p>
		Normally, you get notifications for replies to any comment you're subscribed
		to or are subscribed to a parent of. Setting a comment to "ignore" will prevent
		you receiving notifications even if you're subscribed to a parent of it.
		Basically, it travels up the tree and obeys the first subscription or ignore it finds.
		</p>
		<input id="autosub" type="checkbox" ?checked="${this.autosub}" @change="${this.setAutosub}"></input>
		<label for="autosub">Automatically subscribe to your own comments</label>
		<h2>Subscriptions</h2>
		<table>
			<thead><tr>
			<td>Comment</td>
			<td>Actions</td>
			</tr></thead>
			<tbody id="subs">
				${this.subs.filter(s => s.sub).map(s => html`
				<tr>
					<td>${util.summarizeComment(s.comment)}</td>
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
					<td>${util.summarizeComment(s.comment)}</td>
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
		const resp = await util.api('GET', 'notifs');
		try {
			const data = await resp.json();
			this.subs = data.subs;
			this.autosub = data.autosub;
		} catch {
			util.showToast('err', "Couldn't understand response from server");
		}
	}
	async setPw() {
		const pwBox = this.shadowRoot.getElementById('pw');
		await util.api('POST', 'setpw', undefined, pwBox.value);
		util.showToast('success', "Password set.");
		pwBox.value = '';
	}
	async setName() {
		const nameBox = this.shadowRoot.getElementById('name');
		await util.api('POST', 'setname', undefined, nameBox.value);
		util.showToast('success', "Name set.");
		nameBox.placeholder = nameBox.value;
		nameBox.value = '';
	}
	async setKey() {
		const keyFile = this.shadowRoot.getElementById('key').files[0];
		const formData = new FormData();
		formData.append("key", keyFile);
		await util.api('POST', 'setpubkey', undefined, formData);
		window.location.reload();
	}
	async setAutosub(e) {
		await util.api('POST', 'setautosub', undefined, e.target.checked);
		util.showToast('success', "Setting saved");
	}
	async editSub(id, state) {
		await util.api('PUT', 'notifs', undefined, {id: id, state: state});
		this.fetchData();
	}
});
