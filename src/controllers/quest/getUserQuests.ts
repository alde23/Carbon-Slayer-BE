import { RequestHandler } from 'express'
import db from "../../../db";

const getUserQuests : RequestHandler = async (req, res) => {
    try{
        const userId=req.body.user_id

        const getQuests=await db.query('SELECT * FROM "quest" WHERE "user_id"=$1',[userId])

        return res.status(200).send({"quests":getQuests})
    }catch (e) {
        return res.status(401).send({"error":"error fetching items"})
    }
}

export default getUserQuests