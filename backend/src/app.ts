import express from "express";
import cors from "cors";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/error.middleware";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.use(globalErrorHandler); 

export default app;
