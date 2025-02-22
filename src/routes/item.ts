import express from 'express'
import getUserItems from "../controllers/item/getUserItems";

const item = express.Router()

item.post('/getUserItems',getUserItems )

export default item