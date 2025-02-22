import { RequestHandler } from 'express'
import {hashPassword, unHashPassword} from "../../utils/passwordGeneration";
import {makeAdminToken, makeToken} from "../../utils/jwt";
import db from "../../../db";

const adminLogin : RequestHandler = async (req, res) => {
    try {
        const username=req.body.username
        const password=req.body.password


        const adminLogin = await db.query(
            'SELECT * FROM "user" WHERE username = $1 AND role = $2',
            [username, 'admin']
        );
        const hashedPassword: string = adminLogin.rows[0].hashed_pw
        const user_id:string=adminLogin.rows[0].user_id
        const salt: string = hashedPassword.slice(-128)
        if (hashedPassword== unHashPassword(password, salt)) {
            const jwtToken=makeAdminToken(username,user_id)
            return res.status(200).send({"message":"Login successful","jwt":jwtToken})
        } else {
            res.statusCode = 422
            return res.json({"message":"Wrong password"}).send()
        }
    }catch (e) {

    }
    return res.send({"error":"error"})
}

export default adminLogin