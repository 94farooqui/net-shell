import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css'; // Import the CSS
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const TerminalShell = ({sshConfig}) => {
    const terminalRef = useRef(null);
    const terminal = useRef(null); // Store the terminal instance
    const fitAddon = useRef(null);
    const searchAddon = useRef(null);
    const webLinksAddon = useRef(null);

    useEffect(() => {
        terminal.current = new Terminal();
        fitAddon.current = new FitAddon();
        searchAddon.current = new SearchAddon();
        webLinksAddon.current = new WebLinksAddon();
    
        terminal.current.loadAddon(fitAddon.current);
        terminal.current.loadAddon(searchAddon.current);
        terminal.current.loadAddon(webLinksAddon.current);
    
        terminal.current.open(terminalRef.current);
    
        // Fit the terminal to the container
        fitAddon.current.fit();
    
        // Example: Write some text to the terminal
        terminal.current.write('Hello from xterm.js!\r\n');



        console.log("Conneting to switch",sshConfig)
       terminal.current.writeln("Welcome to NetShell")
    
       socket.emit('connectToSSH', sshConfig);
    
       // Handle data from SSH server
       socket.on('sshData', (data) => {
        terminal.current.write(data);
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
        <div className='w-[600px] h-[800px] p-4 bg-green-800'>
          <div ref={terminalRef} style={{ height: '400px' }}></div>
        </div>
      );
}

export default TerminalShell