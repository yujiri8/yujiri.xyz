'use strict';

import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';

export async function api(method, url, query, body) {
	if (typeof body != 'string') body = JSON.stringify(body);
	if (typeof query == 'object') {
		let qs = Object.entries(query).map(fmtQueryParam).join('&');
		if (qs.length) url = url + "?" + qs;
	}
	try {
		var resp = await fetch('/api/' + url, {body: body, method: method});
	} catch (err) {
		showToast('err', "Failed to send request");
		throw err;
	}
	if (resp.status == 401) {
		// Don't try to recursively make the login request. Let the auth popup handle retries.
		if (url == 'login') return resp;
		// Set this flag for callers who want to know whether the request required login.
		window.loginRequired = true;
		await login(await resp.text());
		return api(method, url, undefined, body);
	} else if (!resp.ok) {
		throw handleErr(resp);
	}
	return resp;
}

// A helper for api.
function fmtQueryParam(entry) {
	const k = entry[0];
	const v = entry[1];
	if (v instanceof Array)
		return v.map(i => encodeURIComponent(k) + '=' + encodeURIComponent(i)).join('&');
	return encodeURIComponent(k) + '=' + encodeURIComponent(v);
}

const errorCodes = {
	401: "Not logged in?",
	400: "Bad request",
	403: "You don't have permission to do that.",
	404: "Not found",
	500: "Server error. I should receive an automatic email about this, so with luck I'll fix it soon.",
	502: "Seems like the server isn't running. Hopefully I'll fix this ASAP.",
}

export const login = (initialMsg) => document.querySelector('auth-popup').run(initialMsg);

export async function handleErr(resp) {
	// Check for a message from the server.
	try {
		var text = await resp.text();
	} catch {
		return showToast('err', "Couldn't understand response from server");
	}
	if (!text || text.includes("<html")) // Don't display HTML responses.
		text = errorCodes[resp.status] || `Error ${resp.status}`;
	showToast('err', text);
}

// This function is taken from W3Schools.
export function readCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var cookies = decodedCookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		let c = cookies[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

// Gives them a month.
export function setCookie(name, val) {
	document.cookie = `${name}=${val}; path=/; max-age=2592000;`;
}

// Helper to format a comment's metadata as a sentence.
export function summarizeComment(comment) {
	return unsafeHTML(`${comment.name} on
		<a href="${comment.link}">${comment.article_title}</a>
		at ${formatDate(comment.time_added)}`);
}

// Used for pages that have a column layout.
window.resizeColumns = function() {
	// Get the grid and columns.
	const grid = document.getElementsByClassName('row')[0];
	const columns = document.getElementsByClassName("column");
	// Shortcut.
	let gridStyle = getComputedStyle(grid);
	// Get the grid width in em.
	const emSize = parseFloat(gridStyle['font-size']);
	const width = parseInt(gridStyle.width) / emSize;
	// Just get any colunm's minimum width since they'll be the same.
	const minColWidth = parseFloat(
		parseInt(getComputedStyle(columns[0]).minWidth) +
		parseInt(gridStyle.gridRowGap)) / emSize;
	while (true) {
		// Count the current columns the grid is set to.
		let colsPerRow = gridStyle.gridTemplateColumns.split(' ').length;
		// If we need to add a row, do so.
		if (width / colsPerRow < minColWidth) {
			// Emergency stop if we would try to go down to 0 columns.
			if (colsPerRow <= 1) break;
			// TODO I think this overcompresses with >= 7 columns.
			grid.style["grid-template-columns"] = 'repeat(' + Math.ceil(colsPerRow / 2) + ', 1fr)';
		// If we can eliminate a row, do so.
		} else {
			// Find the number of columns in the bottom row.
			let bottomCols = columns.length % colsPerRow || colsPerRow;
			// Find the number of rows above it.
			let rowsAbove = (columns.length - bottomCols) / colsPerRow;
			// Calculate the max number of colums we could need to add.
			let maxAddition = Math.ceil(bottomCols / rowsAbove);
			// Calculate the required width.
			let reqWidth = minColWidth * (colsPerRow + maxAddition);
			// If we have it, cut the bottom row.
			if (reqWidth <= width) {
				grid.style["grid-template-columns"] = 'repeat(' + (colsPerRow + maxAddition) + ', 1fr)';
			} else {
				break;
			}
		}
	}
};

export function showToast(tone, msg) {
	// This flag is set when navigating away to stop error toasts from firing.
	if (window.noShowError) return;
	// If there's already a toast, remove it. We can't reuse it because re-calling show doesn't update the text.
	let toast = document.querySelector('lit-toast');
	if (toast) toast.remove();
	toast = document.createElement('lit-toast');
	document.body.appendChild(toast);
	const color = {'err': '#f00', 'success': '#0f0'}[tone];
	toast.setAttribute('style', `--lt-color:${color};`)
	toast.show(msg);
}

export function titleCase(str) {
	return str.split(' ').map(s => s[0].toUpperCase() + s.slice(1)).join(' ').replace(' Of', ' of')
}

// Adapted from code by jsdw from Stack Overflow. Pass location.search.
export function parseQuery(raw) {
	raw = raw.slice(1); // Drop the initial ?.
	const entries = raw.split("&");
	const query = {};
	for (let entry of entries) {
		const pieces = entry.split("=");
		const param = decodeURIComponent(pieces[0]);
		const value = decodeURIComponent(pieces[1]);
		if (query[param] == undefined) {
			query[param] = value;
		} else if (query[param] instanceof Array) {
			query[param].push(value);
		} else {
			query[param] = [query[param], value];
		}
	}
	return query;
}

// This flag stops error toasts from showing when a request is interrupted by navigating away.
addEventListener("beforeunload", () => window.noShowError = true);

// A global utility to make a textarea grow when necessary.
window.autogrow = e => {
	const textarea = e.target;
	// Temporarily add a bottom margin equal to the height of the textarea.
	// This prevents a glitch that scrolls the viewport upward when the textarea contracts.
	const prevMarginBottom = textarea.style.marginBottom;
	textarea.style.marginBottom = textarea.scrollHeight + 'px';
	// We have to clear the height first so it can also shrink when text is deleted.
	textarea.style.height = 'inherit';
	textarea.style.height = textarea.scrollHeight + 2 + 'px';
	textarea.style.marginBottom = prevMarginBottom;
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export function formatDate(d) {
	d = new Date(d); // Incase it's in string form. This won't change the value of a Date object.
	return `${d.getUTCFullYear()} ${monthNames[d.getMonth()]} ${d.getDate()},
		${dayNames[d.getDay()]}, ${d.getHours()}:${d.getMinutes()}`;
}
