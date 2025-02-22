import jwt from 'jsonwebtoken'
import {config} from "dotenv";
config({ path: "../../.env" });
import { Request, Response, NextFunction } from 'express';
import db from "../../db";

interface JwtPayload {
    username: string;
    userid: string;
    role: string;
}
export const adminAuth = async (req:Request, res:Response, next:NextFunction) => {
    try {

        const token:string | string[] | undefined = req.headers.authorization?.split(" ")[1];
        if(process.env['JWT_SECRET']&&typeof token==="string") {
            const secret: string = process.env['JWT_SECRET']!
            const decoded= jwt.verify(token, secret) as JwtPayload;

            req.body.username = decoded.username
            req.body.user_id = decoded.userid

            const checkIfUserIsAdmin=await db.query('SELECT * FROM "user" where "user_id"=($1) AND "role=$2"',[req.body.user_id,'admin'])

            console.log(checkIfUserIsAdmin.rowCount)

            if (checkIfUserIsAdmin.rowCount==1){
                next();
            }else{
                res.status(403).send({"error":"Admin not logged in"})
            }
        }
    } catch {
        res.statusCode = 403;
        res.send();
        // res.json(errorHandler(res.statusCode));
        // next();
    }
};

