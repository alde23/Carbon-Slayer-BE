import { RequestHandler } from 'express'
import db from "../../../db";

const equipItem : RequestHandler = async (req, res) => {
    try{
        const userId=req.body.user_id
        const itemId=req.body.itemId

        const unequipItemInRegion=db.query('UPDATE item_ownership \n' +
            'SET equipped = FALSE \n' +
            'WHERE user_id = $1 \n' +
            'AND item_id IN (\n' +
            '    SELECT item_id FROM item WHERE region = (\n' +
            '        SELECT region FROM item WHERE item_id = $2\n' +
            '    )\n' +
            ')',[userId,itemId])
        const equipItem=db.query('UPDATE item_ownership \n' +
            'SET equipped = TRUE \n' +
            'WHERE user_id = $1 AND item_id = $2;',[userId,itemId])

        return res.status(200).send({"success":"Item equipped successfully"})
    }catch (e) {
        return res.status(401).send({"error":"error fetching items"})
    }
}

export default equipItem