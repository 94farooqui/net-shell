require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { Server } = require('socket.io');
const { Client } = require('ssh2');
const http = require('http');

const authRouter = require('./routes/auth.js');
const commandsRouter = require('./routes/commands.js');
const credentialsRouter = require('./routes/credentials.js');
const groupsRouter = require('./routes/groups.js');
const historyRouter = require('./routes/history.js');
const hostsRouter = require('./routes/hosts.js');
const notesRouter = require('./routes/notes.js');
const terminalRouter = require('./routes/terminal.js');


// Load environment variables
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (for development only)
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  let sshClient;

  socket.on('connectToSSH', (config) => {
    console.log("Request for", config)
    sshClient = new Client();

    sshClient
      .on('ready', () => {
        console.log('SSH connection established');
        socket.emit('sshConnection', true);

        sshClient.shell((err, stream) => {
          if (err) {
            return socket.emit('sshData', `Error: ${err.message}`);
          }

          // Send data from SSH server to client
          stream.on('data', (data) => {
            socket.emit('sshData', data.toString());
          });

          // Send data from client to SSH server
          socket.on('sshCommand', (command) => {
            stream.write(command);
          });

          // Handle stream closure
          stream.on('close', () => {
            console.log('SSH stream closed');
            sshClient.end();
          });
        });
      })
      .on('error', (err) => {
        console.error('SSH error:', err);
        socket.emit('sshData', `Error: ${err.message}`);
      })
      .connect(config);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (sshClient) {
      sshClient.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




app.use('/api/auth', authRouter);
app.use('/api/terminal', terminalRouter)
app.use('/api/hosts', hostsRouter)
app.use('/api/groups',groupsRouter)
app.use('/api/credentials', credentialsRouter)
app.use('/api/notes', notesRouter)
app.use('/api/commands', commandsRouter)
app.use('/api/history', historyRouter)


// const sshConfig = {
//   host: '172.16.130.59',
//   port: 22,
//   username: 'mubasshir.farooqui',
//   password: 'Touseef@29', // Use key-based auth for production
// };







// const testSSHClient = new Client()
// testSSHClient.on("ready" ,() => {
//   console.log("Connection established")
//   testSSHClient.shell((err,stream) => {
//     if(err){
//       console.log("error",err)
//     }
//     stream.on("data", (data) => console.log("Data", data))
//   })
// }).on("error", (err) =>{
//   console.log(err)
// } ).connect({
//   ...sshConfig, // Your existing SSH config (host, port, username, password)
//   algorithms: {
//     kex: ['diffie-hellman-group14-sha1'], // Add the required KEX algorithm
//   },
// })


// Routes
app.get('/', (req, res) => {
  res.send('NetShell Platform Backend');
});

module.exports = app;