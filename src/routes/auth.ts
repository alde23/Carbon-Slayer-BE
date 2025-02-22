import express from 'express'
import userSignup from "../controllers/auth/userSignup";
import userLogin from "../controllers/auth/userLogin";


const auth = express.Router()

auth.post('/userSignup', userSignup)
auth.post('/userLogin', userLogin)

export default auth