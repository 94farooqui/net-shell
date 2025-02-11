import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { SearchAddon } from 'xterm-addon-search';
import { WebLinksAddon } from 'xterm-addon-web-links';
import 'xterm/css/xterm.css'; // Import the CSS
import { io } from 'socket.io-client';
import { CircleX } from 'lucide-react';
import { TerminalShellOptions } from '../config/TerminalShellOptions';



const socket = io('http://localhost:5000');

const TerminalShell = ({sshConfig,setShowTerminal}) => {
    const terminalRef = useRef(null);
    const terminal = useRef(null); // Store the terminal instance
    const fitAddon = useRef(null);
    const searchAddon = useRef(null);
    const webLinksAddon = useRef(null);

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



      //   console.log("Conneting to switch",sshConfig)
      //  terminal.current.writeln("Welcome to NetShell")
    
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
         //terminal.current.dispose();
          socket.disconnect();
        //   window.removeEventListener('resize', () => {
        //     fitAddon.current.fit(); // Remove the listener
        // });
        };
      }, []);

      return (
        <div className='fixed top-0 left-0 w-screen h-screen overflow-y-auto p-12 bg-gray-500 flex justify-center items-center'>
          <button onClick={()=>setShowTerminal(false)} className='fixed top-4 right-4'><CircleX className='text-white' /></button>
          <div ref={terminalRef} style={{ width: "100%", height: "100%" }}></div>
        </div>
      );
}

export default TerminalShell