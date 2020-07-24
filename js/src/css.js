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
	font-size: var(--monospace-sizefix);
}
code {
	white-space: pre-wrap;
}
hr {
	border-color: var(--weakcolor);
}
.indent {
	margin-left: 1em;
}
spem {
	font-family: monospace;
	font-size: var(--monospace-sizefix);
}
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
.note:before {
	content: '[';
}
.note:after {
	content: ']';
}
.note {
	color: var(--notecolor);
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

/* Stop things from overflowing horizontally (don't ask me why the overflow-y thing works) */
pre {
	overflow-y: hidden;
}
img {
	max-width: 100%;
}


a.yujiri-link, a.yujiri.link:visited {
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
	min-height: 8em;
}
button {
	cursor: pointer;
	border-radius: 5px;
	background-color: var(--buttonbgcolor);
}

.pygments > pre { font-size: var(--monospace-sizefix) }

.pygments  { background: #232629; color: #fff }
.pygments .c, .pygments .c1, .pygments .cm { color: #aaa; font-style: italic } /* comments */
.pygments .ch { color: #aaa; font-style: italic } /* shebang */
.pygments .cp, .pygments .cpf { color: #777; font-style: italic } /* preprocessor */
.pygments .cs { color: #777; font-style: italic } /* special comment */
.pygments .gp { color: #fff } /* 'generic prompt' */
.pygments .k, .pygments .kr { color: #99f; font-weight: bold } /* keywords */
.pygments .kd { color: #ff0 } /* declaration */
.pygments .kc { color: #0f0 } /* constant */
.pygments .kn { color: #99f; font-weight: bold } /* 'namespace' (package and import in Go) */
.pygments .kp { color: #7686bb; font-weight: bold } /* pseudo */
.pygments .kt { color: #f7f } /* type */
.pygments .w { color: #bbbbbb } /* 'whitespace' */
.pygments .p, .pygments .o { color: #fb2 } /* punct and ops */
.pygments.m, .pygments .mi, .pygments .mb, .pygments .mo, .pygments .mh, .pygments .mf, .pygments.il { color: #4FB8CC } /* numbers */
.pygments .s, .pygments .sa, .pygments .sb, .pygments .sc, .pygments .sd, .pygments .sh, .pygments .sx, .pygments .sr, .pygments .ss, .pygments .s1, .pygments .s2, .pygments.dl { color: #5c9 } /* strings */
.pygments .se { color: #5c9 } /* escape */
.pygments .si { color: #5c9 } /* interpolation */
.pygments .vc { color: #7AB4DB; font-weight: bold } /* vars */
.pygments .vg { color: #BE646C; font-weight: bold }
.pygments .vi { color: #7AB4DB; font-weight: bold }
.pygments .vm { color: #7AB4DB; font-weight: bold }
.pygments .err { color: #a61717; background-color: #e3d2d2 }
`;
