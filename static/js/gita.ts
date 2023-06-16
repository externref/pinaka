interface Shloka {
	adhyaya: Number;
	shloka: Number;
	original: String;
	hindi: String;
	english: String;
}

const placeholders = {
	adhyaya: "placeholder_adhyaya",
	shloka: "placeholder_shloka",
	original: "placeholder_original",
	hindi: "placeholder_hindi",
	english: "placeholder_english",
};

function updateData(placeholder: string, text: string | Number) {
	let dataHolder = document.getElementById(placeholder);
	dataHolder.innerText = text.toString();
}
export function loadGitaShloka() {
	let req = new XMLHttpRequest();
	console.log(window.location.href);
	let adhyaya = window.location.href.split("/").at(-2);
	let shloka = window.location.href.split("/").at(-1);
	req.open("GET", `/api/v1/bhagavadgita/${adhyaya}/${shloka}`);
	req.onload = () => {
		console.log(".....");
		let res: Shloka = JSON.parse(req.responseText);
		updateData(placeholders.adhyaya, res.adhyaya);
		updateData(placeholders.shloka, res.shloka);
		updateData(placeholders.original, res.original.toString());
		updateData(placeholders.hindi, res.hindi.toString());
		updateData(placeholders.english, res.english.toString());
	};
	req.send();
}
