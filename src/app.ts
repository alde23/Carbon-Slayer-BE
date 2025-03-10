import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import config from './config';
import errorHandler from './middleware/errorHandler';
import fourOhFour from './middleware/fourOhFour';
import root from './routes/root';
import auth from "./routes/auth";
import character from "./routes/character";
import item from "./routes/item";
import quest from "./routes/quest";
import steps from "./routes/steps";
import friend from "./routes/friend";

const app = express()

// Apply most middleware first
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    // @ts-ignore no-implicit-any
    origin: '*'
}))

app.use(helmet())
app.use(morgan('tiny'))

// Apply routes before error handling
app.use('/', root)
app.use('/auth',auth)
app.use('/character',character)
app.use('/item',item)
app.use('/quest',quest)
app.use('/steps',steps)
app.use('/friend',friend)

// Apply error handling last
app.use(fourOhFour)
app.use(errorHandler)

export default app