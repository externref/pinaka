<script lang="ts">
	import { page } from '$app/stores';
	import { getAdhyaya } from 'gita';
	import type { Adhyaya, ShlokaDict } from 'gita';
	let adhyaya = getAdhyaya(parseInt($page.url.pathname.split('/').at(-1) || '1')) as Adhyaya;
	let shlokas: ShlokaDict[] = [];
	for (let i = 1; i < parseInt(adhyaya.numberOfShlokas.toString()); i++) {
		// prettier-ignore
		// @ts-ignore
		shlokas.push(adhyaya[i]?adhyaya[i].dict():{
            shloka: i,
            adhyaya: adhyaya.adhyaya,
            original: "To be added."
        })
	}
</script>

<div
	style="font-size: large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;"
>
	Adhyaya {adhyaya.adhyaya}: {adhyaya.name.original} ({adhyaya.name.romanised})
</div>
<hr class="my-2" />
<div>
	<ul style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
		<u>Navigate to Shloka</u>
	</ul>
	{#each shlokas as shloka}
		<li style="font-size: small;">
			<a
				href="/bhagavadgita/{adhyaya.adhyaya}/{shloka.shloka}"
				class="hover:bg-orange-500 rounded px-2"
			>
				Shloka {shloka.shloka.toString().padStart(2, '0')}: {shloka.original
					.split('।')
					.at(0)}.......
			</a><br />
		</li>
	{/each}
</div>
