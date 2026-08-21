const Department = require("../models/department.model");
const User = require("../models/user.model");

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({
      createdAt: -1,
    });

    const departmentsWithEmployees = await Promise.all(
      departments.map(async (department) => {
        const employeeCount = await User.countDocuments({
          department: department.name,
        });

        return {
          ...department.toObject(),
          employeeCount,
        };
      })
    );

    res.status(200).json({
      message: "Departments fetched successfully",
      departments: departmentsWithEmployees,
    });
  } catch (error) {
    console.error("Get departments error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Add department
const createDepartment = async (req, res) => {
  try {
    const { departmentId, name } = req.body;

    if (!departmentId || !name) {
      return res.status(400).json({
        message: "Department ID and name are required",
      });
    }

    const existingDepartment = await Department.findOne({
      $or: [
        { departmentId },
        { name },
      ],
    });

    if (existingDepartment) {
      return res.status(400).json({
        message: "Department already exists",
      });
    }

    const department = await Department.create({
      departmentId,
      name,
    });

    res.status(201).json({
      message: "Department created successfully",
      department,
    });
  } catch (error) {
    console.error("Create department error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Update department
const updateDepartment = async (req, res) => {
  try {
    const { name, status } = req.body;

    const department = await Department.findById(
      req.params.id
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    if (name !== undefined) {
      department.name = name;
    }

    if (status !== undefined) {
      department.status = status;
    }

    await department.save();

    res.status(200).json({
      message: "Department updated successfully",
      department,
    });
  } catch (error) {
    console.error("Update department error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// Delete department
const deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findById(
      req.params.id
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    const employeeCount = await User.countDocuments({
      department: department.name,
    });

    if (employeeCount > 0) {
      return res.status(400).json({
        message:
          "Cannot delete department because employees are assigned to it",
      });
    }

    await department.deleteOne();

    res.status(200).json({
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Delete department error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


module.exports = {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};