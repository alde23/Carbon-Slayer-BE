import { RequestHandler } from 'express'
import db from "../../../db";

const completeQuest : RequestHandler = async (req, res) => {
    try{
        const quest_id=req.body.questId
        const userId=req.body.user_id

        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        const finalDate= yourDate.toISOString().split('T')[0]

        const stepsToday=await db.query('SELECT step_count FROM steps WHERE day=$1 AND user_id=$2',[finalDate,userId])

        const quest=await db.query('SELECT * FROM quest WHERE user_id=$1 AND quest_id=$2',[userId,quest_id])

        if(quest.rows[0].goal<=stepsToday.rows[0].step_count){
            const completeQuest=await db.query('UPDATE quest SET completed=$1, progress=$2 WHERE quest_id=$3',[true,100,quest_id])

            console.log("here41")
            if(quest.rows[0].reward_type=="coins"){
                const coins=quest.rows[0].coin_reward
                const giveCharacterCoins=await db.query('UPDATE character SET coins=coins+$1',[coins])
            }else{
                const item=quest.rows[0].item_reward
                const giveCharacterItem=await db.query('INSERT INTO "item_ownership" ("user_id","item_id","equipped") VALUES ($1,$2,$3)',[userId,item,false])
            }


            return res.status(200).send({"success":"Quest Completed!"})
        }else{
            return res.status(409).send({"error":"Walk more"})

        }

    }catch (e) {
        return res.status(409).send({})
    }
}

export default completeQuest