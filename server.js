const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

// Routes
const user = require("./routes/user");
const car = require("./routes/car");

app.use(express.json());
app.use(cookieParser());

// Cars Routes
app.use("/api/car", car);

// User Routes
app.use("/api/user", user);

app.listen(port, () => {
  console.log(`Server sudah berjalan, silahkan buka http://localhost:${port}`);
});
