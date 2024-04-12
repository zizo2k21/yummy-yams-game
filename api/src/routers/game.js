import { Router } from "express";
import { verifyToken } from "../middlewares/verifytoken.js";
import { playGame } from "../controllers/game.js";

const gameRouter = Router();

//middleware
gameRouter.use('/', verifyToken);

gameRouter.get('/play', playGame)

export default gameRouter

