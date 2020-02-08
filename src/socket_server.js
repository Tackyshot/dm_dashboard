import io from 'socket.io';
import {verifyToken, validate} from './helpers/auth_helper';
import messenger from './socket_event_listeners/messenger';

export default class SocketServer {
  sockets = [];

  constructor() {
    this.io = io(3004, {
      serveClient: false,
    });

    console.log('SocketServer Constructed');

    this._init_io();
  }//end constructor

  _init_io() {
    return this.io.on('connection', async (socket) => {
      const headers = socket.handshake.query;
      const id = headers['client-id'];

      this.handleAuth(socket);

      socket.on('close', async (reason) => {
        let sockI = this.sockets.findIndex((s) => (s.id === id && s.kind === kind));

        console.log("socket closed for reason:", reason);

        this.sockets.splice(sockI, 1);
      });

      socket.on('disconnect', (reason) => {
        let sockI = this.sockets.findIndex((s) => (s.id === id && s.kind === kind));

        console.log("socket disconnected for reason:", reason);

        this.sockets.splice(sockI, 1);
      });

      socket.on('error', (err) => {
        console.error("socket error:", err);
      });

      //any custom socket channels or namespaces go here.
      messenger(socket, this.sockets);

    }); //end on_connection handler
  }//end _init_io

  handleAuth(socket) {
    socket.auth = false;
    socket.on('authenticate', (data) => {
      //check the auth data sent by the client
      const {isValid} = validate(verifyToken(data.token));

      if(isValid) {
        socket.auth = true;

        this.sockets.push({
          id: id,
          socket: socket
        });
      };
    });

    setTimeout(()=>{
      //If the socket didn't authenticate, disconnect it
      if (!socket.auth) {
        console.log("Disconnecting socket ", socket.id);
        socket.disconnect('unauthorized');
      }
    }, 1000);
  }//end handleAuth
}// end SocketServer class