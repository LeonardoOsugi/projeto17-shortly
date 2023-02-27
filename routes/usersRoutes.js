import {Router} from "express";
import { postSinup } from "../controller/usersController.js";
import { postSinin } from "../controller/usersController.js";
import { validateSchemas } from "../middleware/validateSchemas.js";
import { signupSchema } from "../models/schemas.js";
import { signinSchema } from "../models/schemas.js";

const router  = Router();

router.post("/signup",validateSchemas(signupSchema), postSinup);
router.post("/signin",validateSchemas(signinSchema), postSinin);

export default router;