export default (socket, sockets) => {
  console.log('DATA POLLS HANDLER');

  socket.on('echo-message', (data) => {
    socket.emit(`Hello World: ${data}`);
  });

  socket.on('global-message', (data) => {
    sockets.forEach((socket_node)=> {
      socket_node.emit(data);
    });
  });
}