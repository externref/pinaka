import { error, json } from '@sveltejs/kit';
import type { QueryPOSTData } from './$types';
import { getAdhyaya } from 'gita';
import type { Shloka } from 'gita/src/Shloka';

export async function POST(data: QueryPOSTData) {
	let query = await data.request.json();
	let items: Shloka[] = [];
	let adhyaya = getAdhyaya(parseInt(data.params.adhyaya));
	if (adhyaya) {
		if (query.shlokas) {
			for (let i = 0; i < query.shlokas.length; i++) {
				items.push(adhyaya[query.shlokas[i]]);
			}
		} else if (query.range) {
			for (let i = query.range.at(0) || 0; i < (query.range.at(1) || -1) + 1; i++) {
				items.push(adhyaya[i]);
			}
		}
		return json(items);
	} else return error(404, `Adhyaya ${data.params.adhyaya} does not exist.`);
}
