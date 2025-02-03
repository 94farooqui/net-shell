import React from 'react'
import { KeyRound, Globe, User, MessageSquare } from "lucide-react";

const CredentialCard = ({ credential }) => {
    const { name, username, password, notes } = credential;
  
    return (
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
        <div className="flex items-center gap-3">
          <KeyRound size={20} className="text-yellow-400" />
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm mt-2">
          <User size={16} className="text-blue-400" /> {username}
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
          <Globe size={16} className="text-green-400" /> {password}
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm mt-1">
          <MessageSquare size={16} className="text-gray-400" /> <p className='line-clamp-1'>{notes}</p>
        </div>
      </div>
    );
  };
  

export default CredentialCard