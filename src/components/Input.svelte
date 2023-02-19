<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	type $$Props = { label: string; name: string } & HTMLInputAttributes

	export let label: string
	export let name: string
</script>

<div>
	<label for={name} class="block mb-2 text-sm font-medium text-gray-900">
		{label}
	</label>
	<input
		id={name}
		{name}
		{...$$restProps}
		class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-green-600 focus:border-green-600 block w-full p-2.5"
	/>
</div>
