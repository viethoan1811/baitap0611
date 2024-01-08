var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var itemsRouter = require("./routes/items");
var authenRouter = require("./routes/authen");

var app = express();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Sử dụng departmentController bên trong một route hoặc middleware, không phải ở cấp độ trên cùng
app.use("/departments", async (req, res, next) => {
  try {
    // Sử dụng các phương thức cho Department
    const departments = await departmentController.getAllDepartments();
    console.log("Tất cả các Phòng ban:", departments);

    const createdDepartment = await departmentController.createDepartment({
      name: "Phòng IT",
    });
    console.log("Tạo Phòng ban:", createdDepartment);

    next(); // Chuyển đến middleware hoặc route handler tiếp theo
  } catch (error) {
    next(error); // Chuyển lỗi tới error handler
  }
});

// Xử lý lỗi 404 và chuyển đến error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Thiết lập locals, chỉ cung cấp lỗi trong môi trường phát triển
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render trang lỗi
  res.status(err.status || 500);
  res.render("error");
});
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/authen", authenRouter);

mongoose.connect("mongodb://127.0.0.1:27017/TestS2");
mongoose.connection.once("open", function () {
  console.log("thanh cong");
});
mongoose.connection.on("error", function () {
  console.log("k thanh cong");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
