const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(http);
io.listen(server);

const cors = require('cors');
const morgan = require('morgan');

const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');

const authRoutes = require('./auth/routes.js');


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(authRoutes);



app.get('/', (req, res) => {
  res.send('<h1>This is our whiteboard project server</h1>');
  // res.sendFile(__dirname + '../index.html');
});




io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });


  // socket.on('chat message', (msg) => {
  //   console.log('message: ' + msg);
  // });


  socket.on('chat message', (msg) => {
    // io.emit('chat message', msg);
    socket.broadcast.emit('chat message', msg);
    
  });


});


// Catchalls
app.use('*', notFound);
app.use(errorHandler);



module.exports = {
  app,
  start: (port) => {

    if (!port) { throw new Error("Missing Port"); }

    app.listen(port, () => { console.log(`Server Up on ${port}`); });

  },
};


