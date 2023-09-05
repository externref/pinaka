<script lang="ts">
	import { addNewlines } from "$lib";
	import type { GitaShloka } from "$lib/$gita";
	export let data: GitaShloka;
    
</script>
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

