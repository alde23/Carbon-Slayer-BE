import express from 'express'
import {jwtAuth} from "../middleware/jwtAuth";
import createCharacter from "../controllers/character/createCharacter";
import assignStats from "../controllers/character/assignStats";
import getCharacterByUserId from "../controllers/character/getCharacterByUserId";


const character = express.Router()

character.post('/createCharacter', jwtAuth, createCharacter)
character.post('/assignStats',jwtAuth,assignStats)
character.post('/getCharacterByUserId',jwtAuth,getCharacterByUserId)

export default character