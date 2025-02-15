import React, { useState, useEffect, useRef } from "react";
import { FitAddon } from "xterm-addon-fit";
import TerminalShell from "../components/TerminalShell";

const defaultSSHConfig = {
  host: "",
  port: 22,
  username: "",
  password: "",
}



// Sample saved credentials (Replace with API call)
// const savedCredentials = [
//   { id: "1", name: "Router Admin", username: "admin", password: "admin123" },
//   { id: "2", name: "Switch User", username: "user", password: "switch456" },
//   { id: "3", name: "Mubasshir User", username: "farooqui", password: "jsttstaa34132-" },
// ];

const TerminalPage = () => {

  const [error, setError] = useState("")

  const [sshConfig, setSSHConfig] = useState(defaultSSHConfig)

  const [useSavedCreds, setUseSavedCreds] = useState(false);
  const [selectedCred, setSelectedCred] = useState("");
  const [showTerminal, setShowTerminal] = useState(false)

  // Initialize Terminal
  // useEffect(() => {
  //   if (termRef.current && !terminalInstance.current) {
  //     terminalInstance.current = new Terminal({
  //       theme: { background: "#18181b", foreground: "#ffffff" },
  //       cursorBlink: true,
  //     });

  //     terminalInstance.current.loadAddon(fitAddon.current);
  //     terminalInstance.current.open(termRef.current);
  //     fitAddon.current.fit();
  //     terminalInstance.current.writeln("Welcome to NetShell Terminal");
  //   }
  // }, []);

  // Handle Saved Credentials Selection
  // useEffect(() => {
  //   if (selectedCred) {
  //     const cred = savedCredentials.find((cred) => cred.id === selectedCred);
  //     if (cred) {
  //       setSSHConfig({ ...sshConfig, username: cred.username, password: cred.password });
  //     }
  //   }
  // }, [selectedCred]);

  // Handle Connect Button Click
  const handleConnect = () => {
    if (!sshConfig.host || !sshConfig.username || !sshConfig.password) {
      setError("Fill the missing fields")
    }

    // terminalInstance.current?.writeln(`\x1b[32mConnecting to ${sshConfig.host} as ${sshConfig.username}...\x1b[0m`);
    setShowTerminal(true)
    console.log("SSH COnfig", sshConfig)
    // TODO: Implement SSH WebSocket connection here
  };

  return (
    <div className="p-6 ">
      {/* SSH Form */}
      <form className="flex flex-col gap-y-2 bg-[#18181b] p-4 rounded-lg" >
        <div className="relative flex-1 flex gap-x-4 items-center">
          <input
            className="bg-[#18181b] flex-1 rounded-md p-2 text-white border-2 border-gray-600"
            type="text"
            value={sshConfig.host}
            onChange={(e) => setSSHConfig({ ...sshConfig, host: e.target.value })}
            placeholder="Enter Host IP"
          />

          {!useSavedCreds && 
            <input
              className="bg-[#18181b] flex-1 rounded-md p-2 text-white border-2 border-gray-600"
              type="text"
              value={sshConfig.username}
              onChange={(e) => setSSHConfig({ ...sshConfig, username: e.target.value })}
              placeholder="Username"
            />
          }

          {!useSavedCreds &&
            <input
              className="bg-[#18181b] flex-1 rounded-md p-2 text-white border-2 border-gray-600"
              type="password"
              value={sshConfig.password}
              onChange={(e) => setSSHConfig({ ...sshConfig, password: e.target.value })}
              placeholder="Password"
            />
          }

          {useSavedCreds && (


            <select className="bg-[#18181b] flex-1 rounded-md p-2 text-white border-2 border-gray-600 " onChange={(e) => setSelectedCred(e.target.value)} style={{ padding: "5px" }}>
              <option value="">Select Credential</option>
              {savedCredentials.map((cred) => (
                <option key={cred.id} value={cred.id}>
                  {cred.name}
                </option>
              ))}
            </select>

          )}

          <button className="flex-none" type="button" onClick={handleConnect} style={{ padding: "5px 10px", background: "#007bff", color: "white", border: "none", cursor: "pointer", borderRadius: "8px" }}>
            Connect
          </button>
        </div>

        <label className="text-xs text-gray-600">
          <input
            type="checkbox"
            checked={useSavedCreds}
            onChange={(e) => setUseSavedCreds(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Use Saved Credentials
        </label>
      </form>

      {/* Terminal Area */}
      {/* <div ref={termRef} className="flex-1" style={{ width: '100%', height: '100%'  }}></div> */}
      {showTerminal && <TerminalShell sshConfig={sshConfig} setShowTerminal={setShowTerminal} />}
    </div>
  );
};

export default TerminalPage;
