import app from "../src/app.js";
import serverless from "serverless-http";
import connectDB from "../src/data/db.js";

// Connect to DB (make sure env vars are set in Vercel dashboard)
connectDB();

export const handler = serverless(app);