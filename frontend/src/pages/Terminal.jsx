import React, { useState, useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";

// Sample saved credentials (Replace with API call)
const savedCredentials = [
  { id: "1", name: "Router Admin", username: "admin", password: "admin123" },
  { id: "2", name: "Switch User", username: "user", password: "switch456" },
];

const TerminalPage = () => {
  const termRef = useRef(null);
  const terminalInstance = useRef(null);
  const fitAddon = useRef(new FitAddon());

  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [useSavedCreds, setUseSavedCreds] = useState(false);
  const [selectedCred, setSelectedCred] = useState("");

  // Initialize Terminal
  useEffect(() => {
    if (termRef.current && !terminalInstance.current) {
      terminalInstance.current = new Terminal({
        theme: { background: "#18181b", foreground: "#ffffff" },
        cursorBlink: true,
      });

      terminalInstance.current.loadAddon(fitAddon.current);
      terminalInstance.current.open(termRef.current);
      fitAddon.current.fit();
      terminalInstance.current.writeln("Welcome to the SSH Terminal...");
    }
  }, []);

  // Handle Saved Credentials Selection
  useEffect(() => {
    if (selectedCred) {
      const cred = savedCredentials.find((cred) => cred.id === selectedCred);
      if (cred) {
        setUsername(cred.username);
        setPassword(cred.password);
      }
    }
  }, [selectedCred]);

  // Handle Connect Button Click
  const handleConnect = () => {
    if (!ip || !username || !password) {
      terminalInstance.current?.writeln("\x1b[31mMissing fields. Please fill all fields.\x1b[0m");
      return;
    }

    terminalInstance.current?.writeln(`\x1b[32mConnecting to ${ip} as ${username}...\x1b[0m`);

    // TODO: Implement SSH WebSocket connection here
  };

  return (
    <div style={{ padding: "20px", color: "white", backgroundColor: "#18181b", height: "100vh" }}>
      {/* SSH Form */}
      <form style={{ backgroundColor: "#202024", padding: "20px", borderRadius: "8px", marginBottom: "10px" }}>
        <label>Host IP:</label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter Host IP"
          style={{ marginLeft: "10px", marginBottom: "10px", padding: "5px" }}
        />

        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Username"
          style={{ marginLeft: "10px", marginBottom: "10px", padding: "5px" }}
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter Password"
          style={{ marginLeft: "10px", marginBottom: "10px", padding: "5px" }}
        />

        <label>
          <input
            type="checkbox"
            checked={useSavedCreds}
            onChange={(e) => setUseSavedCreds(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Use Saved Credentials
        </label>

        {useSavedCreds && (
          <select onChange={(e) => setSelectedCred(e.target.value)} style={{ marginLeft: "10px", padding: "5px" }}>
            <option value="">Select Credential</option>
            {savedCredentials.map((cred) => (
              <option key={cred.id} value={cred.id}>
                {cred.name}
              </option>
            ))}
          </select>
        )}

        <button type="button" onClick={handleConnect} style={{ marginLeft: "10px", padding: "5px 10px", background: "#007bff", color: "white", border: "none", cursor: "pointer" }}>
          Connect
        </button>
      </form>

      {/* Terminal Area */}
      <div ref={termRef} style={{ height: "400px", backgroundColor: "#000", borderRadius: "8px" }}></div>
    </div>
  );
};

export default TerminalPage;
