
<svelte:head>
    <title>pinaka/bhagavadgita</title>
    <meta content="pinaka/bhagavadgita" property="og:title" />
    <meta
      content="in-progress API supporting query of sanatana texts.<br>Shrimad BhagavadGita (श्रीमद् भगवद्गीता)"
      property="og:description"
    />
    <meta content="/" property="og:url" />
    <meta content="https://i.imgur.com/v39JIYs.png" property="og:image" />
    <meta content="#F17921" data-react-helmet="true" name="theme-color" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<script lang="ts">
    import {adhyayaNames} from "$lib/gita"
</script>

<div class="flex items-center justify-center">
    <img class="mx-auto" src="/gita_banner_text.png" alt="gita banner" width="700px">
</div>
<div class="mx-5 mt-9">
<i><b>"Bhagavad Gita"</b></i> which translates to "the song of God" is a part of one of the
two well-known <i>itihasas <b>"Mahabharata"</b></i
>. Occupying chapters 23 to 40 of the sixth book of <i>Mahabharata</i>, it is composed in
the form of a dialogue between <i>Arjuna</i>, the prince who was preoccupied with morals
and emotional dilemma about the despair, violence, and the number of deaths this
<i>Dharma yudha</i> between the <i>Pandavas</i> and <i>Kauravas</i> is going to cost, and
<i>Shri Krishna</i>, the avatar ( incarnation ) of god <i>Vishnu</i> who counsels him to
fulfill his <i>Kshatriya Dharma</i> ( duty of a warrior ) to uphold <i>Dharma</i> through
<i>Karma</i>.<hr class="my-3">
<div >
    <ul style="font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;">Jump to Adhyaya:</ul>
    {#each adhyayaNames as adhyaya, index}
    <li>
        <a class="hover:bg-orange-500 w-max" href="bhagavadgita/{index+1}">
            [Adhyaya {(index+1).toString().padStart(2, "0")}]: {adhyaya.at(0)} ({adhyaya.at(1)})
        </a> 
    </li>
    {/each}
</div>
</div>
