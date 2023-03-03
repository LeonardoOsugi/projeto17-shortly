import db from "../database/db.js";

export async function getRanking(req, res){

    try{
        const rankeada = await db.query(`SELECT users.id, users.name, COUNT(urls) AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ODER BY "visitCount" DESC LIMIT 10`);

        res.status(200).send(rankeada.rows);
    }catch(err){
        res.status(500).send(err);
    }
}