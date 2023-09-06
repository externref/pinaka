<script lang="ts">
	import { page } from "$app/stores";
    import adhyayaData from "$lib/gita";
    import {adhyayaNames} from "$lib/gita"
	import type { GitaShloka } from "$lib/$gita";
    let currentAdhyaya = ($page.url.pathname.split("/").at(-1)||1).toString() as keyof typeof adhyayaData
    let shlokas: GitaShloka[] = []
    Object.entries(adhyayaData[currentAdhyaya].at(1) || {}).forEach(
        (data, _: number) => {

            shlokas.push(data.at(1) as GitaShloka)
        }
    )
    
</script>
<div style="font-size: large;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">
    Adhyaya: {adhyayaNames.at(parseInt(currentAdhyaya)-1)?.at(0)} ({adhyayaNames.at(parseInt(currentAdhyaya)-1)?.at(1)})
</div><hr class="my-2">
<div>
    <ul style="font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;" ><u>Navigate to Shloka</u></ul>
    {#each shlokas as shloka}
    <li style="font-size: small;">
        <a href="/bhagavadgita/{currentAdhyaya}/{shloka.shloka}"  class="hover:bg-orange-500 rounded px-2">
            Shloka {shloka.shloka.toString().padStart(2, "0")}: {shloka.original.split("।").at(0)}....... 
        </a><br>
    </li>
    {/each}
</div>