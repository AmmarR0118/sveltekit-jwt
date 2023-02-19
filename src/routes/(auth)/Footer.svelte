<script lang="ts">
	import { goto } from '$app/navigation';

	export let type: 'submit' | 'button';
	export let to: string;
	export let label: string;
</script>

<p class="text-sm font-light text-gray-500">
	<slot />
	<button
		{type}
		class="font-medium text-green-600 hover:underline"
		on:click={type === 'button' ? () => goto(to) : () => {}}
	>
		{label}
	</button>
</p>
