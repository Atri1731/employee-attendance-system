const express = require("express");

const router = express.Router();

const protect = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");

const {
  getAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/department.controller");


router.get(
  "/",
  protect,
  authorize("admin"),
  getAllDepartments
);


router.post(
  "/",
  protect,
  authorize("admin"),
  createDepartment
);


router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateDepartment
);


router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteDepartment
);


module.exports = router;