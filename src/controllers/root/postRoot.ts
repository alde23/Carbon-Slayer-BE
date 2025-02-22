import { RequestHandler } from 'express'

const postRoot : RequestHandler = (req, res) => {
    const json = req.body
    res.json(json)
}

export default postRoot