const express = require("express");
const app = express();
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

dotEnv.config();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected Successfully");
  })
  .catch((error) => console.error("Error Occurs", error));

app.use("/product", productRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to RESTful APIs");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
