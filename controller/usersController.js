import db from "../database/db.js";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

export async function postSinup(req, res){
    const {name, email, password} = req.body;

    const emailExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if(emailExist.rowCount !== 0){
        return res.sendStatus(409);
    };

    try{
        const hashPassword = bcrypt.hashSync(password, 10);
        await db.query(`INSERT INTO users (name, email, password, "confirmPassword") VALUES($1, $2, $3, $4)`, [name, email, hashPassword, hashPassword]);
        
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err);
    }
};

export async function postSinin(req, res){
    const {password, email} = req.body;
    const token = uuidv4();
    try{
        const userExist = await db.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if(userExist.rowCount !== 0 && bcrypt.compareSync(password, userExist.rows[0].password)){
            
            await db.query(`INSERT INTO sessions (token, "userId") VALUES($1, $2)`, [token, userExist.rows[0].id]);
            
            // const envToken = await db.query(`SELECT * FROM sessions WHERE token = $1`,[token]);
            res.status(200).send({token});
        }else{
            return res.sendStatus(401);
        }
        
    }catch(err){
        res.status(500).send(err);
    }
};