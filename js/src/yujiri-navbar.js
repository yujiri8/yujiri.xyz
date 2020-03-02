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
			display: block;
			position: sticky;
			top: 0;
			width: 100%;
			background-color: grey;
			color: white;
			text-align: center;
			padding: 0.3em;
		}
		/* Below the timestamp: nav links and theme toggle */
		.bottom {
		        display: grid;
		        grid-template-columns: 1fr 4fr 1fr;
		        align-items: center;
		}
		.path {
			font-size: 1.3em;
		}
		a, a:visited {
			color: yellow;
		}
		.theme-switch-area {
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
		`];
	}
	constructor() {
		super();
		this.user = readCookie('email');
		this.loggedIn = readCookie('auth');
	}
	render() {
		return html`
		${this.timestamp? html`
			<small>This page was last edited ${this.timestamp} (UTC)</small>
		` : ''}
		<div class="bottom">
			<div>
				${this.user && this.loggedIn? html`
					Logged in as ${this.user}<br>
					<a href="/notifs">notification settings</a>
				`: html`
					<button @click="${this.login}">Login</button>
				`}
			</div>
			<nav class="path">${unsafeHTML(this.computePath())}</nav>
			<div class="theme-switch-area">
				<label for="theme-switch">Dark mode</label>
				<mwc-switch id="theme-switch" @change="${this.toggleTheme}"></mwc-switch>
			</div>
		</div>
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
		// Get an aray of the category components. Trim *.html and then /(index).
		let parts = window.location.pathname.replace(/\.html$/, '').replace(/\/(index)?$/, '').split('/');
		parts = parts.slice(1); // Don't count the inevitable empty first component.
		// Root page is a special case.
		if (parts.length == 0) return "Yujiri's homepage";
		// A few that can't be programmatically converted.
		const exceptionMap = {
			fiction: 'Storytelling',
			mc_revenge: "MC's Revenge",
			ddlc_mods: 'DDLC Mods',
		};
		let total = '<a href="/">yujiri.xyz</a> &gt; ';
		let path = '/';
		// Now loop over intermediary parts.
		for (let i = 0; i < parts.length - 1; i++) {
			const part = parts[i];
			if (part == 'poems') continue; // Poems don't have their own index.
			// Determine the display name of this part.
			const partName = exceptionMap[part] || titleCase(part.replace(/_/g, ' '));
			// Exception for DDLC mods.
			if (part == 'ddlc_mods') {
				total += `<a href="${path}ddlc">${partName}</a> &gt; `;
				path += part + '/';
				continue;
			}
			// Add the link.
			path += part + '/';
			total += `<a href="${path}">${partName}</a> &gt; `;
		}
		// If it has a navtitle, use it.
		if (this.navtitle) return total + this.navtitle;
		// Otherwise, compute it.
		const name = parts[parts.length - 1];
		return total + (exceptionMap[name] || titleCase(name.replace(/_/g, ' ')));
	}
	async login() {
		await login();
		window.location.reload();
	}
});
