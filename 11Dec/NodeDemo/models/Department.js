var mongoose = require("mongoose");

// Department Schema
const departmentSchema = new mongoose.Schema({
  name: String,
});
const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
