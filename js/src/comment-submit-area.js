import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

import * as util from './util.js';
import {styles} from './css.js';

customElements.define('comment-submit-area', class extends LitElement {
	static get properties() {
		return {
			reply_to: {type: String},
			user: {type: String},
			previewHTML: {type: String, attribute: false},
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
		#preview {
			border: 1px solid var(--weakcolor);
			padding: 2px;
		}
		`];
	}
	constructor() {
		super();
		this.savedContents = '';
	}
	render() {
		return html`
		<button @click="${this.submit}">Submit</button>
		${this.previewHTML? html`
			<button @click="${this.unpreview}">Edit</button>
		`:html`
			<button @click="${this.preview}">Preview</button>
		`}
		<br>
		<label for="name">Name:</label>
		<input id="name">
		<br>
		<label for="email">Email (optional):</label>
		<input id="email" value="${this.user}">
		<br>
		${this.previewHTML? html`
			<div id="preview">${unsafeHTML(this.previewHTML)}</div>
		`:html`
			<textarea id="body" placeholder="Your comment...">${this.savedContents}</textarea>
		`}
		`;
	}
	async submit() {
		if (this.previewHTML) await this.unpreview();
		const nameElem = this.shadowRoot.getElementById('name');
		const emailElem = this.shadowRoot.getElementById('email');
		const bodyElem = this.shadowRoot.getElementById('body');
		// Set the email cookie before sending the request, so it will be filled in if login is required.
		util.setCookie('email', emailElem.value);
		await util.api('POST', 'comments', {
			name: nameElem.value,
			email: emailElem.value,
			reply_to: this.reply_to || window.location.pathname,
		}, bodyElem.value);
		// Dispatch the event to load the comment in.
		this.dispatchEvent(new CustomEvent('comment-posted',
			{bubbles: true, composed: true, detail: this.reply_to}))
		// Show a toast if it was a new poster making an account.
		// Note this doesn't work if the user is logged in but posts as a different email address.
		// I'm not sure if that will stay a thing.
		if (emailElem.value && !this.user)
			util.showToast('success', "You'll receive a confirmation email about your account creation.");
		// Close the submit area if it's not the top-level one.
		if (!this.reply_to.includes('/'))
			this.remove();
		// Otherwise, just clear the fields.
		else nameElem.value = emailElem.value = bodyElem.value = '';
	}
	async preview() {
		this.savedContents = this.shadowRoot.getElementById('body').value;
		const resp = await util.api('POST', 'comments/preview', undefined, this.savedContents);
		try {
			this.previewHTML = await resp.text();
		} catch (err) {
			return util.showToast('err', "Couldn't read response from server");
		}
	}
	async unpreview() {
		this.previewHTML = '';
		await this.updateComplete;
	}
});
