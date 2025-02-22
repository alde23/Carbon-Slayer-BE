import { RequestHandler } from 'express'
import {hashPassword, unHashPassword} from "../../utils/passwordGeneration";
import {makeToken} from "../../utils/jwt";
import db from "../../../db";

const userLogin : RequestHandler = async (req, res) => {
    try {
        const username=req.body.username
        const password=req.body.password

        const userEntry = await db.query('SELECT * FROM "user" WHERE username=($1)', [username])
        const hashedPassword: string = userEntry.rows[0].hashed_pw
        const user_id:string=userEntry.rows[0].user_id
        const salt: string = hashedPassword.slice(-128)
        if (hashedPassword== unHashPassword(password, salt)) {
            const jwtToken=makeToken(username,user_id)
            return res.status(200).send({"message":"Login successful","jwt":jwtToken})
        } else {
            res.statusCode = 422
            return res.json({"message":"Wrong password"}).send()
        }
    }catch (e) {

    }
    return res.send({"error":"error"})
}

export default userLogin