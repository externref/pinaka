import { json } from '@sveltejs/kit';
import type { GETReqData } from './$types';
import { getShlokaData } from '$lib/gita_handler';
import { globalCORSHeaders } from '$lib/constants';

export function GET(data: GETReqData) {
	let adhyaya: number = parseInt(data.params.adhyaya);
	let shloka: number = parseInt(data.params.shloka);

	let shlokaData = getShlokaData(adhyaya, shloka);
	return json(shlokaData, {
		headers: globalCORSHeaders
	});
}
