import express from 'express'
import getUserItems from "../controllers/item/getUserItems";
import {jwtAuth} from "../middleware/jwtAuth";
import adminCreateItem from "../controllers/item/adminCreateItem";
import {adminAuth} from "../middleware/adminAuth";
import getShop from "../controllers/item/getShop";
import buyItem from "../controllers/item/buyItem";

const item = express.Router()

item.post('/getUserItems',jwtAuth,getUserItems )
item.post('/adminCreateItem',adminAuth,adminCreateItem)
item.post('/getShop',jwtAuth,getShop)
item.post('/buyItem',jwtAuth,buyItem)

export default item