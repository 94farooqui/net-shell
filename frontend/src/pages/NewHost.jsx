import React, { useEffect, useState } from 'react'
import { SquareX } from 'lucide-react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const hostTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Other']
const connectionMethods = ['password', 'ssh-key', 'none']

const defaultHost = {
    name: "",
    ipAddress: "",
    type: "",
    group:"",
    description: "",
}

const token = localStorage.getItem("net_shell_token")

const NewHost = () => {
    const [newHost, setNewHost] = useState(defaultHost)
    const [hostGroups,setHostGroups] = useState([])
    const navigate = useNavigate()
    name
    const fetchHostGroups = async () => {
        try{
            console.log("requesting")
            const response = await axios.get("http://localhost:5000/api/groups/names",{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                console.log(response.data)
                setHostGroups( (prev) => [...prev, ...response.data])
            }
            //console.log(response)
        }
        catch(error){
            console.log(error)
        }
    }


const handleAddHostSubmit = async (e) => {
    e.preventDefault()
    console.log(newHost)
    const response = await axios.post("http://localhost:5000/api/hosts", newHost,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    if(response.status == 201){
        console.log(response.data)
        navigate("/hosts")
    }
}

useEffect(()=>{
    fetchHostGroups()
},[])


    return (
        <div className=' p-6'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Host</h2>
            <form onSubmit={handleAddHostSubmit} className='flex flex-col gap-4'>
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
                        {hostTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                
                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Group</label>
                    <select value={newHost.group} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, group: e.target.value })}>
                        <option>Select Group</option>
                        {hostGroups.map(group => <option key={group._id} value={group._id}>{group.name}</option>)}
                    </select>
                </div>

                <div  className='flex-1 flex flex-col gap-y-2'>
                    <label>Description</label>
                    <textarea className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewHost({ ...newHost, description: e.target.value })} rows={3} />
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <button type='reset' className='px-8 py-2 text-white bg-red-700 rounded-md '>Cancel</button>
                    <button type='submit' className='px-8 py-2 text-white bg-green-700 rounded-md '>Save</button>

                </div>
            </form>
        </div>

    )
}

export default NewHost