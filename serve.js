const firebaseConfig = require('./firebase-auth')
// Your web app's Firebase configuration
const firebase = require('firebase')
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const database = firebase.database()
const ref = database.ref('devices-telemetry')
const express = require('express')
const app = express()
// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment')

//Start of the backend app
app.get('/', (req, res) => res.send('<h2>online</h2>'))

app.post('/dialogflow', express.json(), (req, res) => {

    const agent = new WebhookClient({ request: req, response: res })


    let time = req.body.queryResult.parameters.time || req.body.queryResult.parameters.timep
    let date = req.body.queryResult.parameters.date
    let sensordata = req.body.queryResult.parameters.sensordata

    const welcome = () => {
        agent.add('Welcome to my agent!')
    }

    const tempQ = () => {
        agent.add('Temperature Query Invoked!')
        console.log(JSON.stringify(req.body.queryResult.parameters))


        //USED FOR CONNECTION TESTING - CALLS THE ENTIRE DATABASE 
        // ref.once('value', (data) => {
        //     console.log(data.val())
        // }, (err)=> console.log(err)
        // )



        if (time == 'last night') console.log('MATCH')
    }

    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', welcome)
    intentMap.set('temperatureQuery', tempQ)
    agent.handleRequest(intentMap)
})


const PORT = 8080 || process.env.PORT
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))