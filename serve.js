const express = require('express')

// Import the appropriate class
const { WebhookClient } = require('dialogflow-fulfillment')

const app = express()

app.get('/', (req, res) => res.send('online'))

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