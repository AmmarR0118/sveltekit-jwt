<script>
	import '../app.css'
	import { Toaster } from 'svelte-french-toast'
	import { browser } from '$app/environment'
</script>

<slot />

{#if browser}
	<Toaster />
{/if}
