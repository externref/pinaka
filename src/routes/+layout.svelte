<script lang="ts">
  import "../app.css"
</script>

<nav class="samarkanfont pl-5 py-1 text-black bg-orange-300" style="font-size: xx-large;" >
<a href=".">pinaka</a>
</nav>

<div class="m-4 flex flex-col min-h-screen">
	<slot />
</div>


<footer class="mt-auto footer bg-gray-900 text-gray-700 border-t border-black font-mono pb-8" style="font-size: smaller;">

	<div class="mt-8 mb-2 flex justify-center" style="font-size: 15px;">
	<a href="https://github.com/externref/pinaka"> <i class="bi bi-github"></i> Github</a>&nbsp|&nbsp
		<a href="https://externref.github.io/pinaka"><i class="bi bi-book-half"></i> API Docs</a>&nbsp|&nbsp
		<a href="https://discord.gg/MsX7FztFBK"><i class="bi bi-discord"></i> Discord</a> 
	</div>
	<div class="flex justify-center text-gray-700 my-2" >
		Copyright 2023-current, <a href="https://github.com/externref" class="text-gray-600"
			>&VeryThinSpace;externref</a
		>
	</div>
</footer>