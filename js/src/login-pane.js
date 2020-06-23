import {LitElement, html, css} from 'lit-element';

import {styles} from './css.js';
import {readCookie, setCookie, login, api, showToast} from './util.js';

customElements.define('login-pane', class extends LitElement {
	static get properties() {
		return {
			user: {type: String, attribute: false},
			loggedIn: {type: Boolean, attribute: false},
			noSettingsLink: {type: Boolean, attribute: 'no-settings-link'},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host {
			display: block;
			margin-bottom: 1em;
			margin-top: 1em;
		}
		`];
	}
	constructor() {
		super();
		this.user = readCookie('email');
		this.loggedIn = readCookie('auth');
	}
	render() {
		return this.user && this.loggedIn ? html`
		Logged in as ${this.user}<br>
		${!this.noSettingsLink? html`
			<a class="yujiri-link" href="/notifs">notification settings</a>
			<br>
		`:''}
		<a class="yujiri-link" href @click="${this.logout}">logout</a>
		`: html`
		<button @click="${this.login}">Login</button>
		<br>
		<div id="signup">
			<label for="email">Email address:</label>
			<input type="email" id="email">
			<button @click="${this.signup}">Make account without posting / recover account</button>
		</div>
		`;
	}
	async login() {
		await login();
		location.reload();
	}
	logout() {
		document.cookie = 'auth=; path=/; max-age=0';
		document.cookie = 'email=; path=/; max-age=0';
		document.cookie = 'admin=; path=/; max-age=0';
		document.cookie = 'key=; path=/; max-age=0';
	}
	async signup() {
		const email = this.shadowRoot.getElementById('email').value;
		setCookie('email', email);
		await api('POST', 'users/claim', undefined, email);
		showToast('success', "Confirmation email sent.");
	}
});
