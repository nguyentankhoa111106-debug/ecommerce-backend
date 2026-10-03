const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Khai báo các đường dẫn API cho Đơn hàng
router.post("/", orderController.createOrder);
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrderById);
router.put("/:id/status", orderController.updateOrderStatus);

module.exports = router;
