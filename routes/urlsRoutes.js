import {Router} from "express";
import { validateSchemas } from "../middleware/validateSchemas.js";
import { shortSchema } from "../models/schemas.js";
import { postUrlShort } from "../controller/urlsController.js";
import { getShortId } from "../controller/urlsController.js";
import { getRedirect } from "../controller/urlsController.js";
import { deleteUrl } from "../controller/urlsController.js";

const router  = Router();

router.post("/urls/shorten", validateSchemas(shortSchema), postUrlShort);
router.get("/urls/:id", getShortId);
router.get("/urls/open/:shortUrl", getRedirect);
router.delete("/urls/:id", deleteUrl);

export default router;