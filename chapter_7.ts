// listing 7-5 a simple node server

import * as http from 'http'

const portNumber = 8888

// function requestListener(request: http.IncomingMessage, response: http.ServerResponse) {
//     response.writeHead(200, { 'Content-Type': 'text/plain'})
//     response.write('Response text here')
//     response.end()
// }

// http.createServer(requestListener).listen(portNumber)
// console.log("listening on localhost: " + portNumber)


// listing 7-6 getting more information from the request

function requestListener(request: http.IncomingMessage, response: http.ServerResponse) {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.write('Method: ' + request.method + '\n')
    response.write('url:' + request.url + '\n')
    response.write('Response text here')
    response.end()
}

http.createServer(requestListener).listen(portNumber)
console.log('Listening on localhost: ' + portNumber)

// listing 7-8 using express

import express from 'express'

const portNumber1 = 8888
// const app = express()


const app = express()

app.get("/", (request: any, response: any ) => {
    response.send("you requested " + request.query.firstname + " " + request.query.lastname)
})

app.listen(portNumber1, 'localhost', () => {
    console.log('listening on localhost: ')
})