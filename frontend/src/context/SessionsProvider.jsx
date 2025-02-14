import React, { createContext, useState } from 'react'
import { v4 as uuidv4 } from "uuid";

export const SessionsContext = createContext()

const SessionsProvider = ({ children }) => {

    const [sessions, setSessions] = useState([])
    const [activeSession, setActiveSession] = useState(null)

    const addSession = (sshConfig) => {
        const newSession = {
            sessionId: uuidv4(),
            sshConfig: sshConfig
        };
        console.log(newSession)
        setSessions([...sessions, newSession]);
        setActiveSession(newSession.sessionId);
    };

    const removeSession = (id) => {
        setSessions(sessions.filter((session) => session.id !== id));
        if (activeSession === id) {
            setActiveSession(sessions.length > 1 ? sessions[0].id : null);
        }
    };
    return (
        <SessionsContext.Provider value={{ sessions, setSessions, activeSession, setActiveSession, addSession, removeSession }}>
            {children}
        </SessionsContext.Provider>
    )
}

export default SessionsProvider