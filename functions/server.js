const app = require('express')()
const cors = require('cors')()
const bodyParser = require('body-parser')
const router = require('./api/routers/router')
const admin = require('firebase-admin')

const port = process.env.PORT || 8080

app.use(cors)

router(app)
app.listen(port)