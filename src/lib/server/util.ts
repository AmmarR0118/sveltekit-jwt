import jwt from 'jsonwebtoken'

export const generateToken = <T extends object>(payload: T, expiresIn: number) =>
	jwt.sign(payload, 'secret', { expiresIn })
