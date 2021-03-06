const firebaseConfig = require('./firebase-auth')
const firebase = require('firebase')
firebase.initializeApp(firebaseConfig)
const database = firebase.database()
const ref = database.ref('devices-telemetry')

const express = require('express')
const app = express()
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
        agent.add("I'm Zoha")
    }

    const tempQ = () => {
        agent.add('Temperature Query Has Been Detected')
        agent.add('This feature is in development.')
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