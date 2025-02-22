import { RequestHandler } from 'express'
import db from "../../../db";

const assignStats : RequestHandler = async (req, res) => {
    try{
        const addHealthPoints=req.body.addHealthPoints
        const addAttackPoints=req.body.addAttackPoints
        const addAgilityPoints=req.body.addAgilityPoints
        const addArmorPoints=req.body.addArmorPoints
        const userId=req.body.user_id

        const checkFreePoints=await db.query('SELECT * FROM "character" WHERE "user_id"=$1',[userId])

        const sumOfAddPoints=addAgilityPoints+addArmorPoints+addAttackPoints+addHealthPoints
        if(checkFreePoints.rows[0].free_points<=sumOfAddPoints){
            const currentHealthPoints=checkFreePoints.rows[0].health_points
            const currentAttackPoints=checkFreePoints.rows[0].attack_points
            const currentAgilityPoints=checkFreePoints.rows[0].agility_points
            const currentArmorPoints=checkFreePoints.rows[0].armor_points
            const currentFreePoints=checkFreePoints.rows[0].free_points
            const newFreePoints=currentFreePoints-sumOfAddPoints

            const assignPoints=await db.query('UPDATE "character" SET "health_points"=$1,"attack_points"=$2,"agility_points"=$3,"armor_points"=$4,"free_points"=$5  WHERE "user_id"=$6', [addHealthPoints,addAttackPoints,addAgilityPoints,addArmorPoints,newFreePoints,userId])

            return res.status(200).send({"success":"Stat points assigned successfully"})

        }else {
            return res.status(401).send({"error":"Sum of additional points must be less than free points available"})
        }
    }catch (e) {

    }
}

export default assignStats