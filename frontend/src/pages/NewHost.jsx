import React, { useState } from 'react'
import { SquareX } from 'lucide-react'

const hostTypes = ['router', 'switch', 'firewall', 'server', 'other']
const connectionMethods = ['password', 'ssh-key', 'none']

const defaultHost = {
    name: "",
    ipAddress: "",
    type: "",
    credentials: "",
    group: "",
    connectionMethod: "",
    description: "",
}

const NewHost = () => {
    const [newHost, setNewHost] = useState(defaultHost)
    return (
        <div className=' p-6'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Host</h2>
            <form className='flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Name</label>
                    <input className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, name: e.target.value })} />
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>IP Address</label>
                    <input className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, ipAddress: e.target.value })} />
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Type</label>
                    <select className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, type: e.target.value })}>
                        {hostTypes.map(type => <option value={type}>{type}</option>)}
                    </select>
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Description</label>
                    <textarea className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewHost({ ...newHost, description: e.target.value })} rows={3} />
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <button className='px-8 py-2 text-white bg-red-700 rounded-md '>Cancel</button>
                    <button className='px-8 py-2 text-white bg-green-700 rounded-md '>Save</button>

                </div>
            </form>
        </div>

    )
}

export default NewHost