import express from 'express'
import getUserItems from "../controllers/item/getUserItems";
import {jwtAuth} from "../middleware/jwtAuth";
import adminCreateItem from "../controllers/item/adminCreateItem";
import {adminAuth} from "../middleware/adminAuth";

const item = express.Router()

item.post('/getUserItems',jwtAuth,getUserItems )
item.post('/adminCreateItem',adminAuth,adminCreateItem)

export default item