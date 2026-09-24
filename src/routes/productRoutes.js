const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

// Công khai cho mọi người xem danh sách & chi tiết sản phẩm
router.get("/", getProducts);
router.get("/:id", getProductById);

// Bắt buộc đăng nhập (protect) VÀ có quyền Admin (adminOnly) mới được Thêm/Sửa/Xóa
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
