const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      password,
      phone,
      department,
      designation,
      joiningDate,
    } = req.body;

    if (!employeeId || !name || !email || !password) {
      return res.status(400).json({
        message: "Employee ID, name, email and password are required",
      });
    }

    const existingEmployee = await User.findOne({employeeId});

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee ID already exists",
      });
    }

    const existingEmail = await User.findOne({email});

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await User.create({
      employeeId,
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
      joiningDate,
      role: "employee",
      status: "active",
    });

    res.status(201).json({
      message: "Employee created successfully",
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        joiningDate: employee.joiningDate,
        role: employee.role,
        status: employee.status,
      },
    });
  } catch (error) {
    console.error("Create employee error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res) => {
  try {
    const employees = await User.find({role: "employee"})
      .select("-password")
      .sort({createdAt: -1});

    res.status(200).json({
      message: "Employees fetched successfully",
      count: employees.length,
      employees,
    });
  } catch (error) {
    console.error("Get employees error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const {id} = req.params;

    const {
      employeeId,
      name,
      email,
      phone,
      department,
      designation,
      joiningDate,
      status,
    } = req.body;

    // Find employee
    const employee = await User.findOne({
      _id: id,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // Check employee ID if changed
    if (employeeId && employeeId !== employee.employeeId) {
      const existingEmployee = await User.findOne({
        employeeId,
        _id: {$ne: id},
      });

      if (existingEmployee) {
        return res.status(400).json({
          message: "Employee ID already exists",
        });
      }

      employee.employeeId = employeeId;
    }

    // Check email if changed
    if (email && email !== employee.email) {
      const existingEmail = await User.findOne({
        email,
        _id: {$ne: id},
      });

      if (existingEmail) {
        return res.status(400).json({
          message: "Email already registered",
        });
      }

      employee.email = email;
    }

    // Update fields
    if (name) {
      employee.name = name;
    }

    if (phone !== undefined) {
      employee.phone = phone;
    }

    if (department !== undefined) {
      employee.department = department;
    }

    if (designation !== undefined) {
      employee.designation = designation;
    }

    if (joiningDate !== undefined) {
      employee.joiningDate = joiningDate;
    }

    if (status) {
      employee.status = status;
    }

    await employee.save();

    res.status(200).json({
      message: "Employee updated successfully",
      employee: {
        id: employee._id,
        employeeId: employee.employeeId,
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        joiningDate: employee.joiningDate,
        role: employee.role,
        status: employee.status,
      },
    });
  } catch (error) {
    console.error("Update employee error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const {id} = req.params;

    const employee = await User.findOne({
      _id: id,
      role: "employee",
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete employee error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// module.exports = {
//   createEmployee,
//   getAllEmployees,
//   updateEmployee,
//   deleteEmployee,
//   getMyProfile,
//   updateMyProfile,
// };

// Get logged-in employee profile
const getMyProfile = async (req, res) => {
  try {
    const employee = await User.findById(req.user.id).select(
      "-password"
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Profile fetched successfully",
      employee,
    });
  } catch (error) {
    console.error("Get my profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Update logged-in employee profile
const updateMyProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const employee = await User.findById(req.user.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    if (name !== undefined) {
      employee.name = name;
    }

    if (email !== undefined) {
      employee.email = email;
    }

    if (phone !== undefined) {
      employee.phone = phone;
    }

    await employee.save();

    res.status(200).json({
      message: "Profile updated successfully",
      employee: {
        ...employee.toObject(),
        password: undefined,
      },
    });
  } catch (error) {
    console.error("Update my profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getMyProfile,
  updateMyProfile,
};