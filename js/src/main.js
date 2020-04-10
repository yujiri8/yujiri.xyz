import 'lit-toast';
// This syntax seems to be necessary.
import * as strftime from 'strftime';
window.strftime = strftime;

import './util.js';
import './yujiri-navbar.js';
import './expand-note.js';
import './comment-section.js';
import './recent-comments.js';
import './auth-popup.js';
import './notifs-panel.js';
import './spem-search.js';

// Error codes.
window.errorCodes = {
	400: "Bad request",
	404: "Not found",
	500: "Server error. I should receive an automatic email about this, so with luck I'll fix it soon.",
}
