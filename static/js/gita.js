"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadGitaShloka = void 0;
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
	console.log(window.location.href);
	var adhyaya = window.location.href.split("/").at(-2);
	var shloka = window.location.href.split("/").at(-1);
	req.open("GET", "/api/v1/bhagavadgita/".concat(adhyaya, "/").concat(shloka));
	req.onload = function () {
		console.log(".....");
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
