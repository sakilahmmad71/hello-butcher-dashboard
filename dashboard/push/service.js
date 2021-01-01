require('dotenv').config()

const admin = require("firebase-admin");

const serviceAccount = require("./hello-butcher-ce495-firebase-adminsdk-s3lck-ed95085a16.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://hello-butcher-ce495.firebaseio.com"
});

const messaging = admin.messaging()

module.exports = messaging