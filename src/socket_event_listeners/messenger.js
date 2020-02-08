export default (socket, sockets) => {
  console.log('DATA POLLS HANDLER');

  socket.on('echo-message', (data) => {
    socket.emit(data);
  });

  socket.on('global-message', (data) => {
    sockets.forEach((socket_node)=> {
      socket_node.socket.emit(data);
    });
  });
}