import {LitElement, html, css} from 'lit-element';

import {styles} from './css.js';

customElements.define('image-card', class extends LitElement {
	static get properties() {
		return {
			title: {type: String},
			href: {type: String},
			image: {type: String},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host { display: inline-block; }
		a.card {
			display: block;
			color: var(--textcolor);
			background-color: var(--tintcolor);
			box-shadow: 0px 0px 2px 0px var(--textcolor);
			text-decoration: none;
			width: 220px;
			padding: 2px;
		}
		img {
			display: block;
			margin: 2px;
			margin-left: auto;
			margin-right: auto;
			width: 220px;
		}
		`];
	}
	render() {
		return html`
		<a class="card" href="${this.href}">
			<div style="text-align:center"><b>${this.title}</b></div>
			<img src="${this.image}" alt="${this.title}">
			<slot></slot>
		</a>
		`;
	}
});
