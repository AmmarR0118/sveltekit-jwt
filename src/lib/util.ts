export const getFormData = async <T>(request: Request) => {
	const formData = await request.formData()
	const data: T = Object.fromEntries(formData.entries() as Iterable<[T, string]>)

	return data
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const tryCatch = <T, U>(func: () => T, errFunc: (err: unknown) => U) => {
	try {
		return func()
	} catch (err) {
		return errFunc(err)
	}
}
