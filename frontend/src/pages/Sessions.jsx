import { X } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import TerminalShell from '../components/TerminalShell'
import { SessionsContext } from '../context/SessionsProvider'

const SampleSessions = [
    {
        name: "core.sw1.abc.com",
        ipAddress: "192.168.70.104"
    },
    {
        name: "dist.sw1.abc.com",
        ipAddress: "192.168.70.120"
    },
    {
        name: "core.sw2.abc.com",
        ipAddress: "192.168.70.104"
    },
    {
        name: "dist.sw2.abc.com",
        ipAddress: "192.168.70.120"
    },
]

const Sessions = () => {
    //const [activeSessions, setActiveSessions] = useState(SampleSessions)

    // const [sessions, setSessions] = useState([]);
    // const [activeSession, setActiveSession] = useState(null);
    const {sessions,setSessions,activeSession,setActiveSession} = useContext(SessionsContext)  

    useEffect(()=>{
        console.log("Sessions",sessions,"activeSession",activeSession, "From Session page")
    },[])



    return (
        <div className='absolute top-0 left-0 flex flex-col gap-8 w-full'>
            <div id="sessions-tabs" className='w-full flex overflow-x-scroll gap-2 p-2' style={{ scrollbarWidth: "none" }}>
                { sessions.length>0 && sessions.map(session => <div key={session.sessionId} onClick={()=>setActiveSession(session)} className='w-[150px] bg-gray-600 text-white  px-2 py-1 flex items-center gap-2'><p className='flex-1 truncate overflow-hidden'>{session.sshConfig.host}</p><X size={12} className='inline ' /></div>)}
            </div>
            <div>
                {activeSession && <TerminalShell sshConfig={activeSession.sshConfig} sessionId={activeSession.sessionId}/>}
            </div>
        </div>
    )
}

export default Sessions