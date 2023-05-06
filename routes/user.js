const express = require("express");
const router = express.Router();

// Controllers
const UserController = require("../controllers/userController");

// Middlewares
const auth = require("../middlewares/auth");
const role = require("../middlewares/identifyRole");

// Routes
router.get("/list-users", auth, UserController.list)
router.get("/get-current-user", auth, UserController.currentUser);
router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);
router.post("/add-admin", auth, role.isSuperAdmin, UserController.addAdmin);
router.get("/refresh-token", UserController.refreshUserToken);
router.delete("/sign-out", UserController.signOut);

module.exports = router;
