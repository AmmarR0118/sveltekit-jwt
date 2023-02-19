<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements'
	type $$Props = HTMLButtonAttributes
</script>

<button
	{...$$props}
	class="w-full text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center {$$props.class}"
>
	<slot />
</button>
