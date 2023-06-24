"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGitaShloka = exports.navigate = void 0;
var numShlokas = {
	1: 47,
	2: 72,
	3: 43,
	4: 42,
	5: 29,
	6: 47,
	7: 30,
	8: 28,
	9: 34,
	10: 42,
	11: 55,
	12: 20,
	13: 35,
	14: 27,
	15: 20,
	16: 24,
	17: 28,
	18: 78,
};
function navigate(exceed) {
	var shloka = Number(window.location.href.split("/").at(-1));
	document.location.replace("./".concat((shloka + exceed).toString()));
}
exports.navigate = navigate;
var placeholders = {
	adhyaya: "placeholder_adhyaya",
	shloka: "placeholder_shloka",
	original: "placeholder_original",
	romanised: "placeholder_romanised",
	hindi: "placeholder_hindi",
	english: "placeholder_english",
	speaker: "placeholder_speaker",
};
function updateData(placeholder, text) {
	var dataHolder = document.getElementById(placeholder);
	dataHolder.innerText = text.toString();
}
function loadGitaShloka() {
	var req = new XMLHttpRequest();
	var adhyaya = window.location.href.split("/").at(-2);
	var shloka = window.location.href.split("/").at(-1);
	if (shloka == "1") {
		var button = document.getElementById("prevbtn");
		button.disabled = true;
	}
	if (numShlokas[adhyaya] == shloka) {
		var button = document.getElementById("nxtbtn");
		button.disabled = true;
	}
	req.open("GET", "/api/v1/bhagavadgita/".concat(adhyaya, "/").concat(shloka));
	req.onload = function () {
		console.log(req.status);
		if (req.status == 108) {
			return alert("this part of website is currently under development");
		}
		var res = JSON.parse(req.responseText);
		updateData(placeholders.adhyaya, res.adhyaya);
		updateData(placeholders.shloka, res.shloka);
		updateData(placeholders.speaker, res.speaker.toString());
		updateData(placeholders.original, res.original.toString());
		updateData(placeholders.romanised, res.romanised.toString());
		updateData(placeholders.hindi, res.hindi.toString());
		updateData(placeholders.english, res.english.toString());
	};
	req.send();
}
exports.loadGitaShloka = loadGitaShloka;
