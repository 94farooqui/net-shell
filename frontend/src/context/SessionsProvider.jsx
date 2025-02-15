import React, { createContext, useState } from 'react'

export const SessionsContext = createContext()

const SessionsProvider = ({ children }) => {

    const [sessions, setSessions] = useState([])
    const [activeSession, setActiveSession] = useState(null)

    const addSession = (host) => {
        const newSession = {
            sessionId: host._id,
            sshConfig: {
                host:host.ipAddress,
                port:22, 
                username:host.credentials.username,
                password:host.credentials.password
            }
        };
        console.log(newSession)
        setSessions([...sessions, newSession]);
        setActiveSession(newSession);
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