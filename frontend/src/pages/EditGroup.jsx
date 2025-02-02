import React, { useState } from 'react'
import { SquareX } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const hostTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Other']
const connectionMethods = ['password', 'ssh-key', 'none']

const defaultGroup = {
    name: "",
    description: "",
  }


const EditGroup= () => {
    const [newGroup, setNewGroup] = useState(defaultGroup)
    const navigate = useNavigate()


const handleAddGroupSubmit = async (e) => {
    e.preventDefault()
    console.log(newGroup)
    const response = await axios.post("http://localhost:5000/api/groups", newGroup)
    if(response.status == 201){
        navigate("/groups")
    }
}


    return (
        <div className=' p-6'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Group</h2>
            <form onSubmit={handleAddGroupSubmit} className='flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Name</label>
                    <input className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} />
                </div>
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Description</label>
                    <textarea className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} rows={3} />
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <button type='reset' className='px-8 py-2 text-white bg-red-700 rounded-md '>Cancel</button>
                    <button type='submit' className='px-8 py-2 text-white bg-green-700 rounded-md '>Save</button>

                </div>
            </form>
        </div>

    )
}

export default EditGroup