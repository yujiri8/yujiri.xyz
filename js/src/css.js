import {css} from 'lit-element';

export const styles = css`

/* stuff shared with the components */
* {
	box-sizing: border-box;
}
/* Misc color adjustments */
a {
	color: var(--linkcolor);
}
a:visited {
	color: var(--linkvisitedcolor);
}
code, .code {
	background-color: var(--codecolor);
}
hr {
	border-color: var(--weakcolor);
}
.indent {
	margin-left: 1em;
}
spem {
	font-family: monospace;
}
/* distinguish quotes better */
blockquote {
	border-left: 6px solid #00ffff;
	margin: 0.5em 1em 0.5em 1em;
	padding-left: 0.5em;
	padding-right: 0.5em;
}
.highlight {
	background-color: #ff06;
}

/* column-layout pages */
div.row {
	display: grid;
	grid-gap: 1em;
}
div.column {
	min-width: 18em;
}

/* tables */
table {
	width: 100%;
}
th.par, td.par {
	min-width: 30em;
}
table, th, td {
	border: 1px solid var(--weakcolor);
	border-collapse: collapse;
	text-align: center;
}
tbody.checkered tr:nth-child(odd) {
	background-color: #222222;
}

/* spoilers */
.spoiler {
	background-color: var(--textcolor);
}
/* this is necessary to stop links from showing through */
.spoiler:not(:hover) a {
	color: var(--textcolor);
}
.spoiler:hover {
	color: var(--bgcolor);
}

/* Stop things from overflowing horizontally (don't ask me why the overflow-y thing works) */
pre {
	overflow-y: hidden;
}
img {
	max-width: 100%;
}

/* stuff for reviews */
.good {
	color: blue;
}
.bad {
	color: red;
}
.mixed {
	color: var(--yellowcolor);
}

/* inputs */
input, textarea {
	color: var(--textcolor);
	background-color: var(--bgcolor);
	border: 1px solid var(--weakcolor);
	margin-top: 1em;
	margin-bottom: 1em;
}
/* these don't inherit font stuff by default */
input, textarea, button {
	font-family: inherit;
	font-size: 0.9em;
}
textarea {
	max-width: 100%;
	width: 60em;
	height: 12em;
}
button {
	cursor: pointer;
	border-radius: 5px;
	background-color: var(--buttonbgcolor);
}
`;
