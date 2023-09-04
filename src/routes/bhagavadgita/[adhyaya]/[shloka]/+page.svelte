<script lang="ts">
	import type { GitaShloka } from "$lib/$gita";

	export let data: GitaShloka;
    
</script>
<div class="flex items-center justify-center">
    <div class="mx-auto">
        Adhyaya: {data.adhyaya}, Shloka: {data.adhyaya}<hr> <br>
        <b>{@html data.original.replace("\n", `<br>`)}</b>
    </div>
</div>

