import React, { useState } from 'react'

const SampleSessions = [
    {
        name:"core.sw.abc.com",
        ipAddress:"192.168.70.111"
    },
    {
        name:"dist.sw.abc.com",
        ipAddress:"192.168.70.211"
    }
]

const Sessions = () => {
    const [currentSessions,setCurrentSessions] = useState(SampleSessions)

  return (
    <div className='flex flex-col w-full'>
        <div  id="sessions-tabs" className='w-full'>
            {currentSessions.map(session => <span className='bg-gray-600 text-white'>{session.name}</span>)}
        </div>
    </div>
  )
}

export default Sessions