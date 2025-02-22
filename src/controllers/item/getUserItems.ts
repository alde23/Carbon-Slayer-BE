import { RequestHandler } from 'express'
import db from "../../../db";

const getUserItems : RequestHandler = async (req, res) => {
    try{
        const userId=req.body.user_id

        const getItems=await db.query('SELECT i.* FROM item i JOIN item_ownership io ON i.item_id = io.item_id WHERE io.user_id = $1',[userId])

        return res.status(200).send({"items":getItems})
    }catch (e) {
        return res.status(401).send({"error":"error fetching items"})
    }
}

export default getUserItems