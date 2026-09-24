const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Họ và tên không được để trống"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email không được để trống"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Mật khẩu không được để trống"],
      minlength: [6, "Mật khẩu phải từ 6 ký tự trở lên"],
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true, // Tự động tạo 2 trường createdAt và updatedAt
  },
);

// 1. Tự động mã hóa mật khẩu bằng bcryptjs trước khi lưu vào CSDL (Pre-save hook)
userSchema.pre("save", async function (next) {
  // Nếu mật khẩu không bị thay đổi (vd: khi update thông tin khác), bỏ qua mã hóa
  if (!this.isModified("password")) return next();

  // Tạo chuỗi Salt ngẫu nhiên và băm mật khẩu
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 2. Phương thức kiểm tra so khớp mật khẩu khi đăng nhập
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
