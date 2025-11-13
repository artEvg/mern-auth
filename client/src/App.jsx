import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import EmailVerify from "./pages/EmailVerify"
import ResetPassword from "./pages/ResetPassword"
import { ToastContainer, Slide } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const App = () => {
	return (
		<div>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='colored'
				transition={Slide}
			/>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/login'
					element={<Login />}
				/>
				<Route
					path='/email-verify'
					element={<EmailVerify />}
				/>
				<Route
					path='/reset-password'
					element={<ResetPassword />}
				/>
			</Routes>
		</div>
	)
}

export default App
