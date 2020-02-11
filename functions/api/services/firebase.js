const serviceAccount = require("../../sparks-26cad-firebase-adminsdk-mnk7c-df9c60b8f4.json")
const admin = require('firebase-admin')
const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sparks-26cad.firebaseio.com',
    storageBucket: 'gs://sparks-26cad.appspot.com/'
})

exports.database = firebase.database()
exports.storage = firebase.storage()