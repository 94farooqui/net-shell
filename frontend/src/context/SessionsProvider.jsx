import React, { createContext, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { WebLinksAddon } from "xterm-addon-web-links";
import "xterm/css/xterm.css"; // Import the CSS
import { TerminalShellOptions } from "../config/TerminalShellOptions";

export const SessionsContext = createContext();

const SessionsProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [terminalInstances, setTerminalInstances] = useState([]);
  const [activeTerminal, setActiveTerminal] = useState(null);

  const terminal = useRef(null); // Store the terminal instance
  const fitAddon = useRef(null);
  const searchAddon = useRef(null);
  const webLinksAddon = useRef(null);

  //const terminalRef = useRef(null);

  const addSession = (host) => {
    let sessionExist;

    if (
      (sessionExist = sessions.find(
        (session) => session.sessionId === host._id
      ))
    ) {
      setActiveSession(sessionExist);
    } else {
      console.log("Host", host);
      const newSession = {
        sessionId: host._id,
        sshConfig: {
          host: host.ipAddress,
          port: 22,
          username: host.credentials.username,
          password: host.credentials.password,
        },
      };
      console.log("New Session", newSession);
      setActiveSession(newSession);
      setSessions((prev) => [...prev, newSession]);

      terminal.current = new Terminal(TerminalShellOptions);
      //console.log("Terminal instance", terminal.current);
      fitAddon.current = new FitAddon();
      searchAddon.current = new SearchAddon();
      webLinksAddon.current = new WebLinksAddon();

      terminal.current.loadAddon(fitAddon.current);
      terminal.current.loadAddon(searchAddon.current);
      terminal.current.loadAddon(webLinksAddon.current);

      //terminal.current.open(terminalRef.current); //loads the terminal instance on HTML dom "terminalRef div"

      //console.log("Sessions", sessions);
      setTerminalInstances((prev) => [
        ...prev,
        { sessionId: host._id, instance: terminal.current },
      ]);

      //console.log("Terminal instances", terminalInstances)

      setActiveTerminal(terminal.current);
    }
  };

  const removeSession = (id) => {
    setSessions(sessions.filter((session) => session.sessionId !== id));
    if (activeSession.sessionId === id) {
      setActiveSession(sessions.length > 1 ? sessions[0].id : null);
    }
  };
  return (
    <SessionsContext.Provider
      value={{
        sessions,
        setSessions,
        activeSession,
        setActiveSession,
        addSession,
        removeSession,
        activeTerminal,
        setActiveTerminal,
        terminalInstances,
      }}
    >
      {children}
    </SessionsContext.Provider>
  );
};

export default SessionsProvider;
