import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css"; // Import xterm styles
import { SessionsContext } from "../context/SessionsProvider";
import { useAuth } from "../context/AuthProvider";

const SERVER_URL = "http://localhost:5000"; // Change this to your backend URL

const TerminalShell2 = () => {
    const {activeSession} = useContext(SessionsContext)
    const {user} = useAuth()
    const  userId = user._id
    const { sessionId, host, username, password } = activeSession;
    const terminalRef = useRef(null);
    const term = useRef(null);
    const fitAddon = useRef(null);
    const socket = useRef(null);
    const [connected, setConnected] = useState(false);

    useEffect(() => {
        // Initialize Socket.io connection
        socket.current = io(SERVER_URL);

        // Initialize xterm.js Terminal
        term.current = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            theme: {
                background: "#1E1E1E",
                foreground: "#ffffff"
            }
        });

        fitAddon.current = new FitAddon();
        term.current.loadAddon(fitAddon.current);
        term.current.open(terminalRef.current);
        fitAddon.current.fit();

        // Handle SSH output from server
        socket.current.on("output", ({ sessionId: sid, data }) => {
            if (sid === sessionId) {
                term.current.write(data);
            }
        });

        // Handle SSH connection success
        socket.current.on("connected", ({ sessionId: sid }) => {
            if (sid === sessionId) {
                setConnected(true);
                term.current.writeln("\r\nConnected to SSH session...\r\n");
            }
        });

        // Handle SSH disconnect
        socket.current.on("disconnected", ({ sessionId: sid }) => {
            if (sid === sessionId) {
                term.current.writeln("\r\nDisconnected from SSH session...\r\n");
                setConnected(false);
            }
        });

        // Handle errors
        socket.current.on("error", ({ message }) => {
            term.current.writeln(`\r\nError: ${message}\r\n`);
        });

        return () => {
            socket.current.disconnect();
        };
    }, [sessionId]);

    useEffect(() => {
        if (socket.current && userId && sessionId) {
            socket.current.emit("connectSSH", {
                userId,
                sessionId,
                host,
                username,
                password
            });

            // Capture user input and send to SSH server
            term.current.onData((input) => {
                socket.current.emit("sendCommand", { userId, sessionId, command: input });
            });
        }
    }, [userId, sessionId]);

    const handleDisconnect = () => {
        socket.current.emit("disconnectSSH", { userId, sessionId });
        setConnected(false);
    };

    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "#1E1E1E" }}>
            <div ref={terminalRef} style={{ height: "100%" }}></div>
            {connected && (
                <button
                    onClick={handleDisconnect}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        padding: "8px 16px",
                        backgroundColor: "#ff4d4d",
                        color: "#fff",
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    Disconnect
                </button>
            )}
        </div>
    );
};

export default TerminalShell2;
