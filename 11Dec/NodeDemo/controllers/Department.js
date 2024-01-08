// controllers.js
const { Department } = require("./models");

const departmentController = {
  getAllDepartments: async () => {
    return await Department.find();
  },

  getDepartmentById: async (departmentId) => {
    return await Department.findById(departmentId);
  },

  createDepartment: async (departmentData) => {
    return await Department.create(departmentData);
  },

  updateDepartment: async (departmentId, newData) => {
    return await Department.findByIdAndUpdate(departmentId, newData, {
      new: true,
    });
  },

  deleteDepartment: async (departmentId) => {
    return await Department.findByIdAndDelete(departmentId);
  },
};

module.exports = { departmentController };
