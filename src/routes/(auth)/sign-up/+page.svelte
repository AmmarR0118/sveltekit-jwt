<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'
	import Button from '$components/Button.svelte'
	import Input from '$components/Input.svelte'
	import Logo from '$components/Logo.svelte'
	import Footer from '../Footer.svelte'
	import toast from 'svelte-french-toast'
	import type { ActionData } from './$types'

	export let form: ActionData
	let loading = false

	const submit: SubmitFunction = () => {
		loading = true
		return ({ update }) => (update(), (loading = false))
	}

	$: if (form?.duplicate) toast.error('Email already exists')
</script>

<section class="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 h-screen lg:py-0">
	<Logo />
	<div class="w-full bg-white rounded-lg border md:mt-0 sm:max-w-md p-6 sm:p-8 space-y-6">
		<h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
			Sign up
		</h1>
		<form class="space-y-4 md:space-y-6" method="POST" use:enhance={submit}>
			<Input name="name" label="Name" type="name" placeholder="name@company.com" required />
			<Input name="email" label="Email" type="email" placeholder="name@company.com" required />
			<Input name="password" label="Password" type="password" placeholder="••••••••" required />

			<Button type="submit" disabled={loading}>Sign up</Button>
			<Footer type="button" label="Sign In" to="sign-in">Already have an account?</Footer>
		</form>
	</div>
</section>
