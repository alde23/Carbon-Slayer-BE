import express from 'express'
import getUserQuests from "../controllers/quest/getUserQuests";
import {jwtAuth} from "../middleware/jwtAuth";
import completeQuest from "../controllers/quest/completeQuest";

const quest = express.Router()

quest.post('/getUserQuests',jwtAuth, getUserQuests)
quest.post('/completeQuest',jwtAuth, completeQuest)

export default quest
