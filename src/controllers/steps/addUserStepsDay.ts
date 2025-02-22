import { RequestHandler } from 'express'
import db from "../../../db";

const addUserStepsDay : RequestHandler = async (req, res) => {
    try {
        const userId=req.body.user_id
        const newSteps=req.body.steps

        let yourDate = new Date()
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset*60*1000))
        const finalDate= yourDate.toISOString().split('T')[0]

        console.log(finalDate)

        const checkToday=await db.query('SELECT * FROM steps WHERE "user_id"=$1 AND "day"=$2',[userId,finalDate])


        if(checkToday.rowCount==0){
            const addNewDay=await db.query('INSERT INTO "steps" ("user_id","day","step_count") VALUES ($1,$2,$3)',[userId,finalDate,newSteps])
            return res.status(200).send({"success":"Added steps successfully"})
        }else{
            const updateDay=await db.query('UPDATE "steps" SET "day"=$1,"step_count"=$2',[finalDate,newSteps])
            return res.status(200).send({"success":"Added steps successfully"})
        }
    }catch (e) {
        return res.status(400).send({"error":"Failed to add steps"})
    }
}

export default addUserStepsDay