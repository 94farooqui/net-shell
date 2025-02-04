import React from 'react'
import { KeyRound, SquareAsterisk, User, MessageSquare,FileLock,GlobeLock } from "lucide-react";

const CredentialCard = ({ credential }) => {
    const { name, username, password, key,website, notes } = credential;
  
    return (
      <div className="h-full flex flex-col justify-between gap-y-2 bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex items-center gap-3">
          <FileLock size={20} className="text-yellow-400" />
          <h3 className="text-base font-semibold">{name}</h3>
        </div>
        <div >
        {username && <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
          <User size={16} className="text-blue-400" /> <p className='max-w-[70%] line-clamp-1 overflow-hidden text-gray-400'>{username}</p>
        </div>}
        {password && <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
          <SquareAsterisk size={16} className="text-green-400" /> <p className='max-w-[70%] line-clamp-1 overflow-hidden text-gray-400'>{password}</p>
        </div>}
        {key && <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
          <KeyRound size={16} className=" text-green-400 " /> <p className='max-w-[70%] line-clamp-1 overflow-hidden text-gray-400'>{key}</p>
        </div>}
        {website && <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
          <GlobeLock size={16} className=" text-green-400 " /> <p className='max-w-[70%] line-clamp-1 overflow-hidden text-gray-400'>{website}</p>
        </div>}
        {notes && <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
          <MessageSquare size={16} className=" text-green-400 " /> <p className='max-w-[70%] line-clamp-1 overflow-hidden text-gray-400'>{notes}</p>
        </div>}
        </div>
      </div>
    );
  };
  

export default CredentialCard