import {LitElement, html, css, unsafeCSS} from 'lit-element';

import {styles} from './css.js';

customElements.define('expand-note', class extends LitElement {
	static get properties() {
		return {
			// I wonder if we can compute whether it needs to go up a
			// level based on whether we're at an index page.
			closedText: {type: String},
			openText: {type: String},
			open: {type: Boolean},
			block: {type: Boolean},
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
		<slot ?hidden="${!this.open}" class="${!this.block? 'small' : ''}"></slot>
		`;
	}
	toggle() {
		this.open = !this.open;
		if (!this.contentId) return; // The simple case.
		document.getElementById(this.contentId).style.display = this.open? 'block' : 'none';
	}
});
