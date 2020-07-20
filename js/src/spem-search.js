import {LitElement, html, css} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

import './input-list.js';
import * as util from './util.js';
import {styles} from './css.js';

customElements.define('spem-search', class extends LitElement {
	static get properties() {
		return {
			admin: {type: Boolean},
			tags: {type: Array, attribute: false},
			words: {type: Array, attribute: false},
		}
	}
	static get styles() {
		return [styles, css`
		:host([hidden]) { display: none; }
		:host { display: block; }
		td, th {
			padding: 3px;
		}
		.tag {
			white-space: nowrap;
		}
		`];
	}
	constructor() {
		super();
		this.words = [];
		this.tags = [];
		this.admin = util.readCookie('admin');
	}
	render() {
		return html`
		<div style="display:flex; flex-wrap:wrap">
			<div style="flex:1; min-width:18em">
				<div style="display:flex; flex-wrap:wrap">
					<div>
						<label for="word">Word</label>
						<input id="word" type="text" autocapitalize="off">
						<br>
						<label for="meaning">Meaning</label>
						<input id="meaning" type="text" autocapitalize="off">
						<br>
						<label for="translation">Translation</label>
						<input id="translation" type="text" autocapitalize="off">
					</div>
					<div>
						<label for="tags">Tags</label>
						<input-list id="tags" class="indent" type="select" .options="${this.tags}"></input-list>
					</div>
					<div>
						<label for="notes">Notes</label>
						<input-list id="notes" class="indent"></input-list>
					</div>
					<div>
						<label for="notes-regex">Notes (regex - PostgreSQL dialect)</label>
						<input-list id="notes-regex" class="indent"></input-list>
					</div>
				</div>
				<br>
				<button @click="${this.search}">Search</button>
			</div>
			${this.admin? html`
				<fieldset style="flex:1; min-width:18em">
					<legend>Admin</legend>
					<div style="display:flex; flex-wrap:wrap">
						<div>
							<label for="admin-word">θɑr</label>
							<input id="admin-word" type="text" autocapitalize="off">
							<br>
							<label for="admin-meaning">kel ɪl θen nɑ</label>
							<input id="admin-meaning" type="text" autocapitalize="off">
						</div>
						<div>
							<label for="admin-translations">kel nɑi θetsu ɪl av</label>
							<input-list id="admin-translations" class="indent"></input-list>
						</div>
						<div>
							<label for="admin-tags">Tags</label>
							<input-list id="admin-tags" class="indent" .options="${this.tags}"></input-list>
						</div>
					</div>
					<label for="admin-notes">Notes</label>
					<textarea id="admin-notes" @input="${util.autogrow}" style="display:block; width:100%"></textarea>
					<button @click="${this.addWord}">jini</button>
					<button @click="${this.changeWord}">yɪŋ</button>
					<button @click="${() => this.fetchWord(this.shadowRoot.getElementById('admin-word').value)}">gi kei</button>
				</fieldset>
			`:''}
		</div>
		<p>
		The Translation box expects an exact English word and will try to find the Spem words
		needed to express the equivalent, even if the translation isn't direct. (Note that this
		means the parts of speech won't match sometimes.) The Meaning box searches an English
		phrase that describes the word's meaning and the query doesn't have to match exactly.
		</p><p>
		So for example if you want to find all the words that could be translated as
		'of', search for that in the Translation box. If you search for that in the Meaning
		box, you might get a word that means "the opposite of".
		</p><p>
		On the other hand, if you remember the distinction Spem makes between the different meanings
		of English 'of' but not what the words for them are, you could search in the Meaning
		box for "association of" and you'd get <spem>ŋel</spem> at the top.
		(<spem>ŋel</spem> wouldn't come up for a Translation search for "of (assocation)" because
		it would never be translated as that.)
		</p><p>
		The Tags items allow filtering by categories, and Notes (non-regex) lets you enter a number of text
		strings which must be found in the notes field (searches case-insensitively).
		</p><p>
		The Word box is unique in that if you enter multiple space-separated words, it will look for all of
		them instead of treating it as one word.
		</p><p>
		For convenience, either Enter while typing in a text field or Esc will submit the search.
		</p>
		<p id="result-count"></p>
		<div style="overflow-x:auto">
		<table>
			<thead><tr>
			<th>Word</th>
			<th>Meaning</th>
			<th>Translations</th>
			<th>Notes</th>
			<th>Tags</th>
			${this.admin? html`<th>Actions</th>`:''}
			</tr></thead>
			<tbody id="results">
			${this.words.map(word => html`
				<tr class="word">
				<td><spem>${word.word}</spem></td>
				<td style="min-width: ${Math.min(20, word.meaning.length/2)}em">${word.meaning}</td>
				<td>${word.translations.join(', ')}</td>
				<td style="text-align: left; min-width: ${Math.min(30, word.notes.length/2)}em">
					${unsafeHTML(word.notes)}</td>
				<td>${unsafeHTML(word.tags.map(t => `<span class="tag">${t}</span>`)
					.join(', '))}</td>
				${this.admin? html`<td>
					<button @click="${() => this.deleteWord(word.word)}">Delete</button>
					<button @click="${() => this.fetchWord(word.word)}">Fetch</button>
				</td>`:''}
				</tr>
			`)}
			</tbody>
		</table>
		</div>
		<p>
		Sometimes, even when a word has an English word that's an exact parallel and is perfectly clear, I try to
		fill the Meaning field with a formal definition anyway, just as a philosophical exercise.
		</p>
		`;
	}
	async firstUpdated() {
		super.firstUpdated();
		this.bindSearchKeys();
		const resp = await util.api('GET', 'spem/tags');
		try {
			this.tags = await resp.json();
		} catch {
			util.showToast('err', "Couldn't understand response from server");
		}
		await this.updateComplete;
		const args = util.parseQuery(location.search);
		const params = ['word', 'meaning', 'translation', 'tag', 'notes', 'notes_regex'];
		if (params.some(p => p in args)) this.pageloadSearch();
	}
	async pageloadSearch() {
		const args = util.parseQuery(location.search);
		this.shadowRoot.getElementById('word').value = args.word || '';
		this.shadowRoot.getElementById('meaning').value = args.meaning || '';
		this.shadowRoot.getElementById('translation').value = args.translation || '';
		// Make sure everything ends up as a proper list.
		const toList = v => v? (v instanceof Array? v : [v]) : [];
		this.shadowRoot.getElementById('tags').setData(toList(args.tag));
		this.shadowRoot.getElementById('notes').setData(toList(args.notes));
		this.shadowRoot.getElementById('notes-regex').setData(toList(args.notes_regex));
		this.search();
	}
	bindSearchKeys() {
		// Enter on any of these elements should search.
		const targets = [
			this.shadowRoot.getElementById('word'),
			this.shadowRoot.getElementById('meaning'),
			this.shadowRoot.getElementById('translation'),
			this.shadowRoot.getElementById('tags'),
			this.shadowRoot.getElementById('notes'),
			this.shadowRoot.getElementById('notes-regex'),
		];
		for (let elem of targets) {
			elem.addEventListener('keyup', event => {
				if (event.keyCode === 13) this.search();
			});
		}
		// Esc on the should search.
		addEventListener('keyup', e => {
			if (e.keyCode === 27) this.search();
		});
	}
	async search() {
		// Gather data.
		const query = {
			word: this.shadowRoot.getElementById('word').value,
			meaning: this.shadowRoot.getElementById('meaning').value,
			translation: this.shadowRoot.getElementById('translation').value,
			tag: this.shadowRoot.getElementById('tags').getData(),
			notes: this.shadowRoot.getElementById('notes').getData(),
			notes_regex: this.shadowRoot.getElementById('notes-regex').getData(),
		}
		const resp = await util.api('GET', 'spem/words', query);
		try {
			this.words = await resp.json();
		} catch {
			throw util.showToast('err', "Couldn't understand response from server")
		}
		this.shadowRoot.getElementById('result-count').innerText = `${this.words.length} results found`;
	}
	async deleteWord(word) {
		await util.api('DELETE', 'spem/words', undefined, word);
		util.showToast('success', `${word} deleted`);
	}
	async fetchWord(word) {
		const resp = await util.api('GET', 'spem/words', {word: word, raw: true});
		try {
			var newWord = (await resp.json())[0];
		} catch {
			throw util.showToast('err', "Couldn't understand response from server")
		}
		// Fill in data.
		this.shadowRoot.getElementById('admin-word').value = newWord.word;
		this.shadowRoot.getElementById('admin-meaning').value = newWord.meaning;
		this.shadowRoot.getElementById('admin-notes').value = newWord.notes;
		util.autogrow({target: this.shadowRoot.getElementById('admin-notes')});
		this.shadowRoot.getElementById('admin-translations').setData(newWord.translations);
		this.shadowRoot.getElementById('admin-tags').setData(newWord.tags);
	}
	// A helper to format the entries of the admin widgets as a Word object.
	getAdminData() {
		return {
			word: this.shadowRoot.getElementById('admin-word').value,
			meaning: this.shadowRoot.getElementById('admin-meaning').value,
			notes: this.shadowRoot.getElementById('admin-notes').value,
			translations: this.shadowRoot.getElementById('admin-translations').getData(),
			tags: this.shadowRoot.getElementById('admin-tags').getData(),
		};
	}
	async addWord() {
		const data = this.getAdminData();
		await util.api('POST', 'spem/words', undefined, data);
		util.showToast('success', `${data.word} added`);
	}
	async changeWord() {
		const data = this.getAdminData();
		await util.api('PUT', 'spem/words', undefined, data);
		util.showToast('success', `${data.word} changed`);
	}
});
