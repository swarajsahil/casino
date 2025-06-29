import express from "express";
import { upload } from "../middlewares/multer.js";
import { addCasino, updateCasino, allCasino, deleteCasino, getCasinoById } from "../controllers/liveCasino.js";

const router = express.Router();

router.get("/casinos", allCasino);
router.get("/casinos/:id", getCasinoById);
router.post("/newCasino", upload.single("image"), addCasino);
router
    .route("/casinos/:id")
    .put(upload.single("image"), updateCasino)
    .delete(deleteCasino);

export default router;