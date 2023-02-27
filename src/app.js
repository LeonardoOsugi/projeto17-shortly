import express from "express";
import cors from "cors";
import dotenv from  "dotenv";
import usersRoutes from "../routes/usersRoutes.js";
import urlsRoutes from "../routes/urlsRoutes.js";
import usersUrlsRoutes from "../routes/usersUrlsRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRoutes);
app.use(urlsRoutes);
app.use(usersUrlsRoutes);


app.listen(5000, console.log(`runing in port ${5000}`));