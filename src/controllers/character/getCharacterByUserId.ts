import { RequestHandler } from 'express'
import db from "../../../db";

const getCharacterByUserId : RequestHandler = async (req, res) => {
    try {
        const userId=req.body.user_id
        const targetId=req.body.targetId

        const character=await db.query('SELECT "nickname","attack_points","health_points","agility_points","armor_points" FROM "character" WHERE "user_id"=$1',[targetId])
        const equippedItems=await db.query('SELECT i.*\n' +
            'FROM item i\n' +
            'JOIN item_ownership io ON i.item_id = io.item_id\n' +
            'WHERE io.user_id = $1 AND io.equipped = TRUE;',[userId])
        const characterInfo=character.rows[0]

        if(equippedItems.rowCount==0){
            res.status(200).send({
                "characterInfo":characterInfo
            })
        }else if(equippedItems.rowCount==1){
            const firstItem=equippedItems.rows[0]
            res.status(200).send({
                "characterInfo":characterInfo,
                "firstItem":firstItem
            })
        }else if(equippedItems.rowCount==2){
            const firstItem=equippedItems.rows[0]
            const secondItem=equippedItems.rows[1]
            res.status(200).send({
                "characterInfo":characterInfo,
                "firstItem":firstItem,
                "secondItem":secondItem
            })
        }
        console.log(characterInfo)
        console.log(equippedItems)
    }catch (e) {

    }
}

export default getCharacterByUserId