import { RequestHandler } from 'express'
import config from '../../config'
import db from "../../../db";


/**
 * Health check endpoint
 */
const getRoot: RequestHandler = async (_req, res) => {
    const users= await db.query('SELECT * FROM user')

    const username:string="BigDog12"

    const userExists= await db.query('SELECT * FROM "user" WHERE "username"=($1)',[username])


    res.status(200).json({

        name: config.name,
        description: config.description,
        version: config.version
    });
}

export default getRoot