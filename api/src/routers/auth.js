import { Router } from "express";

import { createUser, loginUser } from "../controllers/user.js";

const AuthRouter = Router();

AuthRouter.post("/register", createUser);

AuthRouter.post("/login", loginUser);

export default AuthRouter;


