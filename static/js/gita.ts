const numShlokas = {
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

export function navigate(exceed: number) {
	let shloka = Number(window.location.href.split("/").at(-1));
	document.location.replace(`./${(shloka + exceed).toString()}`);
}

interface Shloka {
	adhyaya: Number;
	shloka: Number;
	speaker: String;
	original: String;

	romanised: String;
	hindi: String;
	english: String;
}

const placeholders = {
	adhyaya: "placeholder_adhyaya",
	shloka: "placeholder_shloka",
	original: "placeholder_original",
	romanised: "placeholder_romanised",
	hindi: "placeholder_hindi",
	english: "placeholder_english",
	speaker: "placeholder_speaker",
};

function updateData(placeholder: string, text: string | Number) {
	let dataHolder = document.getElementById(placeholder);
	dataHolder.innerText = text.toString();
}
export function loadGitaShloka() {
	let req = new XMLHttpRequest();
	let adhyaya = window.location.href.split("/").at(-2);
	let shloka = window.location.href.split("/").at(-1);
	if (shloka == "1") {
		let button = document.getElementById("prevbtn");
		(button as HTMLButtonElement).disabled = true;
	}
	if (numShlokas[adhyaya] == shloka) {
		let button = document.getElementById("nxtbtn");
		(button as HTMLButtonElement).disabled = true;
	}
	req.open("GET", `/api/v1/bhagavadgita/${adhyaya}/${shloka}`);
	req.onload = () => {
		console.log(req.status);
		if (req.status == 108) {
			return alert("this part of website is currently under development");
		}
		let res: Shloka = JSON.parse(req.responseText);
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
