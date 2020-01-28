const firebase = require('firebase')
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDXln2lxO_bUAN6ucd8xNd65ku0ubtxQ_4",
    authDomain: "iot-001-241915.firebaseapp.com",
    databaseURL: "https://iot-001-241915.firebaseio.com",
    projectId: "iot-001-241915",
    storageBucket: "iot-001-241915.appspot.com",
    messagingSenderId: "483001273405",
    appId: "1:483001273405:web:c3b6b9c5eaeeca5043ee54"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database()
const express = require('express')

// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment')

const app = express()

app.get('/', (req, res) => res.send('online'))


const PORT= 8080 || process.env.PORT
app.listen(PORT, () => `Server started at port ${PORT}`)