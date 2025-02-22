import { RequestHandler } from 'express'
import db from "../../../db";
import {generateID} from "../../utils/generateID";
import item from "../../routes/item";

const buyItem : RequestHandler = async (req, res) => {
    try{
        const itemId=req.body.itemId
        const userId=req.body.user_id
        const getItem=await db.query('SELECT * FROM item WHERE "item_id"=$1',[itemId])
        if(getItem.rowCount==0){
            return res.send(405).send({
                "error":"Item doesnt exist"
            })
        }
        const checkUserHasItem=await db.query('SELECT * FROM item_ownership WHERE "user_id"=$1 AND "item_id"=$2',[userId,itemId])
        if(checkUserHasItem.rowCount!=0){
            return res.status(409).send({
                "error":"User already owns item"
            })
        }
        const itemAvailability=getItem.rows[0].in_shop
        const itemPrice=getItem.rows[0].price
        if(!itemAvailability){
            return res.status(409).send({
                "error":"Item is not on sale"
            })
        }
        const userFundsQuery=await db.query('SELECT coins FROM "character" WHERE "user_id"=$1',[userId])
        const userCoins=userFundsQuery.rows[0].coins
        if(userCoins<itemPrice){
            return res.status(409).send({
                "error":"User funds not enough"
            })
        }
        //survived woohooo
        const giveItem=await db.query('INSERT INTO "item_ownership" ("user_id","item_id","equipped") VALUES ($1,$2,$3)',[userId,itemId,false])
        const reduceCoins=await db.query('UPDATE "character" SET coins=coins-$1 WHERE "user_id"=$2',[itemPrice,userId])
        return res.status(200).send({
            "success":"Item successfully bought"
        })
    }catch (e) {
        return res.status(401).send({"error":"error getting shop items"})
    }
}

export default buyItem