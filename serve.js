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