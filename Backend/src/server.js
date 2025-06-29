import app from "./app.js";
import connectDB from "./data/db.js";
connectDB();
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV !== "production") {
  console.log(`Server running on http://localhost:${PORT}`);
}
});