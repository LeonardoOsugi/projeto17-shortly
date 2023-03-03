import db from "../database/db.js";


export async function getUserMe(req, res){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try{
        const tokenExist = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);

        if(!token || tokenExist.rowCount === 0){
            return res.sendStatus(401);
        };

        const linksUser = await db.query(`SELECT users.id, users.name, SUM(urls."visitCount") AS "visitCount" FROM users JOIN urls ON users.id = urls."userId" WHERE urls."userId" = $1 GROUP BY users.id`, [tokenExist.rows[0].userId]);

        const linksUser2 = await db.query(`SELECT urls.id, urls."shortUrl", urls.url, urls."visitCount" FROM urls JOIN users ON urls."userId" = users.id WHERE urls."userId" = $1 GROUP BY urls.id`, [tokenExist.rows[0].userId]);

        const {id, name,visitCount } = linksUser.rows[0]

        const finalmente = {
            id,
            name,
            visitCount,
            shortenedUrls: linksUser2.rows
        }

        res.status(200).send(finalmente);

    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function getRanking(req, res){

    try{
        const rankeada = await db.query(`SELECT users.id, users.name, COUNT(urls.url) AS "linksCount", SUM(urls."visitCount") AS "visitCount" FROM users LEFT JOIN urls ON users.id = urls."userId" GROUP BY users.id ORDER BY "visitCount" DESC LIMIT 10`);

        res.status(200).send(rankeada.rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}