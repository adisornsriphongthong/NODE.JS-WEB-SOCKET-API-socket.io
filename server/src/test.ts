import express, { Request, Response } from 'express'
import http from 'http'
import cors from 'cors'
import { Server, Socket } from 'socket.io'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
}))

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
})

app.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'This is main page.'
    })
})

io.on('connection', (Socket: Socket) => {
    console.log('User Connection: ', Socket.id)
    Socket.on('message', (message: string) => {
        console.log('received the message: ', message)
    })
})

server.listen(3001, () => {
    console.log('The Server is running on port 3001')
})