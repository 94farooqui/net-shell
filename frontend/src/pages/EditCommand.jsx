import React, { useEffect, useState } from 'react'
import { SquareX } from 'lucide-react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'

const hostTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Other']
const connectionMethods = ['password', 'ssh-key', 'none']

const defaultCommand = {
    name: "",
    command: "",
    description: "",
}

const token = localStorage.getItem("net_shell_token")

const EditCommand = () => {
    const location = useLocation()
    console.log(location)
    const [editCommand, setEditCommand] = useState(location.state.command)
    const navigate = useNavigate()


const handleUpdateCommand = async (e) => {
    e.preventDefault()
    console.log(editCommand)
    const response = await axios.put(`http://localhost:5000/api/commands/${editCommand._id}`, editCommand,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(response.status == 200){
        navigate("/commands")
    }
}

useEffect(()=>{
    
},[])


    return (
        <div className=' p-6'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Command</h2>
            <form onSubmit={handleUpdateCommand} className='flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Name</label>
                    <input value={editCommand.name} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setEditCommand({ ...editCommand, name: e.target.value })} />
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Command</label>
                    <input value={editCommand.command} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setEditCommand({ ...editCommand, command: e.target.value })} />
                </div>
                
                
                

                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Description</label>
                    <textarea value={editCommand.description} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setEditCommand({ ...editCommand, description: e.target.value })} rows={3} />
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <button type='reset' className='px-8 py-2 text-white bg-red-700 rounded-md '>Cancel</button>
                    <button type='submit' className='px-8 py-2 text-white bg-green-700 rounded-md '>Save</button>

                </div>
            </form>
        </div>

    )
}

export default EditCommand