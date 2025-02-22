import { RequestHandler } from 'express'
import db from "../../../db";
import {generateID} from "../../utils/generateID";
import {hashPassword} from "../../utils/passwordGeneration";
import {makeToken} from "../../utils/jwt";

const userSignup : RequestHandler = async (req, res) => {
    let username: string =""
    let password: string =""
    try{
        const json = req.body
        username = json.username
        password = json.password

        if(username.length<6||password.length<6){
            return res.status(400).send({"error":"input too short"})
        }
        const userExists= await db.query('SELECT * FROM "user" WHERE username=($1)',[username])

        if(userExists.rowCount==0){
            const user_id=generateID(10)
            const hashedPW=hashPassword(password)

            const createUser=db.query('INSERT INTO "user" ("username","user_id","hashed_pw") VALUES ($1,$2,$3)',[username,user_id,hashedPW])

            const jwt=makeToken(username,user_id)

            res.status(200).send({"message":"User signup successfull","jwt":jwt})
        }else{
            return res.status(409).send({"error":"user already exists"})
        }

    }catch (e) {
        res.statusCode=400
        res.json({"message":"Bad input"}).send()
    }

}

export default userSignup