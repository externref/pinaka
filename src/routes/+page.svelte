<script lang="ts">
	const pages = {
		'Shrimad BhagavadGita (श्रीमद् भगवद्गीता)': '/bhagavadgita'
	};
</script>

<svelte:head>
	<title>pinaka</title>
	<meta content="pinaka" property="og:title" />
	<meta content="in-progress API supporting query of sanatana texts." property="og:description" />
	<meta content="/" property="og:url" />
	<meta content="https://i.imgur.com/SL2Q5Tz.png" property="og:image" />
	<meta content="#F17921" data-react-helmet="true" name="theme-color" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="font-mono" style="font-size: x-large;">Available Content</div>
<hr />
<br />
<div>
	{#each Object.entries(pages) as [title, pointer]}
		<li>
			<a href={pointer}>{title}</a>
		</li>
	{/each}
</div>
