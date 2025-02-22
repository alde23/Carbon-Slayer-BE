import express from 'express'
import userSignup from "../controllers/auth/userSignup";
import userLogin from "../controllers/auth/userLogin";
import adminLogin from "../controllers/auth/adminLogin";


const auth = express.Router()

auth.post('/userSignup', userSignup)
auth.post('/userLogin', userLogin)
auth.post('/adminLogin', adminLogin)

export default auth