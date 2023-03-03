import {Router} from "express";
import { getRanking } from "../controller/usersUrlsContoller.js";
import { getUserMe } from "../controller/usersUrlsContoller.js";
const router  = Router();

router.get("/users/me", getUserMe);
router.get("/ranking", getRanking);

export default router;