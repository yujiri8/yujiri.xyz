'use strict';

var initialScores = {
	// R and RG
	"Rhino" : 0,
	"Photonic Fibroid" : 0,
	"Feral Warden" : 0,
	"Protoplasm" : 0,
	// RB
	"Bombarder" : 0,
	"Arka Sodara" : 0,
	// G
	"Innervi Field" : 0,
	"Mahar Rectifier" : 0,
	"Xaetron" : 0,
	// GB
	"Borehole Patroller" : 0,
	"Chieftain" : 0,
	"Urban Sentry" : 0,
	"Xeno Guardian" : 0,
	// B
	"Wall" : 0,
	"Steelsplitter" : 0,
	"Lancetooth" : 0,
	"Doomed Wall" : 0,
	"Infusion Grid" : 0,
	"Doomed Mech" : 0,
	"Energy Matrix" : 0,
	"Omega Splitter" : 0,
	"Odin" : 0,
	"Defense Grid" : 0,
	// RGB
	"Colossus" : 0,
	"Centurion" : 0,
};

var scores = initialScores;
var currentQuestion = 0;

function absorberQuizInit() {
	beginTest();
}

function processAnswer(answer) {
	// First, get the actual scores from the answer number.
	var answerScores = questions[currentQuestion].answers[answer].scores;
	for (var unit in answerScores) {
		scores[unit] += answerScores[unit];
	}
	hideQuestion();
	currentQuestion++;
	if (currentQuestion == questions.length) {
		results();
	} else {
		showQuestion();
	}
}

function beginTest() {
	scores = initialScores;
	currentQuestion = 0;
	showQuestion();
}

// Workaround since Qutebrowser doesn't support Object.values.
function getObjValues(obj) {
	let vals = [];
	for (let key in obj) {
		vals.push(obj[key]);
	}
	console.log(vals);
	return vals;
}

function results() {
	var area = document.getElementById("questionArea");
	var max = Math.max(...getObjValues(scores));
	var winners = Object.keys(scores).filter(unit => scores[unit] == max);
	var newHTML = '<p style="text-align:center">Congratulations! You are:</p><br><br><br><p style="text-align:center">';
	if (winners.length == 1) {
		newHTML += '<span style="font-size:2em"><b>' + winners[0] + '</b></span></p>';
	} else {
		newHTML += 'either ';
		for (var i = 0; i < winners.length; i++) {
			newHTML += '<span style="font-size:2em"><b>&nbsp;' + winners[i] + "&nbsp;</b></span>";
			if (i+1 < winners.length) {
				newHTML += " or ";
			}
		}
		newHTML += "</p>";
	}
	area.innerHTML = newHTML;
}

function hideQuestion() {
	var elem = document.getElementById("question");
	elem.parentNode.removeChild(elem);
}

function showQuestion() {
	var elem = document.createElement('div');
	elem.id = "question";
	// Shortcut var.
	var question = questions[currentQuestion];
	// Write header.
	elem.innerHTML = "<h3>" + (currentQuestion+1) + ") " + question.question + "</h3>\n";
	// Write answers.
	for (var i in question.answers) {
		elem.innerHTML += '<button class="answer" onclick="processAnswer(' + i + ')">' + question.answers[i].answer + '</button>\n';
	}
	document.getElementById("questionArea").appendChild(elem);
}

