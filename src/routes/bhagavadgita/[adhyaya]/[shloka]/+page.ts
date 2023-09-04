import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(`/api/bhagavadgita/${params.adhyaya}/${params.shloka}`);
	const item = await res.json();

	return item;
};
