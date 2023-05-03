const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/UserController");

// Middlewares
const auth = require("../middlewares/auth");
const role = require("../middlewares/identifyRole");

// Routes
router.get("/get-current-user", auth, UserController.currentUser);
router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);
router.post("/add-admin", auth, role.isSuperAdmin, UserController.addAdmin);

module.exports = router;
