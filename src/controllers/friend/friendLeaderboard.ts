import { RequestHandler } from 'express'
import db from "../../../db";

const friendLeaderboard : RequestHandler = async (req, res) => {
    try{
        const userId=req.body.user_id

        const createLeaderboard = await db.query('SELECT u.user_id, u.username, (c.health_points + c.attack_points + c.agility_points + c.armor_points + c.free_points) AS total_stats FROM "user" u JOIN character c ON u.user_id = c.user_id WHERE u.user_id IN (SELECT CASE WHEN fr."user" = $1 THEN fr.friend ELSE fr."user" END FROM friend_relation fr WHERE fr."user" = $1 OR fr.friend = $1) ORDER BY total_stats DESC', [userId]);

        return res.status(200).send({
            "result":createLeaderboard
        })
    }catch (e) {
        return res.status(407).send({
            "error":"error"
        })
    }
}

export default friendLeaderboard