const functions = require('firebase-functions');
const app = require('express')()
const cors = require('cors')()
const bodyParser = require('body-parser')
const router = require('./api/routers/router')

app.use(cors)
app.use(bodyParser)
router(app)

exports.api = functions.https.onRequest(app)