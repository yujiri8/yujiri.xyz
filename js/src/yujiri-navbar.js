import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';
import '@material/mwc-switch';

import {styles} from './css.js';
import {readCookie, titleCase, login} from './util.js';

customElements.define('yujiri-navbar', class extends LitElement {
	static get properties() {
		return {
			navtitle: {type: String},
			timestamp: {type: String},
			user: {type: String, attribute: false},
			loggedIn: {type: Boolean},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host {
			display: flex;
			flex-direction: column;
			position: sticky;
			top: 0;
			width: 100%;
			background-color: grey;
			color: white;
			text-align: center;
			padding: 0.3em;
		}
		.top {
		        display: flex;
		        /*grid-template-columns: 1fr minmax(auto, 2fr) 1fr;*/
		        justify-content: space-evenly;
		}
		nav {
			font-size: 1.3em;
		}
		a, a:visited {
			color: yellow;
		}
		.flex-vertical {
			display: flex;
			flex-direction: column;
		}
		label {
			margin-top: 0.2em;
			margin-bottom: 0.4em;
		}
		mwc-switch {
			--mdc-theme-secondary: #0f0;
		}
		.center {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		`];
	}
	constructor() {
		super();
		this.user = readCookie('email');
		this.loggedIn = readCookie('auth');
	}
	render() {
		return html`
		<div class="top">
			<div class="center">
				${this.user && this.loggedIn? html`
					<small>
					Logged in as ${this.user}<br>
					<a href="/notifs">notification settings</a> /
					<a href @click="${this.logout}">logout</a>
					</small>
				`: html`
					<button @click="${this.login}">Login</button>
				`}
			</div>
			<div class="center">
				<label for="theme-switch"><small>Dark mode</small></label>
				<mwc-switch id="theme-switch" @change="${this.toggleTheme}"></mwc-switch>
			</div>
		</div>
		<nav>${unsafeHTML(this.computePath())}</nav>
		`;
	}
	toggleTheme() {
		const switchElem = this.shadowRoot.getElementById('theme-switch');
		if (switchElem.checked) {
			document.documentElement.setAttribute('data-theme', 'dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
			localStorage.setItem('theme', 'light');
		}
	}
	firstUpdated() {
		super.firstUpdated();
		// apply saved theme
		const currentTheme = localStorage.getItem('theme');
		if (currentTheme) {
			document.documentElement.setAttribute('data-theme', currentTheme);
			if (currentTheme === 'dark')
				this.shadowRoot.getElementById('theme-switch').checked = true;
		}
	}
	computePath() {
		// Get an aray of the category components. Trim /(index).
		let parts = window.location.pathname.replace(/\/(index)?$/, '').split('/');
		parts = parts.slice(1); // Don't count the inevitable empty first component.
		// Root page is a special case.
		if (parts.length == 0) return "Yujiri's homepage";
		// A few that can't be programmatically converted.
		const exceptionMap = {
			fiction: 'Storytelling',
			mc_revenge: "MC's Revenge",
			ddlc_mods: 'DDLC Mods',
		};
		let navHTML = '<a href="/">yujiri.xyz</a> &gt; ';
		let runningPath = '/';
		// Now loop over intermediary parts.
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (part == 'poems') continue; // Poems don't have their own index.
			// Determine the display name of this part.
			const partName = exceptionMap[part] || titleCase(part.replace(/_/g, ' '));
			// Exception for DDLC mods.
			if (part == 'ddlc_mods') {
				navHTML += `<a href="${runningPath}ddlc">${partName}</a> &gt; `;
				runningPath += part + '/';
				continue;
			}
			// Add the link.
			runningPath += part + '/';
			navHTML += `<a href="${runningPath}">${partName}</a> &gt; `;
		}
		// If it has a navtitle, use it.
		if (this.navtitle) return navHTML + this.navtitle;
		// Otherwise, compute it.
		const name = parts[parts.length - 1];
		return navHTML + (exceptionMap[name] || titleCase(name.replace(/_/g, ' ')));
	}
	async login() {
		await login();
		window.location.reload();
	}
	logout() {
		document.cookie = 'auth=; path=/; max-age=0';
		document.cookie = 'email=; path=/; max-age=0';
		document.cookie = 'admin=; path=/; max-age=0';
		document.cookie = 'key=; path=/; max-age=0';
	}
});
