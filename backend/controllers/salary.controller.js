const User = require("../models/user.model");

// ===============================
// ADMIN: UPDATE EMPLOYEE SALARY
// ===============================
const updateSalary = async (req, res) => {
  try {
    const {id} = req.params;
    const {salary} = req.body;

    if (salary === undefined || salary === null || salary === "") {
      return res.status(400).json({
        message: "Salary is required",
      });
    }

    const salaryAmount = Number(salary);

    if (isNaN(salaryAmount)) {
      return res.status(400).json({
        message: "Salary must be a number",
      });
    }

    if (salaryAmount < 0) {
      return res.status(400).json({
        message: "Salary cannot be negative",
      });
    }

    const employee = await User.findOne({
      _id: id,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    employee.salary = salaryAmount;

    await employee.save();

    res.status(200).json({
      message: "Salary updated successfully",
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        salary: employee.salary,
      },
    });
  } catch (error) {
    console.error("Update salary error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// GET EMPLOYEE SALARY
// ADMIN + EMPLOYEE
// ===============================
const getEmployeeSalary = async (req, res) => {
  try {
    const {id} = req.params;

    const employee = await User.findOne({
      _id: id,
      role: "employee",
    }).select("employeeId name salary");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Salary fetched successfully",
      employee,
    });
  } catch (error) {
    console.error("Get salary error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// ===============================
// EMPLOYEE: GET OWN SALARY
// ===============================
const getMySalary = async (req, res) => {
  try {
    const employee = await User.findById(req.user.id).select(
      "employeeId name salary"
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Salary fetched successfully",
      employee,
    });
  } catch (error) {
    console.error("Get my salary error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  updateSalary,
  getEmployeeSalary,
  getMySalary,
};