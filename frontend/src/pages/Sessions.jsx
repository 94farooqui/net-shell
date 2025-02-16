import { X } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import TerminalShell from "../components/TerminalShell";
import { SessionsContext } from "../context/SessionsProvider";
import { useAuth } from "../context/AuthProvider";
import TerminalShell2 from "../components/TerminalShell2";
import { io } from "socket.io-client";

const Sessions = () => {
  const socket = io("http://localhost:5000");
  const { user } = useAuth();
  const terminalRef = useRef(null);
  const {
    sessions,
    activeSession,
    setActiveSession,
    addSession,
    removeSession,
    activeTerminal,
    setActiveTerminal,
    terminalInstances
  } = useContext(SessionsContext);
  const [inputBuffer, setInputBuffer] = useState("");

  useEffect(() => {
    console.log("Active terminal instance", activeTerminal)
    if (activeTerminal) {
      console.log("Re-render")
      activeTerminal.open(terminalRef.current);
      activeTerminal.focus();

      console.log("Active session", activeSession);
      activeTerminal.onData((data) => {
          socket.emit("sshCommand", { userId: user._id, sessionId: activeSession.sessionId, command: data });
          // Clear the buffer after sending the command
      });
    }

    return () => {
      if(activeTerminal){
        activeTerminal.dispose();
      }
 
      //socket.disconnect();
    };
  }, [activeTerminal]);

  useEffect(() => {
    if (activeTerminal && activeSession) {
      socket.emit("connectToSSH", { ...activeSession, userId: user._id });

      socket.on("sshConnection", (connectionStatus) => {
        if (connectionStatus) console.log("Connection established");
      });

      socket.on("connected", () => console.log("SSH connected"));

      socket.on("sshData", (data) => {
        activeTerminal.write(data.data);
      });
    }
  }, [activeSession]);

  const handleSessionTabClick = (session) => {
    console.log("Session tab clicked", session)
    setActiveSession(session)
    const term = terminalInstances.find(instance => instance.sessionId == session.sessionId)
    if(term){
      console.log("Found term instance", term.instance)
      setActiveTerminal(term.instance)
    }
    
  }


  if (sessions.length < 1) {
    return <p className="text-gray-500 italic text-lg">No Active Sessions</p>;
  }

  return (
    <div className="absolute top-0 left-0 flex flex-col gap-8 w-full">
      <div
        id="sessions-tabs"
        className="w-full flex overflow-x-scroll gap-2 p-2"
        style={{ scrollbarWidth: "none" }}
      >
        {sessions.length > 0 &&
          sessions.map((session) => (
            <button
              key={session.sessionId}
              onClick={() => handleSessionTabClick(session)}
              className={`w-[150px] text-white  px-2 py-1 flex items-center gap-2 ${
                activeSession.sessionId == session.sessionId
                  ? "bg-gray-500"
                  : "bg-gray-00"
              } `}
            >
              <p className="flex-1 truncate overflow-hidden">
                {session.sshConfig.host}
              </p>
              <X size={12} className="inline " />
            </button>
          ))}
      </div>
      <div>
        {activeSession && (
          <div className="w-full">
            <div
              ref={terminalRef}
              style={{ width: "100%", height: "100%" }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sessions;