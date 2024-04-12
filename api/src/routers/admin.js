import {Router } from "express";
import { verifyToken } from "../middlewares/verifytoken.js";
import { getResults } from "../controllers/admin.js";

const AdminRouter = Router();

AdminRouter.use('/', verifyToken);

AdminRouter.get('/results', getResults);


export default AdminRouter