import express from 'express'
import getUserItems from "../controllers/item/getUserItems";
import {jwtAuth} from "../middleware/jwtAuth";
import adminCreateItem from "../controllers/item/adminCreateItem";

const item = express.Router()

item.post('/getUserItems',jwtAuth,getUserItems )
item.post('/adminCreateItem',adminCreateItem)

export default item