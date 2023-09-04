import { json } from '@sveltejs/kit';
import type { QueryPOSTData } from './$types';
import type { GitaShloka } from '$lib/$gita';
import { getShlokaData } from '$lib/gita_handler';

export async function POST(data: QueryPOSTData) {
	let query = await data.request.json();
	let items: GitaShloka[] = [];
	if (query.shlokas) {
		for (let i = 0; i < query.shlokas.length; i++) {
			items.push(getShlokaData(parseInt(data.params.adhyaya), query.shlokas[i]));
		}
	} else if (query.range) {
		for (let i = query.range.at(0) || 0; i < (query.range.at(1) || -1) + 1; i++) {
			items.push(getShlokaData(parseInt(data.params.adhyaya), i));
		}
	}
	return json(items);
}
