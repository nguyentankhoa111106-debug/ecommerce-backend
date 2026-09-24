const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// [POST] /api/auth/register - Đăng ký
router.post("/register", register);

// [POST] /api/auth/login - Đăng nhập
router.post("/login", login);

// [GET] /api/auth/me - Xem thông tin tài khoản hiện tại (Yêu cầu có Token)
router.get("/me", protect, getMe);

module.exports = router;
