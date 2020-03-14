import {LitElement, html, css} from 'lit-element';

import {styles} from './css.js';

customElements.define('expand-note', class extends LitElement {
	static get properties() {
		return {
			closedText: {type: String},
			openText: {type: String},
			open: {type: Boolean},
			contentId: {type: String}, /* only used if the content can't be right next to the button. */
		}
	}
	static get styles() {
		return [styles, css`
		:host { display: inline; }
		button {
			cursor: pointer;
			display: inline;
		}
		`];
	}
	constructor() {
		super();
		this.closedText = '+';
		this.openText = '–';
	}
	render() {
		return html`
		<button @click="${this.toggle}">
			${this.open? this.openText : this.closedText}
		</button>
		<slot ?hidden="${!this.open}"></slot>
		`;
	}
	toggle() {
		this.open = !this.open;
		if (!this.contentId) return; // The simple case.
		document.getElementById(this.contentId).style.display = this.open? 'block' : 'none';
	}
});
