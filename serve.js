
// Your web app's Firebase configuration
const firebase = require('firebase')
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