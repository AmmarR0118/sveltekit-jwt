import { EXPIRY_ONE_DAY, EXPIRY_TEN_MINUTES } from '$env/static/private'
import { db } from '$lib/server/db'
import { generateToken } from '$lib/server/util'
import { getFormData } from '$lib/util'
import type { User } from '@prisma/client'
import { fail, redirect } from '@sveltejs/kit'
import argon2 from 'argon2'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const { email, ...rest } = await getFormData<Omit<User, 'id' | 'tokens'>>(request)

		const user = await db.user.findFirst({ where: { email } })
		if (!user) return fail(409, { invalid: true })

		const isCorrect = await argon2.verify(user.password, rest.password)
		if (!isCorrect) return fail(409, { invalid: true })

		const token = generateToken({ id: user.id, name: user.name, email }, +EXPIRY_TEN_MINUTES)
		const refreshToken = generateToken({ id: user.id, name: user.name, email }, +EXPIRY_ONE_DAY)

		const options = { httpOnly: true, path: '/' }
		cookies.set('token', token, { ...options, maxAge: +EXPIRY_TEN_MINUTES })
		cookies.set('refreshToken', refreshToken, { ...options, maxAge: +EXPIRY_ONE_DAY })

		throw redirect(302, '/user/dashboard')
	}
}
