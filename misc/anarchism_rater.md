TITLE The Anarchism Rater
NAV The Anarchism Rater
DESC You will answer a few questions about your beliefs. This test is not like other, garbage tests.

<script>
skipProperty = `questions.splice(1, 1)`;
questions = [
	{
		question: "what's the correct rough theory of property?",
		choices: [
			{label: "no one can claim exclusive ownership of anything", score: 0, trigger: skipProperty},
			{label: "only for 'personal' possessions (eg. clothes)", score: 1, trigger: skipProperty},
			{label: "only for what the owner personally uses (no absentee ownership)", score: 3, trigger: skipProperty},
			{label: "valid for the fruit of human labor but not for preexisting natural resources", score: 6},
			{label: "valid, including the 'homesteading' of natural resources by the first mixing of labor", score: 4},
		],
	}, {
		question: "can property rights be suspended in a sufficiently dire situation? For example, could you steal food to survive?",
		choices: [
			{label: "no, rights are absolute", score: -2},
			{label: "yes, rights can be suspended", score: 0},
		],
	}, {
		question: "mandatory covid lockdown",
		choices: [
			{label: "not justified at all", score: 4},
			{label: "not justified, but only because it's enforced via police brutality. coercive enforcement would be justified if it did not itself spread covid, and/or could be trusted to be done with less corrruption.", score: 2},
			{label: "justified", score: 0},
		],
	}, {
		question: "democracy",
		choices: [
			{label: "an anarchist society would be democratic", score: 0},
			{label: "democracy is not anarchist", score: 1},
		],
	}, {
		question: "should an anarchist society use prisons as punishment?",
		choices: [
			{label: "yes", score: 0},
			{label: "no", score: 1},
		],
	}, {
		question: "insurrectionary means to achieve liberation (eg. using force against politicians and police)?",
		choices: [
			{label: "justified", score: 3},
			{label: "justified in theory but not part of appropriate strategy", score: 2},
			{label: "unjustified", score: 0},
		],
	}, {
		question: "is there a limit to the amount of force that can be legitimately used in defense? For example, would it be illegitimate (not just ignoble) to shoot someone to stop them from stealing a moderate amount of money?",
		choices: [
			{label: "yes, force must be proportionate", score: 1},
			{label: "no, a defender has the right to use as much force as necessary to stop an aggression", score: 0},
		],
	}, {
		question: "given the existence of a democratic welfare state, are open borders still morally preferable to closed borders?",
		choices: [
			{label: "yes, open borders are still preferable", score: 2},
			{label: "no, closed borders are preferable", score: 0},
		],
	}, {
		question: "where does your ideology most come from?",
		choices: [
			{label: "conscience.", score: 1},
			{label: "logic.", score: 0},
			{label: "self-interest.", score: 0},
		],
	}, {
		question: "is it okay to respond with force to non-state action such as non-violent bigotry / degeneracy?",
		choices: [
			{label: "no, non-forceful action must not be met with force", score: 2},
			{label: "it's murky", score: 1},
			{label: "yes, such uses of force are justified", score: 0},
		],
	}, {
		question: "do you feel more allied with someone who shares your opposition to the state but is a bigot / degenerate, or with a statist who shares your visions for society/culture? (be honest)",
		choices: [
			{label: "more allied with the statist", score: 0},
			{label: "ambivalent", score: 1},
			{label: "more allied with the bigot/degenerate", score: 2},
		],
	},
]
score = 0;
max = questions.map(q => q.choices.map(c => c.score).reduce((a, b) => Math.max(a, b))).reduce((a, b) => a + b);
question = 0;

function ask() {
	q = questions[question];
	document.getElementById('test').innerHTML = `<p class="question">${q.question}</p>`;
	for (const choice of q.choices) {
		button = document.createElement('button');
		button.innerText = choice.label;
		button.classList.add('answer');
		button.addEventListener('click', () => answer(choice));
		document.getElementById('test').appendChild(button);
	}
}
function answer(choice) {
	score += choice.score;
	if (choice.trigger) Function(choice.trigger)();
	if (++question >= questions.length) finish();
	else ask();
}
function finish() {
	document.getElementById('test').innerHTML = `
		<p>You are ${Math.round(score/max * 100)}% based.</p>
	`;
}
</script>
<style>
button.answer {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	max-width: 40em;
	margin-bottom: 1em;
	padding: 0.4em;
}
.question {
	text-align: center;
}
</style>

<div id="test">

# The Definitive Anarchism Rater

You will answer a few questions about your beliefs. This test is not like [other, garbage tests](/argument/tests):

* You're not telling me what you believe just to be told what you believe. You're telling me what you believe in order to be told how good your beliefs are.

* The questions are good ones. They are well organized and relatively well-defined.

* It doesn't ask you redundant questions. If you say you don't believe in X, you don't get a follow-up question about the details of X.

* **It is accurate.** If the test says you're based, you really are, if it says you're not, you're not.

Click this button to begin: <button onclick="ask()">Button</button>

</div>
