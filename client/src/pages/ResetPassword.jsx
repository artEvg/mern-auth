import React, { useContext, useState } from "react"
import { data, useNavigate } from "react-router-dom"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext.jsx"
import axios from "axios"
import { toast } from "react-toastify"

const ResetPassword = () => {
	axios.defaults.withCredentials = true
	const { backendUrl } = useContext(AppContext)
	const navigate = useNavigate()
	const [email, setEmail] = useState("")
	const [newPassword, setNewPassword] = useState("")
	const [isEmailSent, setIsEmailSent] = useState("")
	const [otp, setOtp] = useState(0)
	const [isOtpSubmited, setIsOtpSubmited] = useState(false)
	const inputRefs = React.useRef([])
	const handleInput = (e, index) => {
		if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
			inputRefs.current[index + 1].focus()
		}
	}
	const handleKeyDown = (e, index) => {
		if (e.key === "Backspace" && e.target.value === "" && index > 0) {
			inputRefs.current[index - 1].focus()
		}
	}
	const handlePaste = e => {
		e.preventDefault()
		const paste = e.clipboardData.getData("text").slice(0, 6)
		const pasteArray = paste.split("")
		pasteArray.forEach((char, idx) => {
			if (inputRefs.current[idx]) {
				inputRefs.current[idx].value = char
			}
		})

		const lastIndex = 5
		if (inputRefs.current[lastIndex]) {
			inputRefs.current[lastIndex].focus()
			inputRefs.current[lastIndex].select()
		}
	}

	const onSubmitEmail = async e => {
		e.preventDefault()
		try {
			const { data } = await axios.post(
				backendUrl + "/api/auth/send-reset-otp",
				{ email }
			)
			data.success ? toast.success(data.message) : toast.error(data.message)
			data.success && setIsEmailSent(true)
		} catch (error) {
			toast.error(error.message)
		}
	}

	const onSubmitOtp = async e => {
		e.preventDefault()
		const otpArray = inputRefs.current.map(e => e.value)
		setOtp(otpArray.join(""))
		setIsOtpSubmited(true)
	}

	const onSubmitNewPassword = async e => {
		e.preventDefault()
		try {
			const { data } = await axios.post(
				backendUrl + "/api/auth/reset-password",
				{ email, otp, newPassword }
			)
			data.success ? toast.success(data.message) : toast.error(data.message)
			data.success && navigate("/login")
		} catch (error) {
			toast.error(error.message)
		}
	}
	return (
		<div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
			<img
				className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer hover:scale-110 transition-all'
				onClick={() => navigate("/")}
				src={assets.logo}
				alt='logo image'
			/>
			{!isEmailSent && (
				<form
					onSubmit={onSubmitEmail}
					className='bg-slate-900 p-8 rounded-lg shadow-lg w-120 text-sm'>
					<h1 className='text-white text-2xl font-semibold text-center mb-4'>
						Сброс Пароля
					</h1>
					<p className='text-center mb-6 text-indigo-300'>
						Введите вашу почту.
					</p>
					<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
						<img
							className='w-3 h-3'
							src={assets.mail_icon}
							alt='Mail icon'
						/>
						<input
							className='bg-transparent w-full outline-none text-white'
							type='email'
							placeholder='Ваша Почта'
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold rounded-full mt-3 transition-all hover:scale-105 cursor-pointer'>
						Отправить
					</button>
				</form>
			)}
			{!isOtpSubmited && isEmailSent && (
				<form
					onSubmit={onSubmitOtp}
					className='bg-slate-900 p-8 rounded-lg shadow-lg w-120 text-sm'>
					<h1 className='text-white text-2xl font-semibold text-center mb-4'>
						Сбросить Пароль
					</h1>
					<p className='text-center mb-6 text-indigo-300'>
						Введите 6-значный код отправленный на вашу почту.
					</p>
					<div
						className='flex justify-between mb-8'
						onPaste={handlePaste}>
						{Array(6)
							.fill(0)
							.map((_, index) => (
								<input
									type='text'
									className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md'
									maxLength='1'
									ref={e => (inputRefs.current[index] = e)}
									onKeyDown={e => handleKeyDown(e, index)}
									onInput={e => handleInput(e, index)}
									key={index}
									required
								/>
							))}
					</div>
					<button
						className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold rounded-full transition-all hover:scale-105 cursor-pointer'
						type='submit'>
						Сменить Пароль
					</button>
				</form>
			)}
			{isOtpSubmited && isEmailSent && (
				<form
					onSubmit={onSubmitNewPassword}
					className='bg-slate-900 p-8 rounded-lg shadow-lg w-120 text-sm'>
					<h1 className='text-white text-2xl font-semibold text-center mb-4'>
						Новый Пароль
					</h1>
					<p className='text-center mb-6 text-indigo-300'>
						Введите ваш новый пароль
					</p>
					<div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
						<img
							className='w-3 h-3'
							src={assets.lock_icon}
							alt='Lock icon'
						/>
						<input
							className='bg-transparent w-full outline-none text-white'
							type='password'
							placeholder='Ваш новый Пароль'
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							required
						/>
					</div>
					<button
						type='submit'
						className='w-full py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-semibold rounded-full mt-3 transition-all hover:scale-105 cursor-pointer'>
						Обновить
					</button>
				</form>
			)}
		</div>
	)
}

export default ResetPassword
