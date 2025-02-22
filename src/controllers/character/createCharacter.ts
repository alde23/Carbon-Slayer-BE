import { RequestHandler } from 'express'
import db from "../../../db";

const createCharacter : RequestHandler = async (req, res) => {
    try {
        const user_id=req.body.user_id
        const nickname=req.body.nickname

        const checkCharacterExistence=await db.query('SELECT * FROM "character" WHERE "user_id"=$1',[user_id])
        if(checkCharacterExistence.rowCount!=0){
            return res.status(409).send({"error":"User already has character"})
        }

        if(nickname.length<4){
            return res.status(409).send({"error":"nickname too short"})
        }

        const createCharacter =await db.query('INSERT INTO "character" ("user_id","nickname","coins","free_points","attack_points","health_points","agility_points","armor_points") VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[user_id,nickname,100,10,10,10,10,10])

        return res.status(200).send({"success":"Character successfully created"})
    }catch (e) {
        console.log("error")
        return res.status(400).send({"error": "Character not created"})
    }
}

export default createCharacter