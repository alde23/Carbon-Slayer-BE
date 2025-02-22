import express from 'express'
import {jwtAuth} from "../middleware/jwtAuth";
import addFriend from "../controllers/friend/addFriend";
import friendLeaderboard from "../controllers/friend/friendLeaderboard";

const friend = express.Router()

friend.post('/addFriend',jwtAuth,addFriend)
friend.post('/friendLeaderboard',jwtAuth,friendLeaderboard)

export default friend
