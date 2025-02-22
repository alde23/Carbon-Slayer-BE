import { RequestHandler } from 'express'
import db from "../../../db";

const adminCreateItem : RequestHandler = async (req, res) => {
    try{


        return res.status(200).send({"items":""})
    }catch (e) {
        return res.status(401).send({"error":"error fetching items"})
    }
}

export default adminCreateItem