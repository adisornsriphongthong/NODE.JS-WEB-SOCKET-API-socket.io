import express, { Request, Response, Express } from 'express'; // Import Express and types
import http from 'http'; // Import Node.js HTTP module
import cors from 'cors'; // Import CORS middleware
import { Server, Socket } from 'socket.io'; // Import Socket.IO server and socket types

const app: Express = express(); // Create an Express application
app.use(cors({ // Configure CORS middleware
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST'] // Allow only specified HTTP methods
}));

const server = http.createServer(app); // Create an HTTP server using Express

const io = new Server(server, { // Create a Socket.IO server instance
    cors: {
        origin: 'http://localhost:5173', // Configure CORS for Socket.IO
        methods: ['GET', 'POST']
    }
});

app.get('/', (req: Request, res: Response) => { // Define a route handler for the root URL
    res.json({ // Send a JSON response
        message: 'This is main page.'
    });
});

io.on('connection', (socket: Socket) => { // Handle WebSocket connections
    console.log('User Connection: ', socket.id); // Log when a user connects
    socket.on('send_message', (message: string) => { // Listen for 'message' events from clients
        console.log('received the message: ', message); // Log received messages
        socket.broadcast.emit('receive_message', message)
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected: ', socket.id);
        // Perform any necessary cleanup operations
    });
});

server.listen(3001, () => { // Start the HTTP server
    console.log('The Server is running on port 3001'); // Log a message when the server starts
});
