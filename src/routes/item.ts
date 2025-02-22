import express from 'express'
import getUserItems from "../controllers/item/getUserItems";
import {jwtAuth} from "../middleware/jwtAuth";

const item = express.Router()

item.post('/getUserItems',jwtAuth,getUserItems )

export default item