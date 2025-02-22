import jwt from 'jsonwebtoken'
import {config} from "dotenv";
config({ path: "../../.env" });
import { Request, Response, NextFunction } from 'express';
import db from "../../db";

interface JwtPayload {
    username: string;
    userid: string;
}
export const jwtAuth = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const token:string | string[] | undefined = req.headers.authorization?.split(" ")[1];
        if(process.env['JWT_SECRET']&&typeof token==="string") {
            const secret: string = process.env['JWT_SECRET']!
            const decoded= jwt.verify(token, secret) as JwtPayload;

            req.body.username = decoded.username
            req.body.user_id = decoded.userid

            const checkIfUserExists=await db.query('SELECT * FROM "user" where "user_id"=($1)',[req.body.user_id])

            if (checkIfUserExists.rowCount==1){
                next();
            }else{
                return res.status(403).send({"error":"user not logged in"})
            }
        }
    } catch {
        res.statusCode = 403;
        return res.send();
        // res.json(errorHandler(res.statusCode));
        // next();
    }
};

