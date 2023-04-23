const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const authRoute = require("./Routes/Auth");
const articleRoute = require("./Routes/Article");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/articles", articleRoute);

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Database Online.");
});

app.listen(PORT, () => {
  console.log(`Server Online at ${PORT}`);
});
