const express = require("express");
const router = express.Router();

// Controllers
const CarController = require("../controllers/carController");

// Middlewares
const auth = require("../middlewares/auth");
const role = require("../middlewares/identifyRole");

// Routes
router.get("/list-available", auth, CarController.available_list);
router.get("/list", auth, role.isAdmin, CarController.list);
router.get(
  "/list-with_deleted",
  auth,
  role.isAdmin,
  CarController.list_withDeleted
);
router.post("/store", auth, role.isAdmin, CarController.store);
router.put("/update/:id", auth, role.isAdmin, CarController.update);
router.delete("/destroy/:id", auth, role.isAdmin, CarController.destroy);

module.exports = router;
