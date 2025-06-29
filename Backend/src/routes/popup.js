import express from 'express';
import { upload } from "../middlewares/multer.js";
import { allPopup, newPopup, deletePopup } from "../controllers/popup.js";
const router = express.Router();

router.get("/popup",allPopup);
router.post("/newPopup",upload.single("image"), newPopup);
router.route("/popup").delete(deletePopup);

export default router;