import { EXPIRY_ONE_DAY, EXPIRY_TEN_MINUTES } from '$env/static/private'
import { generateToken } from '$lib/server/util'
import { tryCatch } from '$lib/util'
import type { User } from '@prisma/client'
import type { Cookies, Handle } from '@sveltejs/kit'
import jwt, { type JwtPayload } from 'jsonwebtoken'

type JWTPayload = Omit<User, 'password'> & JwtPayload

const getProfile = (cookies: Cookies) =>
	tryCatch(
		() => {
			const oldToken = cookies.get('token')
			if (oldToken) return jwt.verify(oldToken, 'secret') as JWTPayload

			const oldRefreshToken = cookies.get('refreshToken')
			if (!oldRefreshToken) return null

			const { id, name, email } = jwt.verify(oldRefreshToken, 'secret') as JWTPayload
			const payload = { id, name, email }
			const token = generateToken(payload, +EXPIRY_TEN_MINUTES)
			const refreshToken = generateToken(payload, +EXPIRY_ONE_DAY)

			const options = { httpOnly: true, path: '/' }
			cookies.set('token', token, { ...options, maxAge: +EXPIRY_TEN_MINUTES })
			cookies.set('refreshToken', refreshToken, { ...options, maxAge: +EXPIRY_ONE_DAY })

			return payload
		},
		(_) => null
	)

export const handle = (async ({ event, resolve }) => {
	const user = getProfile(event.cookies)
	event.locals.user = user

	const response = await resolve(event)
	return response
}) satisfies Handle
