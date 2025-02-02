import React, { useState } from 'react'
import { SquareX } from 'lucide-react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const hostTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Other']
const connectionMethods = ['password', 'ssh-key', 'none']

const defaultHost = {
    name: "",
    ipAddress: "",
    type: "",
    description: "",
}


const EditHost = () => {
    const location = useLocation()
    const host = location.state.host
    console.log(host)
    const [newHost, setNewHost] = useState(location.state.host)
    const navigate = useNavigate()


const handleUpdateHostSubmit = async (e) => {
    e.preventDefault()
    console.log(newHost)
    const response = await axios.put(`http://localhost:5000/api/hosts/${newHost._id}`, newHost)
    if(response.status == 200){
        navigate("/hosts")
    }
}


    return (
        <div className=' p-6'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Host</h2>
            <form onSubmit={handleUpdateHostSubmit} className='flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Name</label>
                    <input value={newHost.name} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, name: e.target.value })} />
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>IP Address</label>
                    <input value={newHost.ipAddress} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, ipAddress: e.target.value })} />
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Type</label>
                    <select value={newHost.type} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, type: e.target.value })}>
                        {hostTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Description</label>
                    <textarea value={newHost.description} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewHost({ ...newHost, description: e.target.value })} rows={3} />
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <button type='reset' className='px-8 py-2 text-white bg-red-700 rounded-md '>Cancel</button>
                    <button type='submit' className='px-8 py-2 text-white bg-green-700 rounded-md '>Save</button>

                </div>
            </form>
        </div>

    )
}

export default EditHost