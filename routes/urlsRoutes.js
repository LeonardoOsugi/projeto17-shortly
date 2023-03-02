import {Router} from "express";
import { tokenExist } from "../middleware/validateToken.js";
import { validateSchemas } from "../middleware/validateSchemas.js";
import { shortSchema } from "../models/schemas.js";
import { postUrlShort } from "../controller/urlsController.js";

const router  = Router();

router.post("/urls/shorten", tokenExist, validateSchemas(shortSchema), postUrlShort);
router.get("/urls/:id");
router.get("/urls/open/:shortUrl");
router.delete("/urls/:id");

export default router;