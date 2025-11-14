import express from "express"
import {
	newOrder,
	getSingleOrder,
	getMyOrders,
	getAllOrders,
	updateOrder,
	deleteOrder,
} from "../controllers/orderController.js"
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js"

const router = express.Router()

router.post("/new", isAuthenticatedUser, newOrder)
router.get("/me", isAuthenticatedUser, getMyOrders)
router.get("/:id", isAuthenticatedUser, getSingleOrder)

router.get(
	"/admin/orders",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	getAllOrders
)

router
	.route("/admin/order/:id")
	.put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

export default router
