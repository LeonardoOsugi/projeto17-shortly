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
};

export async function getShortId(req, res){
    const{id} = req.params;

    try{
        const urlExist = await db.query(`SELECT id,"shortUrl", url  FROM urls WHERE id = $1`,[id]);
        if(urlExist.rowCount === 0 || !urlExist){
            return res.sendStatus(404);
        };

        res.status(200).send(urlExist.rows[0]);
    }catch(err){
        res.status(500).send(err);
    }
};

export async function getRedirect(req, res){
    const {shortUrl} = req.params;
    try{
        
        const link = await db.query(`SELECT * FROM urls WHERE "shortUrl" = $1`, [shortUrl]);

        const sessoes = await db.query(`SELECT * FROM sessions WHERE id = $1`, [link.rows[0].id]);


        if(link.rowCount === 0 || sessoes.rowCount === 0){
            return res.sendStatus(404);
        };

        await db.query(`UPDATE urls SET "visitCount" = $1 WHERE id = $2`, [link.rows[0].visitCount + 1, link.rows[0].id]);

        res.redirect(link.rows[0].url);

    }catch(err){
        res.status(500).send(err);
    }
}