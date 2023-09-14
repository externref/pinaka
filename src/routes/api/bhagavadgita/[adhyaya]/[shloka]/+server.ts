import { error, json } from '@sveltejs/kit';
import type { GETReqData } from './$types';
import { getShloka } from 'gita';
import { globalCORSHeaders } from '$lib/constants';

export function GET(data: GETReqData) {
	let adhyaya: number = parseInt(data.params.adhyaya);
	let shloka: number = parseInt(data.params.shloka);

	let shlokaData = getShloka(adhyaya, shloka);
	if (!shlokaData) {
		return error(404, `Shloka ${shloka} in adhyaya ${adhyaya} not found.`);
	}
	return json(shlokaData?.dict(), {
		headers: globalCORSHeaders
	});
}
