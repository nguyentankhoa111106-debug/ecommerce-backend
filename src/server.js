require("dotenv").config(); // Nạp biến môi trường từ .env lên đầu tiên
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import các tuyến đường (Routes)
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Kết nối cơ sở dữ liệu MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Khai báo các Routes API
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Route kiểm tra trạng thái Server
app.get("/", (req, res) => {
  res.json({
    message: "API E-commerce LHU Backend - Tuần 04 đang hoạt động bình thường!",
  });
});

// Middleware xử lý Route không tồn tại (404)
app.use((req, res) => {
  res
    .status(404)
    .json({ success: false, message: "Đường dẫn API không tồn tại!" });
});

// Chạy Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
});
