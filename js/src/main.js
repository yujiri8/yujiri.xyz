import 'lit-toast';
// This syntax seems to be necessary.
import * as strftime from 'strftime';
window.strftime = strftime;

import './util.js';
import './theme-switch.js';
import './login-pane.js';
import './expand-note.js';
import './comment-section.js';
import './recent-comments.js';
import './auth-popup.js';
import './notifs-panel.js';
import './spem-search.js';


// Apply saved theme.
const currentTheme = localStorage.getItem('theme');
if (currentTheme) document.documentElement.setAttribute('data-theme', currentTheme);

// Put a global reference to the timestamp.
addEventListener('load', () => {
	window.timestr = document.getElementById('timestamp').innerText;
	window.timestamp = new Date(window.timestr);
});
