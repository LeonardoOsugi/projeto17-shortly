import db from "../database/db.js";
import { nanoid } from "nanoid";

export async function postUrlShort(req, res){
    const {url} = req.body;
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const shortUrl = nanoid(8);

    try{
        const tokenExist = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
        
        if(!token || tokenExist.rowCount === 0){
            return res.sendStatus(401);
        };
        const userLogado = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        await db.query(`INSERT INTO urls ("userId","shortUrl", url ) VALUES ($1, $2, $3)`, [userLogado.rows[0].id, shortUrl, url]);

        const luffyRebaixado = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);

        const body = {id: luffyRebaixado.rows[0].id, shortUrl}

        res.status(201).send(body);

    }catch(err){
        res.status(500).send(err);
    }
}