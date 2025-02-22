import { RequestHandler } from 'express'
import db from "../../../db";
import {generateID} from "../../utils/generateID";

const adminDeleteItem : RequestHandler = async (req, res) => {
    try{
        const itemId=req.body.itemId

        const deleteItem=await db.query('DELETE FROM item WHERE item_id=$1',[itemId])

        return res.status(200).send({"success":"Item deleted"})
    }catch (e) {
        return res.status(401).send({"error":"error deleting items"})
    }
}

export default adminDeleteItem