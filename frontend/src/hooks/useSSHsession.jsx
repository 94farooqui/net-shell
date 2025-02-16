import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { Terminal as XTerm } from "xterm";
import "xterm/css/xterm.css";
import { TerminalShellOptions } from "../config/TerminalShellOptions";

export function useSSHSession({ sessionId, sshConfig }) {
  const terminalRef = useRef(null);
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit("connectToSSH", sshConfig);
    // socketRef.current.emit("startSSH", { sessionId, host, username, password });
    console.log("Conneting to switch", sshConfig);

    socketRef.current.on("sshData", (data) => {
      terminalRef.current && terminalRef.current.write(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [sessionId,sshConfig]);

  useEffect(() => {
    if (!terminalRef.current) {
      const terminal = new XTerm(TerminalShellOptions);
      terminal.open(document.getElementById(`terminal-${sessionId}`));

      terminal.onData((data) => {
        socketRef.current.emit("input", data);
      });

      terminalRef.current = terminal;
      setConnected(true);
    }
  }, []);

  return { terminalRef, connected };
}
