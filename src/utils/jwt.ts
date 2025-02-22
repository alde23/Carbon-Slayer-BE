import jwt from "jsonwebtoken";
import {config} from "dotenv";
config({ path: "../../.env" });

export const makeToken=(username:string, user_id:string)=>{
    if(process.env['JWT_SECRET']){
        const secret:string=process.env['JWT_SECRET']
        const token = jwt.sign({ username, userid: user_id }, secret, {
            expiresIn: "1209600s",
        });
        return token;
    }
}
export const makeAdminToken=(username:string, user_id:string)=>{
    if(process.env['JWT_SECRET']){
        const secret:string=process.env['JWT_SECRET']!
        const token = jwt.sign({ username, userid: user_id ,role: "admin"}, secret, {
            expiresIn: "1209600s",
        });
        return token;
    }
}