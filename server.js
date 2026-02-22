import { WebSocketServer, WebSocket } from "ws";

// Changed port from 8080 to 8081 here 👇
const wss = new WebSocketServer({ port: 8081 });

//ps notes: 0 means for connection , 1 is open , 2 means closing , 3 is closed

wss.on('connection',(socket, request) => {
    const ip = request.socket.remoteAddress;

    socket.on('message', (rawData) => {
        const message = rawData.toString();
        console.log({rawData: rawData});

        wss.clients.forEach((client) => {
            if(client.readyState === WebSocket.OPEN) client.send(`Server Broadcast : ${message}`);
        })
    });
    
    socket.on('error', (err) =>{
        console.error(`Error: ${err.message}: ${ip}`);
    })
    
    socket.on('close', () => {
        console.log('client disconnected')
    })
});

console.log("Websocket server is liveeee yayayaya pn ws://localhost:8081");