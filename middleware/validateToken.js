import db from "../database/db.js";
export async function tokenExist(req, res, next){
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer","");
    const tokenExist = await db.query(`SELECT * FROM sessions WHERE token = $1`, [token]);
    console.log(tokenExist.rows[0]);
    console.log(token);
    if(!token || tokenExist.rowCount === 0){
        return res.sendStatus(401);
    };
    next();
};