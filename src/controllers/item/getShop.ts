import { RequestHandler } from 'express'
import db from "../../../db";
import {generateID} from "../../utils/generateID";

const getShop : RequestHandler = async (req, res) => {
    try{
        const getShop=await db.query('SELECT * FROM item WHERE in_shop=$1',[true])

        return res.status(200).send({
            "shop":getShop.rows
        })
    }catch (e) {
        return res.status(401).send({"error":"error getting shop items"})
    }
}

export default getShop