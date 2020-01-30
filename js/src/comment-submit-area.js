import {LitElement, html, css} from 'lit-element';

import {readCookie, setCookie, api} from './util.js';
import {styles} from './css.js';

customElements.define('comment-submit-area', class extends LitElement {
	static get properties() {
		return {
			reply_to: {type: String},
			user: {type: String},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host {	display: block; }
		.meta {
			float: left;
		}
		.actions {
			float: right;
		}
		hr {
			margin-top: 0;
			margin-bottom: 0;
		}
		`];
	}
	render() {
		return html`
		<button @click="${this.submit}">Submit</button>
		<br>
		<label for="name">Name:</label>
		<input id="name">
		<br>
		<label for="email">Email (optional):</label>
		<input id="email" value="${this.user}">
		<br>
		<textarea id="body" placeholder="Your comment..."></textarea>
		`;
	}
	async submit() {
		const nameElem = this.shadowRoot.getElementById('name');
		const emailElem = this.shadowRoot.getElementById('email');
		const bodyElem = this.shadowRoot.getElementById('body');
		// Set the email cookie before sending the request, so it will be filled in if login is required.
		setCookie('email', emailElem.value);
		const req = await api('POST', 'comments', {
			name: nameElem.value,
			email: emailElem.value,
			reply_to: this.reply_to || window.location.pathname,
		}, bodyElem.value);
		// Dispatch the event to load the comment in.
		this.dispatchEvent(new CustomEvent('comment-posted',
			{bubbles: true, composed: true, detail: this.reply_to}))
		// Close the submit area if it's not the top-level one.
		if (!this.reply_to.includes('/')) {
			this.remove();
		// Otherwise, just clear the fields.
		} else {
			nameElem.value = emailElem.value = bodyElem.value = '';
		}
		// TODO eventually this should handle showing the comment as subscribed if you authed it.
	}
});
