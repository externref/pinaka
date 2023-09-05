import type { GitaShloka } from './$gita';
import { error } from '@sveltejs/kit';
import adhyayaToShlokaMap from './gita';

export function getShlokaData(adhyaya: number, shloka: number): GitaShloka {
	if (adhyaya > 19) throw error(404, { message: `Adhyaya ${adhyaya} does not exist.` });
	let data = adhyayaToShlokaMap[adhyaya.toString() as keyof typeof adhyayaToShlokaMap];
	let shlokasInAdhyaya = data.at(0);
	if (shloka > (shlokasInAdhyaya as number))
		throw error(404, {
			message: `Shloka ${shloka} in adhyaya ${adhyaya} (has ${shlokasInAdhyaya} shlokas) does not exist.`
		});
	// @ts-ignore
	return data.at(1)[shloka.toString()] as GitaShloka;
}
