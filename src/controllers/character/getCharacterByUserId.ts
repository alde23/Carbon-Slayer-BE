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
    }catch (e) {

    }
}

export default getCharacterByUserId