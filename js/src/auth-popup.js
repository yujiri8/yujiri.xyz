import {LitElement, html, css} from 'lit-element';
import '@material/mwc-dialog';

import {readCookie, setCookie, api} from './util.js';
import {styles} from './css.js';

customElements.define('auth-popup', class extends LitElement {
	static get properties() {
		return {
			open: {type: Boolean, attribute: false},
			user: {type: String, attribute: false},
			failedOnce: {type: Boolean, attribute: false},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host {	display: block; }
		input { /* The popup looks better as black-on-white even in dark mode. */
			color: initial;
			background-color: initial;
		}
		`];
	}
	render() {
		return html`
		<mwc-dialog ?open="${this.open}" @closed="${e => this.handleClose(e)}">
			<p class="bad">${this.failedOnce? 'Invalid credentials.' : ''}</p>
			<label for="email">Email:</label>
			<input type="text" id="email">
			<br>
			<label for="pw">Password:</label>
			<input type="password" id="pw">
			<br>
			<button slot="primaryAction" dialogAction="submit">Submit</button>
			<button slot="secondaryAction" dialogAction="cancel">Cancel</button>
		</mwc-dialog>
		`;
	}
	async run() {
		// Reset stuff incase there was a canceled attempt before.
		this.user = readCookie('email');
		this.shadowRoot.getElementById('email').value = this.user;
		this.shadowRoot.getElementById('pw').value = '';
		this.failedOnce = false;
		// Retry until they succeed or cancel (which throws an exception).
		while (true) {
			this.open = true;
			const resp = await this.runOnce();
			if (resp.ok) {
				return resp;
			}
			this.failedOnce = true;
		}
	}
	async runOnce() {
		// A hack that escapes the promise callback from the promise, so we can await properly.
		const creds = await new Promise(resolve => {this.resolve = resolve});
		if (creds.cancel) throw undefined;
		const resp = await api('POST', 'login', undefined, creds);
		return resp;
	}
	handleClose(e) {
		const email = this.shadowRoot.getElementById('email').value;
		// Set the email cookie if they didn't cancel.
		if (e.detail.action == 'submit') setCookie('email', email);
		this.open = false;
		this.resolve({
			cancel: e.detail.action != 'submit',
			email: email,
			pw: this.shadowRoot.getElementById('pw').value,
		});
	}
});
