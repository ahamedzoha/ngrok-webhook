const firebaseConfig = require('./firebase-auth')
// Your web app's Firebase configuration
const firebase = require('firebase')
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const database = firebase.database()

const express = require('express')
const app = express()
// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment')

//Start of the backend app
app.get('/', (req, res) => res.send('online'))

app.post('/dialogflow', express.json(), (req, res) => {

    const agent = new WebhookClient({ request: req, response: res })
    
    const welcome = () => {
        agent.add('Welcome to my agent!')
    }

    const tempQ = () => {
        agent.add('Temperature Query Invoked!')
        console.log(JSON.stringify(req.body))
    }

    let intentMap = new Map()
    intentMap.set('Default Welcome Intent', welcome)
    intentMap.set('temperatureQuery', tempQ)
    agent.handleRequest(intentMap)
})


const PORT = 8080 || process.env.PORT
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))

// module.exports = router