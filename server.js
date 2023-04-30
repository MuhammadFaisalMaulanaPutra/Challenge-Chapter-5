const express = require("express");
const carController = require("./controllers/carController");
const userController = require("./controllers/userController");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/cars-list", carController.list);
app.post("/cars-store", carController.store);
app.put("/cars-update/:id", carController.update);
app.delete("/cars-destroy/:id", carController.destroy);

app.post("/sign-up", userController.signUp);

app.listen(port, () => {
  console.log(`Server sudah berjalan, silahkan buka http://localhost:${port}`);
});
