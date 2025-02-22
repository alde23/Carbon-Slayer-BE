import express from 'express'
import getUserQuests from "../controllers/quest/getUserQuests";

const quest = express.Router()

quest.post('/getUserQuests',getUserQuests )

export default quest
