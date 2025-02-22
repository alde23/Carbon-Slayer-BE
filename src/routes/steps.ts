import express from 'express'
import {jwtAuth} from "../middleware/jwtAuth";
import addUserStepsDay from "../controllers/steps/addUserStepsDay";

const steps = express.Router()

steps.post('/addUserStepsDay',jwtAuth,addUserStepsDay)

export default steps