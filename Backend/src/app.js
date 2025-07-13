import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import BlogRouter from "./routes/blog.js";
import LiveCasinoRouter from "./routes/liveCasino.js";
import GameRouter from "./routes/games.js";
import ReviewRouter from "./routes/review.js";
import AdminRouter from "./routes/user.js";
import PopupRouter from "./routes/popup.js";
import FaqRouter from "./routes/faq.js";
import  {errorMiddleware } from "./middlewares/error.js";

const app = express();

dotenv.config({
    path: './.env'
})

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173","http://localhost:5174","https://casino-frontend.onrender.com"],
  methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS", // ✅ Ensure PATCH & OPTIONS are allowed
  allowedHeaders: "Content-Type, Authorization , Accept",
  credentials: true,
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

app.use(errorMiddleware);
// Routes
app.use("/api",BlogRouter);
app.use("/api",LiveCasinoRouter);
app.use("/api",GameRouter);
app.use("/api", ReviewRouter);
app.use("/api", PopupRouter);
app.use("/api", FaqRouter);
app.use("/admin", AdminRouter);
app.use("/public/uploads", express.static("public/uploads"));

export default app;