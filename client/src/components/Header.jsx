import React, { useContext } from "react"
import { assets } from "../assets/assets"
import { AppContext } from "../context/AppContext.jsx"

const Header = () => {
	const { userData } = useContext(AppContext)
	return (
		<div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
			<img
				className='w-36 h-36 rounded-full mb-6 '
				src={assets.header_img}
				alt='header image'
			/>
			<h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
				Привет, {userData ? userData.name : "Разработчик"}!
				<img
					className='w-8 aspect-square'
					src={assets.hand_wave}
					alt='image'
				/>
			</h1>
			<h2 className='text-3xl sm:text-5xl font-semibold mb-4'>
				Добро Пожаловать
			</h2>
			<p className='mb-8 max-w-md'>
				Давайте начнём с краткого обзора продукта, и я быстро научу вас им
				пользоваться!
			</p>
			<button className='border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all hover:scale-110 cursor-pointer'>
				Начать
			</button>
		</div>
	)
}

export default Header
