import {Router} from "express";
import { getRanking } from "../controller/usersUrlsContoller.js";

const router  = Router();

router.get("/users/me");
router.get("/ranking", getRanking);

export default router;