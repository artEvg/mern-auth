import React, { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AppContext } from "../context/AppContext.jsx"
import { useNavigate } from "react-router-dom"
import "./Orders.css"
import Navbar from "../components/Navbar.jsx"

const Orders = () => {
	const { backendUrl } = useContext(AppContext)
	const [orders, setOrders] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				const { data } = await axios.get(`${backendUrl}/api/order/me`, {
					withCredentials: true,
				})
				if (data.success) {
					setOrders(data.orders)
				}
			} catch (error) {
				console.error("Ошибка загрузки заказов:", error)
			}
		}
		fetchOrders()
	}, [backendUrl])

	return (
		<>
			<Navbar />
			<div className='orders-container p-4 max-w-4xl mx-auto'>
				<h1 className='text-2xl mb-4'>Мои заказы</h1>
				{orders.length === 0 ? (
					<p>Заказы отсутствуют.</p>
				) : (
					<div className='orders-wrapper'>
						<ul>
							{orders.map(order => (
								<li
									key={order._id}
									className='border p-4 mb-2 cursor-pointer hover:bg-gray-100 rounded'
									onClick={() => navigate(`/order/${order._id}`)}>
									<p>
										<strong>Номер заказа:</strong> {order._id}
									</p>
									<p>
										<strong>Дата:</strong>{" "}
										{new Date(order.createdAt).toLocaleDateString()}
									</p>
									<p>
										<strong>Статус:</strong> {order.orderStatus}
									</p>
									<p>
										<strong>Итого:</strong> {order.totalPrice} ₽
									</p>
								</li>
							))}
						</ul>
					</div>
				)}
				<button
					onClick={() => navigate("/")}
					className='back-home-btn'
					style={{
						marginTop: "30px",
						padding: "10px 20px",
						fontSize: "1rem",
						cursor: "pointer",
						backgroundColor: "#007bff",
						color: "#fff",
						border: "none",
						borderRadius: "6px",
						display: "block",
						width: "max-content",
					}}>
					На главную
				</button>
			</div>
		</>
	)
}

export default Orders