var questions = [
	{
		"question": "Do you believe the best defense is a good offense?",
		"answers": [
			{
				"answer": "Yes",
				"scores": {
					"Protoplasm": 2,
					"Feral Warden": 2,
					"Colossus": 2,
					"Photonic Fibroid": 2,
					"Rhino": 2,
					"Bombarder" : 2,
					"Odin": 1,
					"Borehole Patroller": 1,
					"Xaetron": -1,
					"Defense Grid": -2,
					"Infusion Grid": -2,
					"Doomed Wall": -2,
					"Energy Matrix": -2,
					"Wall": -2,
					"Innervi Field": -2,
				}
			}, {
				"answer": "No",
				"scores": {
					"Defense Grid": 2,
					"Infusion Grid": 2,
					"Doomed Wall": 2,
					"Energy Matrix": 2,
					"Wall": 2,
					"Innervi Field": 2,
					"Xaetron": 1,
					"Odin": -1,
					"Borehole Patroller": -1,
					"Bombarder" : -2,
					"Protoplasm": -2,
					"Feral Warden": -2,
					"Colossus": -2,
					"Photonic Fibroid": -2,
					"Rhino": -2,
				}
			}, {
				"answer": "Sometimes",
				"scores": {
					"Doomed Mech": 2,
					"Mahar Rectifier": 2,
					"Omega Splitter": 2,
					"Lancetooth": 2,
					"Xaetron": 2,
					"Arka Sodara": 2,
					"Chieftain": 2,
					"Steelsplitter": 2,
					"Odin": 1,
					"Centurion": -2,
					"Xeno Guardian": -2,
					"Urban Sentry": -2,
					"Borehole Patroller": -2,
				}
			}, {
				"answer": "A balance is important.",
				"scores": {
					"Centurion": 2,
					"Xeno Guardian": 2,
					"Urban Sentry": 2,
					"Borehole Patroller": 2,
					"Odin": -1,
					"Doomed Mech": -2,
					"Mahar Rectifier": -2,
					"Omega Splitter": -2,
					"Lancetooth": -2,
					"Xaetron": -2,
					"Arka Sodara": -2,
					"Chieftain": -2,
					"Steelsplitter": -2,
				}
			}
		]
	},
	{
		"question": "When you have a deadline, do you tend to procrastinate until the last day, or get stressed out and feel the need to do it immediately?",
		"answers": [
			{
				"answer": "Procrastinate",
				"scores": {
					"Doomed Mech": 2,
					"Mahar Rectifier": 2,
					"Omega Splitter": 2,
					"Lancetooth": 2,
					"Chieftain": 2,
					"Steelsplitter": 2,
					"Xeno Guardian": 2,
					"Urban Sentry": 2,
					"Colossus": 2,
					"Defense Grid": 2,
					"Infusion Grid": 2,
					"Bombarder": 2,
					"Odin": 1,
					"Borehole Patroller": 1,
					"Feral Warden": 1,
					"Xaetron": -1,
					"Protoplasm": -2,
					"Photonic Fibroid": -2,
					"Rhino": -2,
					"Doomed Wall": -2,
					"Energy Matrix": -2,
					"Wall": -2,
					"Innervi Field": -2,
					"Arka Sodara": -2,
					"Centurion": -2,
				}
			}, {
				"answer": "Do it immediately",
				"scores": {
					"Doomed Mech": -2,
					"Mahar Rectifier": -2,
					"Omega Splitter": -2,
					"Lancetooth": -2,
					"Chieftain": -2,
					"Steelsplitter": -2,
					"Xeno Guardian": -2,
					"Urban Sentry": -2,
					"Colossus": -2,
					"Defense Grid": -2,
					"Infusion Grid": -2,
					"Bombarder": -2,
					"Odin": -1,
					"Borehole Patroller": -1,
					"Feral Warden": -1,
					"Xaetron": 1,
					"Protoplasm": 2,
					"Photonic Fibroid": 2,
					"Rhino": 2,
					"Doomed Wall": 2,
					"Energy Matrix": 2,
					"Wall": 2,
					"Innervi Field": 2,
					"Arka Sodara": 2,
					"Centurion": 2,
				}
			}
		]
	},
	{
		"question": "Do you consider altruism one of your key strengths?",
		"answers": [
			{
				"answer": "Yes",
				"scores": {
					"Doomed Mech": 2,
					"Chieftain": 2,
					"Infusion Grid": 2,
					"Bombarder": 2,
					"Wall": 2,
					"Innervi Field": 2,
					"Protoplasm": 2,
					"Rhino": 2,
					"Photonic Fibroid": 2,
					"Doomed Wall": 2,
					"Defense Grid": 1,
					"Energy Matrix": 1,
					"Xeno Guardian": 0,
					"Urban Sentry": -1,
					"Feral Warden": -1,
					"Mahar Rectifier": -2,
					"Omega Splitter": -2,
					"Steelsplitter": -2,
					"Odin": -2,
					"Lancetooth": -2,
					"Xaetron": -2,
					"Colossus": -2,
					"Borehole Patroller": -2,
					"Arka Sodara": -2,
					"Centurion": -2,
				}
			}, {
				"answer": "No",
				"scores": {
					"Doomed Mech": -2,
					"Chieftain": -2,
					"Infusion Grid": -2,
					"Bombarder": -2,
					"Wall": -2,
					"Innervi Field": -2,
					"Protoplasm": -2,
					"Rhino": -2,
					"Photonic Fibroid": -2,
					"Doomed Wall": -2,
					"Defense Grid": -1,
					"Energy Matrix": -1,
					"Xeno Guardian": 0,
					"Urban Sentry": 1,
					"Feral Warden": 1,
					"Mahar Rectifier": 2,
					"Omega Splitter": 2,
					"Steelsplitter": 2,
					"Odin": 2,
					"Lancetooth": 2,
					"Xaetron": 2,
					"Colossus": 2,
					"Borehole Patroller": 2,
					"Arka Sodara": 2,
					"Centurion": 2,
				}
			}
		]
	},
	{
		"question": "Are you more of an idealist or a pragmatist?",
		"answers": [
			{
				"answer": "Very idealistic",
				"scores": {
					"Defense Grid": 2,
					"Centurion": 2,
					"Omega Splitter": 2,
					"Colossus": 2,
					"Odin": 2,

					"Mahar Rectifier": 1,
					"Chieftain": 1,
					"Arka Sodara": 1,

					"Xeno Guardian": -1,
					"Doomed Mech": -1,
					"Xaetron": -1,
					"Innervi Field": -1,
					"Bombarder": -1,

					"Energy Matrix": -2,
					"Lancetooth": -2,
					"Protoplasm": -2,

					"Infusion Grid": -2,
					"Wall": -2,
					"Rhino": -2,
					"Photonic Fibroid": -2,
					"Doomed Wall": -2,
					"Urban Sentry": -2,
					"Feral Warden": -2,
					"Steelsplitter": -2,
					"Borehole Patroller": -2,
				}
			}, {
				"answer": "Somewhat idealistic",
				"scores": {
					"Defense Grid": 1,
					"Centurion": 1,
					"Omega Splitter": 1,
					"Colossus": 1,
					"Odin": 1,

					"Mahar Rectifier": 2,
					"Chieftain": 2,
					"Arka Sodara": 2,

					"Xeno Guardian": 0,
					"Doomed Mech": 0,
					"Xaetron": 0,
					"Innervi Field": 0,
					"Bombarder": 0,

					"Energy Matrix": -1,
					"Lancetooth": -1,
					"Protoplasm": -1,

					"Infusion Grid": -1,
					"Wall": -1,
					"Rhino": -1,
					"Photonic Fibroid": -1,
					"Doomed Wall": -1,
					"Urban Sentry": -1,
					"Feral Warden": -1,
					"Steelsplitter": -1,
					"Borehole Patroller": -1,
				}
			}, {
				"answer": "Balanced",
				"scores": {
					"Defense Grid": 0,
					"Centurion": 0,
					"Omega Splitter": 0,
					"Colossus": 0,
					"Odin": 0,

					"Mahar Rectifier": 0,
					"Chieftain": 0,
					"Arka Sodara": 0,

					"Xeno Guardian": 2,
					"Doomed Mech": 2,
					"Xaetron": 2,
					"Innervi Field": 2,
					"Bombarder": 2,

					"Energy Matrix": 0,
					"Lancetooth": 0,
					"Protoplasm": 0,

					"Infusion Grid": 0,
					"Wall": 0,
					"Rhino": 0,
					"Photonic Fibroid": 0,
					"Doomed Wall": 0,
					"Urban Sentry": 0,
					"Feral Warden": 0,
					"Steelsplitter": 0,
					"Borehole Patroller": 0,
				}
			}, {
				"answer": "Somewhat pragmatic",
				"scores": {
					"Defense Grid": -1,
					"Centurion": -1,
					"Omega Splitter": -1,
					"Colossus": -1,
					"Odin": -1,

					"Mahar Rectifier": -1,
					"Chieftain": -1,
					"Arka Sodara": -1,

					"Xeno Guardian": 0,
					"Doomed Mech": 0,
					"Xaetron": 0,
					"Innervi Field": 0,
					"Bombarder": 0,

					"Energy Matrix": 2,
					"Lancetooth": 2,
					"Protoplasm": 2,

					"Infusion Grid": 1,
					"Wall": 1,
					"Rhino": 1,
					"Photonic Fibroid": 1,
					"Doomed Wall": 1,
					"Urban Sentry": 1,
					"Feral Warden": 1,
					"Steelsplitter": 1,
					"Borehole Patroller": 1,
				}
			}, {
				"answer": "Very pragmatic",
				"scores": {
					"Defense Grid": -2,
					"Centurion": -2,
					"Omega Splitter": -2,
					"Colossus": -2,
					"Odin": -2,

					"Mahar Rectifier": -2,
					"Chieftain": -2,
					"Arka Sodara": -2,

					"Xeno Guardian": -1,
					"Doomed Mech": -1,
					"Xaetron": -1,
					"Innervi Field": -1,
					"Bombarder": -1,

					"Energy Matrix": 1,
					"Lancetooth": 1,
					"Protoplasm": 1,

					"Infusion Grid": 2,
					"Wall": 2,
					"Rhino": 2,
					"Photonic Fibroid": 2,
					"Doomed Wall": 2,
					"Urban Sentry": 2,
					"Feral Warden": 2,
					"Steelsplitter": 2,
					"Borehole Patroller": 2,
				}
			}
		]
	},
	{
		"question": "Do you like being the center of attention?",
		"answers": [
			{
				"answer": "Absolutely",
				"scores": {
					"Defense Grid": 2,
					"Centurion": 2,
					"Omega Splitter": 2,
					"Protoplasm": 2,
					"Xeno Guardian": 2,
					"Urban Sentry": 2,

					"Arka Sodara": 1,
					"Colossus": 1,
					"Odin": 1,
					"Mahar Rectifier": 1,
					"Doomed Mech": 1,
					"Xaetron": 1,
					"Energy Matrix": 1,

					"Feral Warden": -1,
					"Bombarder": -1,
					"Infusion Grid": -1,
					"Wall": -1,
					"Doomed Wall": -1,

					"Chieftain": -2,
					"Innervi Field": -2,

					"Lancetooth": -2,
					"Rhino": -2,
					"Photonic Fibroid": -2,
					"Steelsplitter": -2,
					"Borehole Patroller": -2,
				}
			}, {
				"answer": "To an extent / sometimes",
				"scores": {
					"Defense Grid": 1,
					"Centurion": 1,
					"Omega Splitter": 1,
					"Protoplasm": 1,
					"Xeno Guardian": 1,
					"Urban Sentry": 1,

					"Arka Sodara": 2,
					"Colossus": 2,
					"Odin": 2,
					"Mahar Rectifier": 2,
					"Doomed Mech": 2,
					"Xaetron": 2,
					"Energy Matrix": 2,

					"Feral Warden": 1,
					"Bombarder": 1,
					"Infusion Grid": 1,
					"Wall": 1,
					"Doomed Wall": 1,

					"Chieftain": -1,
					"Innervi Field": -1,

					"Lancetooth": -1,
					"Rhino": -1,
					"Photonic Fibroid": -1,
					"Steelsplitter": -1,
					"Borehole Patroller": -1,
				}
			}, {
				"answer": "Not really",
				"scores": {
					"Defense Grid": -1,
					"Centurion": -1,
					"Omega Splitter": -1,
					"Protoplasm": -1,
					"Xeno Guardian": -1,
					"Urban Sentry": -1,

					"Arka Sodara": -1,
					"Colossus": -1,
					"Odin": -1,
					"Mahar Rectifier": -1,
					"Doomed Mech": -1,
					"Xaetron": -1,
					"Energy Matrix": -1,

					"Feral Warden": 1,
					"Bombarder": 1,
					"Infusion Grid": 1,
					"Wall": 1,
					"Doomed Wall": 1,

					"Chieftain": 2,
					"Innervi Field": 2,

					"Lancetooth": 1,
					"Rhino": 1,
					"Photonic Fibroid": 1,
					"Steelsplitter": 1,
					"Borehole Patroller": 1,
				}
			}, {
				"answer": "Not at all",
				"scores": {
					"Defense Grid": -2,
					"Centurion": -2,
					"Omega Splitter": -2,
					"Protoplasm": -2,
					"Xeno Guardian": -2,
					"Urban Sentry": -2,

					"Arka Sodara": -2,
					"Colossus": -2,
					"Odin": -2,
					"Mahar Rectifier": -2,
					"Doomed Mech": -2,
					"Xaetron": -2,
					"Energy Matrix": -2,

					"Feral Warden": -1,
					"Bombarder": -1,
					"Infusion Grid": -1,
					"Wall": -1,
					"Doomed Wall": -1,

					"Chieftain": 1,
					"Innervi Field": 1,

					"Lancetooth": 2,
					"Rhino": 2,
					"Photonic Fibroid": 2,
					"Steelsplitter": 2,
					"Borehole Patroller": 2,
				}
			}
		]
	},
	{
		"question": "Do you believe there is strength in numbers?",
		"answers": [
			{
				"answer": "Yes",
				"scores": {
					"Wall": 2,
					"Doomed Mech": 2,
					"Chieftain": 2,
					"Infusion Grid": 2,
					"Innervi Field": 2,
					"Protoplasm": 2,
					"Rhino": 2,
					"Photonic Fibroid": 2,
					"Bombarder": 2,
					"Doomed Wall": 2,
					"Feral Warden": 2,
					"Borehole Patroller": 2,
					"Steelsplitter": 2,
					"Lancetooth": 2,
					"Xeno Guardian": 1,
					"Urban Sentry": 1,
					"Mahar Rectifier": 1,
					"Energy Matrix": -1,
					"Omega Splitter": -1,
					"Defense Grid": -2,
					"Odin": -2,
					"Xaetron": -2,
					"Colossus": -2,
					"Arka Sodara": -2,
					"Centurion": -2,
				}
			}, {
				"answer": "No",
				"scores": {
					"Wall": -2,
					"Doomed Mech": -2,
					"Chieftain": -2,
					"Infusion Grid": -2,
					"Innervi Field": -2,
					"Protoplasm": -2,
					"Rhino": -2,
					"Photonic Fibroid": -2,
					"Bombarder": -2,
					"Doomed Wall": -2,
					"Feral Warden": -2,
					"Borehole Patroller": -2,
					"Steelsplitter": -2,
					"Lancetooth": -2,
					"Xeno Guardian": -1,
					"Urban Sentry": -1,
					"Mahar Rectifier": -1,
					"Energy Matrix": 1,
					"Omega Splitter": 1,
					"Defense Grid": 2,
					"Odin": 2,
					"Xaetron": 2,
					"Colossus": 2,
					"Arka Sodara": 2,
					"Centurion": 2,
				}
			}
		]
	},
	{
		"question": "Do you value unity or diversity more?",
		"answers": [
			{
				"answer": "Unity unilaterally",
				"scores": {
					"Defense Grid": 2,
					"Omega Splitter": 2,
					"Odin": 2,
					"Mahar Rectifier": 2,
					"Energy Matrix": 2,
					"Doomed Mech": 2,
					"Xaetron": 2,
					"Innervi Field": 2,

					"Lancetooth": 1,
					"Infusion Grid": 1,
					"Wall": 1,
					"Doomed Wall": 1,
					"Steelsplitter": 1,
					"Rhino": 1,

					"Chieftain": -2,
					"Arka Sodara": -2,
					"Xeno Guardian": -2,
					"Bombarder": -2,
					"Protoplasm": -2,
					"Photonic Fibroid": -2,
					"Urban Sentry": -2,
					"Feral Warden": -2,
					"Borehole Patroller": -2,

					"Centurion": -2,
					"Colossus": -2,
				}
			}, {
				"answer": "Unity more",
				"scores": {
					"Defense Grid": 1,
					"Omega Splitter": 1,
					"Odin": 1,
					"Mahar Rectifier": 1,
					"Energy Matrix": 1,
					"Doomed Mech": 1,
					"Xaetron": 1,
					"Innervi Field": 1,

					"Lancetooth": 2,
					"Infusion Grid": 2,
					"Wall": 2,
					"Doomed Wall": 2,
					"Steelsplitter": 2,
					"Rhino": 2,

					"Chieftain": -1,
					"Arka Sodara": -1,
					"Xeno Guardian": -1,
					"Bombarder": -1,
					"Protoplasm": -1,
					"Photonic Fibroid": -1,
					"Urban Sentry": -1,
					"Feral Warden": -1,
					"Borehole Patroller": -1,

					"Centurion": -1,
					"Colossus": -1,
				}
			}, {
				"answer": "Neither",
				"scores": {
				}
			}, {
				"answer": "Diversity more",
				"scores": {
					"Defense Grid": -1,
					"Omega Splitter": -1,
					"Odin": -1,
					"Mahar Rectifier": -1,
					"Energy Matrix": -1,
					"Doomed Mech": -1,
					"Xaetron": -1,
					"Innervi Field": -1,

					"Lancetooth": -1,
					"Infusion Grid": -1,
					"Wall": -1,
					"Doomed Wall": -1,
					"Steelsplitter": -1,
					"Rhino": -1,

					"Chieftain": 2,
					"Arka Sodara": 2,
					"Xeno Guardian": 2,
					"Bombarder": 2,
					"Protoplasm": 2,
					"Photonic Fibroid": 2,
					"Urban Sentry": 2,
					"Feral Warden": 2,
					"Borehole Patroller": 2,

					"Centurion": 1,
					"Colossus": 1,
				}
			}, {
				"answer": "Diversity unilaterally",
				"scores": {
					"Defense Grid": -2,
					"Omega Splitter": -2,
					"Odin": -2,
					"Mahar Rectifier": -2,
					"Energy Matrix": -2,
					"Doomed Mech": -2,
					"Xaetron": -2,
					"Innervi Field": -2,

					"Lancetooth": -2,
					"Infusion Grid": -2,
					"Wall": -2,
					"Doomed Wall": -2,
					"Steelsplitter": -2,
					"Rhino": -2,

					"Chieftain": 1,
					"Arka Sodara": 1,
					"Xeno Guardian": 1,
					"Bombarder": 1,
					"Protoplasm": 1,
					"Photonic Fibroid": 1,
					"Urban Sentry": 1,
					"Feral Warden": 1,
					"Borehole Patroller": 1,

					"Centurion": 2,
					"Colossus": 2,
				}
			}
		]
	}
];
