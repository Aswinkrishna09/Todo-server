import userRoutes from "./routes/userRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
const app = express();
const port = 5000;
dotenv.config();
connectDB();
app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
