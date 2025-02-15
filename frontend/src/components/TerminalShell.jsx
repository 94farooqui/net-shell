import React, { useContext, useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css'; // Import the CSS
import { io } from 'socket.io-client';
import { CircleX } from 'lucide-react';
import { TerminalShellOptions } from '../config/TerminalShellOptions';
import { SessionsContext } from '../context/SessionsProvider';




const TerminalShell = ({ sshConfig, sessionId }) => {

  const socket = io('http://localhost:5000');
  console.log("socket connection established")
  const sessionBuffers = {};

  const { activeSession } = useContext(SessionsContext)
  const terminalRef = useRef(null);
  const terminal = useRef(null); // Store the terminal instance
  const fitAddon = useRef(null);
  const searchAddon = useRef(null);
  const webLinksAddon = useRef(null);

  // useEffect(()=>{
  //   if(sessionBuffers[activeSession.sessionId]){
  //     terminal.current.write(sessionBuffers[activeSession.sessionId])
  //     console.log(sessionBuffers[activeSession.sessionId])
  //     terminal.current.focus();
  //   }
  //   else {
  //     sessionBuffers[activeSession.sessionId] = "";
  //   }
  // },[activeSession])

  useEffect(() => {
    terminal.current = new Terminal(TerminalShellOptions);
    fitAddon.current = new FitAddon();
    searchAddon.current = new SearchAddon();
    webLinksAddon.current = new WebLinksAddon();

    terminal.current.loadAddon(fitAddon.current);
    terminal.current.loadAddon(searchAddon.current);
    terminal.current.loadAddon(webLinksAddon.current);

    terminal.current.open(terminalRef.current);

    //   // Fit the terminal to the container
    fitAddon.current.fit();

    //   // Example: Write some text to the terminal
    //   terminal.current.write('Hello from xterm.js!\r\n');
    if (sessionBuffers[activeSession.sessionId]) {
      terminal.current.write(sessionBuffers[activeSession.sessionId])
      //console.log(sessionBuffers[activeSession.sessionId])
      terminal.current.focus();
    }
    else {
      sessionBuffers[activeSession.sessionId] = "";
    }



    console.log("Conneting to switch", sshConfig)
    //  terminal.current.writeln("Welcome to NetShell")

    socket.emit('connectToSSH', activeSession.sshConfig);

    socket.on('sshConnection', connctionStatus => { if (connctionStatus) console.log("Connection established") });

    // Handle data from SSH server
    socket.on('sshData', (data) => {
      terminal.current.write(data);
      sessionBuffers[activeSession.sessionId] += data
    });

    // Send user input to SSH server
    terminal.current.onData((data) => {
      socket.emit('sshCommand', data);
    });

    window.addEventListener('resize', () => {
      fitAddon.current.fit();
    });

    // Cleanup
    return () => {
      terminal.current.dispose();
      socket.disconnect();
      window.removeEventListener('resize', () => {
        fitAddon.current.fit(); // Remove the listener
      });
    };
  }, []);

  return (
    <div className='w-full'>
      <div ref={terminalRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default TerminalShell