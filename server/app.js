require('dotenv').config()

const express = require('express')
const router = require('./routes')
const { errorHandler } = require('./middlewares')
const cors = require('cors')
const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
    console.log('listening on port', port)
})