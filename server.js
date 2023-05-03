const express = require("express");
const app = express();
const port = 3000;

// Controllers
const carController = require("./controllers/carController");
const userController = require("./controllers/userController");

// Middlewares
const auth = require("./middlewares/auth");
const role = require("./middlewares/identifyRole");

app.use(express.json());

// Cars Routes
app.get("/api/cars-list", auth, role.isAdmin, carController.list);
app.post("/api/cars-store", auth, role.isAdmin, carController.store);
app.put("/api/cars-update/:id", auth, role.isAdmin, carController.update);
app.delete("/api/cars-destroy/:id", auth, role.isAdmin, carController.destroy);

//User Routes
app.get("/api/get-current-user", auth, userController.currentUser);
app.post("/api/sign-up", userController.signUp);
app.post("/api/sign-in", userController.signIn);
app.post("/api/add-admin", auth, role.isSuperAdmin, userController.addAdmin);

app.listen(port, () => {
  console.log(`Server sudah berjalan, silahkan buka http://localhost:${port}`);
});
