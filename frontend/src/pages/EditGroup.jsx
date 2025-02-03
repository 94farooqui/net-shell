import React, { useEffect, useState } from 'react'
import { Ban, Save, SquareX, Trash2 } from 'lucide-react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const hostTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Other']
const connectionMethods = ['password', 'ssh-key', 'none']

const defaultGroup = {
    name: "",
    description: "",
    location: "",
    project: "",
}

const token = localStorage.getItem("net_shell_token")

const EditGroup = () => {
    const {groupId} = useParams()
    const [loading,setLoading]=useState(true)
    const [error,setError]=useState("")

    const [newGroup, setNewGroup] = useState(defaultGroup)
    const navigate = useNavigate()

    const handleDelete = async (e) => {
        const response = await axios.delete(`http://localhost:5000/api/groups/${groupId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if(response.status){
            navigate("/groups")
        }
    }

    const fetchGroup = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/groups/${groupId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status == 200){
                setNewGroup(response.data)
            }
        }
        catch(error){
            setError("Error in fetching details")
        }
        finally{
            setLoading(false)
        } 
    }
    useEffect(()=>{
        fetchGroup()
    },[])


    const handleAddGroupSubmit = async (e) => {
        e.preventDefault()
        console.log(newGroup)
        const response = await axios.put(`http://localhost:5000/api/groups/${groupId}`, newGroup,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status == 200) {
            navigate("/groups")
        }
    }


    if(loading){
        return <p>Loading ...</p>
    }

    if(error){
        return <p>Error... Try again</p>
    }

    return (
        <div className=' p-6'>
            <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>Edit Group : {newGroup.name}</h2>
            <button type='button' onClick={handleDelete} className='px-8 py-2 flex items-center text-white bg-blue-700 rounded-md '><Trash2 size={18} className='inline mr-2' /> Delete</button>
            </div>
            <form onSubmit={handleAddGroupSubmit} className='flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Name</label>
                    <input value={newGroup.name} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} />
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Description</label>
                    <textarea value={newGroup.description} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })} rows={3} />
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Project</label>
                    <input value={newGroup.project} type='text' className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewGroup({ ...newGroup, project: e.target.value })} rows={3} />
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Location</label>
                    <input value={newGroup.location} type='text' className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewGroup({ ...newGroup, location: e.target.value })} rows={3} />
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <button type='reset' className='px-8 py-2 flex items-center  text-white bg-red-700 rounded-md '><Ban size={18} className='inline mr-2' />Cancel</button>
                    <button type='submit' className='px-8 py-2 flex items-center  text-white bg-green-700 rounded-md '><Save size={18} className='inline mr-2' />Save</button>

                </div>
            </form>
        </div>

    )
}

export default EditGroup