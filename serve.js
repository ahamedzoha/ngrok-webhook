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


const express = require('express')
const { WebhookClient } = ('dialogflow-fulfillment')

//Access to firebase admin SDK for database read/write operation for fulfillment. TODO when launched as Cfunc
// const admin = require('firebase-admin')
// admin.initializeApp()

// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment')

const app = express()

app.get('/', (req, res) => res.send('online'))

//Need to refactor this line of the code for firebase cloud function
app.post('/dialogflow', express.json(), (req, res) => {
    const agent = new WebhookClient({ request: req, response: res })

    function welcome() {
        agent.add('Welcome to my agent')
    }

    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', welcome)
    agent.handleRequest(intentMap)


})

app.listen(process.env.PORT || 8080)
//

// const TempQ = "temperatureQuery"

// exports.dfFulfillment = functions.https.onRequest((req, res) => {

//     const agent = new WebhookClient({
//         request: req,
//         response: res
//     })
//     console.log(`Dialogflow Request Headers: ${JSON.stringify(req.headers)}`)
//     console.log(`Dialogflow Request Body: ${JSON.stringify(req.body)}`)

//     function temperatureQ(agent) {
//         console.log(`Intent cloudfunction matched ${req.body.parameters}`)
//         agent.add(`Temperature Query Invoked!`)
//     }

//     let intentMap = new Map()
//     intentMap.set("temperatureQuery", temperatureQ)
//     agent.handleRequest(intentMap)
// })