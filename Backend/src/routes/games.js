import express from "express";
import { upload } from "../middlewares/multer.js";
import {  addGame, allGames, deleteGame, getGameById, updateGame } from "../controllers/games.js";

const router = express.Router();

router.get("/games", allGames);
router.get("/games/:id", getGameById);
router.post("/newGames", upload.single("image"), addGame);
router
    .route("/games/:id")
    .put(upload.single("image"), updateGame)
    .delete(deleteGame);

export default router;