const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryController");

// Các route kết nối trực tiếp tới hàm trong categoryController
router.get("/", getCategories);
router.post("/", createCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
