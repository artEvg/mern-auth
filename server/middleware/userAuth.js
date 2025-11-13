import jwt from "jsonwebtoken"

const userAuth = async (req, res, next) => {
	const { token } = req.cookies
	if (!token) {
		// return res.status(401).json({
		// 	success: false,
		// 	message: "Вы не авторизованы. Пожалуйста, войдите в аккаунт снова",
		// })
	}
	try {
		const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

		if (tokenDecode.id) {
			req.userId = tokenDecode.id
		} else {
			// return res.status(401).json({
			// 	success: false,
			// 	message: "Вы не авторизованы. Пожалуйста, войдите в аккаунт снова",
			// })
		}
		next()
	} catch (error) {
		// return res.status(401).json({ success: false, message: error.message })
	}
}

export default userAuth
