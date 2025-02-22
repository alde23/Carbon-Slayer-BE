import { RequestHandler } from 'express'
import db from "../../../db";
import {generateID} from "../../utils/generateID";

const adminCreateItem : RequestHandler = async (req, res) => {
    try{
        const itemName:string=req.body.itemName
        const itemDescription:string=req.body.itemDescription
        let itemRegion:string=req.body.itemRegion
        const price:number=req.body.price
        const inShop:boolean=req.body.inShop
        let rarity:number=req.body.rarity
        let rarityString;

        if(itemRegion.toLowerCase()=="head"){itemRegion="Head"}
        else if(itemRegion.toLowerCase()=="body"){itemRegion="Body"}
        switch (rarity) {
            case (0):
                rarityString="Common";
                break
            case (1):
                rarityString="Uncommon"
                break
            case (2):
                rarityString="Rare"
                break
            case (3):
                rarityString="Epic"
                break
        }
        const uid=generateID(10)

        const itemEntry = await db.query('INSERT INTO item ("name","description","region","price","in_shop","rarity","item_id") VALUES ($1,$2,$3,$4,$5,$6,$7)',
            [itemName,itemDescription,itemRegion,price,inShop,rarityString,uid])

        return res.status(200).send({"success":"Item entry successful"})
    }catch (e) {
        return res.status(401).send({"error":"error creating items"})
    }
}

export default adminCreateItem