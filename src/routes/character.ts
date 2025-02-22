import express from 'express'
import {jwtAuth} from "../middleware/jwtAuth";
import createCharacter from "../controllers/character/createCharacter";
import assignStats from "../controllers/character/assignStats";
import getCharacterByUserId from "../controllers/character/getCharacterByUserId";
import equipItem from "../controllers/character/equipItem";


const character = express.Router()

character.post('/createCharacter', jwtAuth, createCharacter)
character.post('/assignStats',jwtAuth,assignStats)
character.post('/getCharacterByUserId',jwtAuth,getCharacterByUserId)
character.post('/equipItem',jwtAuth,equipItem)

export default character