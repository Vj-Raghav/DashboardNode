const express = require('express')
const router = require('./routes')
const errorLogger = require('./errorLogger')
const cors = require('cors')

const app = express();
app.use(cors())

app.use(express.json())
app.use('/', router)
app.use(errorLogger)

module.exports = app;