import Server from './api_server';
import SocketServer from './socket_server';

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

let ApiServer = new Server();
let socketServer = new SocketServer();

ApiServer.initRoutes().then(() => {
  ApiServer.start();
});