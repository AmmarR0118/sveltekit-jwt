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
		const { name, email, ...rest } = await getFormData<Omit<User, 'id' | 'tokens'>>(request)

		const exists = await db.user.count({ where: { email } })
		if (exists) return fail(409, { duplicate: true })

		const password = await argon2.hash(rest.password)
		const { id } = await db.user.create({ data: { name, email, password } })

		const token = generateToken({ id, name, email }, +EXPIRY_TEN_MINUTES)
		const refreshToken = generateToken({ id, name, email }, +EXPIRY_ONE_DAY)

		const options = { httpOnly: true, path: '/' }
		cookies.set('token', token, { ...options, maxAge: +EXPIRY_TEN_MINUTES })
		cookies.set('refreshToken', refreshToken, { ...options, maxAge: +EXPIRY_ONE_DAY })

		throw redirect(302, '/user/dashboard')
	}
}
