import { RequestHandler } from 'express'
import db from "../../../db";

const addFriend : RequestHandler = async (req, res) => {
    try{
        const friendUsername=req.body.friendUsername
        const userId=req.body.user_id

        const checkFriendExists=await db.query('SELECT "user_id" FROM "user" WHERE username=$1',[friendUsername])
        if(checkFriendExists.rowCount==0){
            return res.status(409).send({
                "error":"User does not exist"
            })
        }
        const friendId=checkFriendExists.rows[0].user_id
        console.log(friendId)
        const checkFriendIsFriend=await db.query('SELECT * FROM "friend_relation" WHERE "user"=$1 AND "friend"=$2',
            [userId,friendId])

        console.log(checkFriendIsFriend.rows[0])
        if(checkFriendIsFriend.rowCount!=0){
            return res.status(400).send({"error":"User is already added as friend"})
        }else{
            const addFriend=await db.query('INSERT INTO friend_relation ("user","friend") VALUES ($1,$2)',[userId,friendId])
            return res.status(200).send({
                "success":"Friend added successfully"
            })
        }
    }catch (e) {
        return res.status(407).send({
            "error":"error"
        })
    }
}

export default addFriend