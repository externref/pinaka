<script lang="ts">
	import { addNewlines } from "$lib";
	import type { GitaShloka } from "$lib/$gita";
	export let data: GitaShloka;
    
</script>

<svelte:head>
    <title>pinaka/bhagavadgita/{data.adhyaya}/{data.shloka}</title>
    <meta content="pinaka/bhagavadgita/{data.adhyaya}/{data.shloka}" property="og:title" />
    <meta
      content="in-progress API supporting query of sanatana texts.&#x0A;Shrimad BhagavadGita (श्रीमद् भगवद्गीता)"
      property="og:description"
    />
    <meta content="/" property="og:url" />
    <meta content="https://i.imgur.com/v39JIYs.png" property="og:image" />
    <meta content="#F17921" data-react-helmet="true" name="theme-color" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<style>
    .shloka_header {
        font-size: x-large;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    }
</style>

<div class="flex items-center justify-center">
    <div class="mx-auto">
        <div class="shloka_header my-2">Adhyaya: {data.adhyaya}, Shloka: {data.shloka}</div><hr> <br>
        <b>{@html data.original.replace("\n", `<br>`)}</b><br><br>
        {@html addNewlines(data.romanised)}<br><br><hr><br>
        <b style="font-size: large;"><u>Translations</u></b><br><br>
        {@html data.hindi.replace("\n", `<br>`)}
    </div>
    
</div>

