import type { GitaShloka } from './$gita';
import { readFileSync } from 'fs';
import { error } from '@sveltejs/kit';
const adhyayaToShlokaCountMap = {
	'1': 47,
	'2': 72,
	'3': 43,
	'4': 42,
	'5': 29,
	'6': 47,
	'7': 30,
	'8': 28,
	'9': 34,
	'10': 42,
	'11': 55,
	'12': 20,
	'13': 35,
	'14': 27,
	'15': 20,
	'16': 24,
	'17': 28,
	'18': 78
};

export function getShlokaData(adhyaya: number, shloka: number): GitaShloka {
	if (adhyaya > 19) throw error(404, { message: `Adhyaya ${adhyaya} does not exist.` });
	let shlokasInAdhyaya =
		adhyayaToShlokaCountMap[adhyaya.toString() as keyof typeof adhyayaToShlokaCountMap];
	if (shloka > shlokasInAdhyaya)
		throw error(404, {
			message: `Shloka ${shloka} in adhyaya ${adhyaya} (has ${shlokasInAdhyaya} shlokas) does not exist.`
		});
	const adhyayaJSON = JSON.parse(readFileSync(`src/lib/gita/adhyaya${adhyaya}.json`).toString());
	return adhyayaJSON[shloka.toString()];
}
