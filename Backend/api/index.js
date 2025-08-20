import app from "../src/app.js";
import connectDB from "../src/data/db.js";

// Connect to DB (make sure env vars are set in Vercel dashboard)
connectDB();

export default function handler(req, res) {
  return app(req, res);
}