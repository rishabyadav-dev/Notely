const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const express = require("express");
const connectDB = require("./db");

const cors = require("cors");
const noteRoutes = require("./routes/noteroutes");
const userRoutes = require("./routes/userroutes");
const authRoute = require("./routes/auth");
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/verifyuser", authRoute);

app.use("/api/notes", noteRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
