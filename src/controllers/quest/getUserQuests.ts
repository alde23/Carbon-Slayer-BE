import { RequestHandler } from 'express'
import db from "../../../db";
import {generateID} from "../../utils/generateID";
import {QueryResult} from "pg";

const getUserQuests : RequestHandler = async (req, res) => {
    try{
        const userId=req.body.user_id

        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        const finalDate= yourDate.toISOString().split('T')[0]

        let getDailyQuests = await db.query(
            'SELECT * FROM quest WHERE user_id = $1 AND type = $2 AND end_date = $3',
            [userId, 'daily', finalDate]
        )
        if(getDailyQuests.rowCount==0){
            const uid=generateID(10)
            const createDailyQuest=await  db.query('INSERT INTO "quest" ("quest_id","name","reward_type","coin_reward","item_reward","completion","progress","goal","end_date","start_date","user_id","type") VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[uid,"Daily","coins",100,null,false,0,4000,finalDate,finalDate,userId,"daily"])
        }
        const getQuests=await db.query('SELECT * FROM "quest" WHERE "user_id"=$1',[userId])
        return res.status(200).send({"quests":getQuests.rows})
    }catch (e) {
        return res.status(401).send({"error":"error fetching items"})
    }
}

export default getUserQuests