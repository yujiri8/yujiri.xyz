import {css} from 'lit-element';

export const styles = css`
* {
	box-sizing: border-box;
}
a {
	color: var(--linkcolor);
}
a:visited {
	color: var(--linkvisitedcolor);
}
a.yujiri-link, a.yujiri.link:visited {
	color: var(--yellowcolor);
}

code, pre {
	font-family: monospace, monospace;
}
code {
	background-color: var(--codecolor);
	white-space: pre-wrap;
	word-break: break-word;
}
spem {
	font-family: monospace, monospace;
}
.highlight {
	background-color: #ff06;
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
summary {
	cursor: pointer;
}
details {
	margin-bottom: 1em;
}
blockquote {
	border-left: 6px solid #00ffff;
	margin: 0.5em 1em 0.5em 1em;
	padding-left: 0.5em;
	padding-right: 0.5em;
}
hr {
	border-color: var(--weakcolor);
}
.indent {
	margin-left: 1em;
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

/* Stop things from overflowing horizontally (don't ask me why the overflow-y thing works) */
pre {
	overflow-y: hidden;
}
img {
	max-width: 100%;
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


:root[data-theme="dark"] .pygments  { background: #232629; color: #fff }
:root[data-theme="dark"] .pygments .c, :root[data-theme="dark"] .pygments .c1, :root[data-theme="dark"] .pygments .cm { color: #aaa; font-style: italic } /* comments */
:root[data-theme="dark"] .pygments .ch { color: #aaa; font-style: italic } /* shebang */
:root[data-theme="dark"] .pygments .cp, :root[data-theme="dark"] .pygments .cpf { color: #777; font-style: italic } /* preprocessor */
:root[data-theme="dark"] .pygments .cs { color: #777; font-style: italic } /* special comment */
:root[data-theme="dark"] .pygments .gp { color: #fff } /* 'generic prompt' */
:root[data-theme="dark"] .pygments .k, :root[data-theme="dark"] .pygments .kr { color: #99f; font-weight: bold } /* keywords */
:root[data-theme="dark"] .pygments .kd { color: #ff0 } /* declaration */
:root[data-theme="dark"] .pygments .kc { color: #0f0 } /* constant */
:root[data-theme="dark"] .pygments .kn { color: #99f; font-weight: bold } /* 'namespace' (`package` and `import` in Go) */
:root[data-theme="dark"] .pygments .kp { color: #7686bb; font-weight: bold } /* pseudo */
:root[data-theme="dark"] .pygments .kt { color: #f7f } /* type */
:root[data-theme="dark"] .pygments .w { color: #bbbbbb } /* 'whitespace' */
:root[data-theme="dark"] .pygments .p, :root[data-theme="dark"] .pygments .o { color: #fb2 } /* punct and ops */
:root[data-theme="dark"] .pygments.m, :root[data-theme="dark"] .pygments .mi, :root[data-theme="dark"] .pygments .mb, :root[data-theme="dark"] .pygments .mo, :root[data-theme="dark"] .pygments .mh, :root[data-theme="dark"] .pygments .mf, :root[data-theme="dark"] .pygments.il { color: #4FB8CC } /* numbers */
:root[data-theme="dark"] .pygments .s, :root[data-theme="dark"] .pygments .sa, :root[data-theme="dark"] .pygments .sb, :root[data-theme="dark"] .pygments .sc, :root[data-theme="dark"] .pygments .sd, :root[data-theme="dark"] .pygments .sh, :root[data-theme="dark"] .pygments .sx, :root[data-theme="dark"] .pygments .sr, :root[data-theme="dark"] .pygments .ss, :root[data-theme="dark"] .pygments .s1, :root[data-theme="dark"] .pygments .s2, :root[data-theme="dark"] .pygments.dl { color: #5c9 } /* strings */
:root[data-theme="dark"] .pygments .se { color: #5c9 } /* escape */
:root[data-theme="dark"] .pygments .si { color: #5c9 } /* interpolation */
:root[data-theme="dark"] .pygments .vc { color: #7AB4DB; font-weight: bold } /* vars */
:root[data-theme="dark"] .pygments .vg { color: #BE646C; font-weight: bold }
:root[data-theme="dark"] .pygments .vi { color: #7AB4DB; font-weight: bold }
:root[data-theme="dark"] .pygments .vm { color: #7AB4DB; font-weight: bold }
:root[data-theme="dark"] .pygments .err { color: #a61717; background-color: #e3d2d2 }
`;
