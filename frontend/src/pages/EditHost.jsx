import React, { useEffect, useState } from 'react'
import { SquareX } from 'lucide-react'
import axios from 'axios'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import useCredentials from '../hooks/useCredentials'

const hostTypes = ['Router', 'Switch', 'Firewall', 'Server', 'Other']
const connectionMethods = ['Secret Key', 'SSH', 'Website Credentials']

const defaultHost = {
    name: "",
    ipAddress: "",
    type: "",
    group: "",
    description: "",
    connectionMethod: ""
}

const token = localStorage.getItem("net_shell_token")

const EditHost = () => {
    const { hostId } = useParams()
    const token = localStorage.getItem("net_shell_token");
    const [newHost, setNewHost] = useState(null)
    const [hostLoading,setHostLoading] = useState(true)
    const [hostError,setHostError] = useState("")
    const [hostGroups,setHostGroups]=useState()
    const navigate = useNavigate()

    const getHostDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/hosts/${hostId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                console.log(response.data)
                setNewHost(response.data)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setHostLoading(false)
        }
    }

    const getHostGroups = async () => {
        try {
            setHostLoading(true)
            const response = await axios.get(`http://localhost:5000/api/groups`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                console.log(response.data)
                setHostGroups(response.data)
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setHostLoading(false)
        }
    }

    useEffect(() => {
        getHostDetails()
    }, [])

    //console.log(host , groupNames)


    //using custom hooks
    const { loading, error, credentials } = useCredentials()


    const handleUpdateHostSubmit = async (e) => {
        e.preventDefault()
        console.log(newHost)
        const response = await axios.put(`http://localhost:5000/api/hosts/${newHost._id}`, newHost, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (response.status == 200) {
            navigate("/hosts")
        }
    }

    useEffect(() => {
        // console.log("New Host Credential", newHost.credentials)
        // console.log("Credentials", credentials)
        // console.log("Host", host)
    }, [credentials])


    if(hostLoading){
        return <p>Loading...</p>
    }

    if(hostError){
        return <p>Error </p>
    }
    return (
        <div className=' p-6'>
            <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Host</h2>
            <form onSubmit={handleUpdateHostSubmit} className='flex flex-col gap-4'>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Name</label>
                    <input value={newHost.name} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, name: e.target.value })} />
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>IP Address</label>
                    <input value={newHost.ipAddress} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, ipAddress: e.target.value })} />
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Type</label>
                    <select value={newHost.type} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, type: e.target.value })}>
                        {hostTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                </div>
                <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Group</label>
                    <select value={newHost.group} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, group: e.target.value })}>
                        {hostGroups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                    </select>
                </div>
                {credentials.length > 0 && <div className='flex-1 flex flex-col gap-y-2'>
                    <label>Credentials</label>
                    <select value={newHost.credentials} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewHost({ ...newHost, credentials: e.target.value })}>
                        {credentials.find(credential => credential.type == "SSH").creds.map(cred => <option key={cred._id} value={cred._id}>{cred.name}</option>)}
                    </select>
                </div>}

                <div className='flex-1 flex flex-col gap-y-2'>
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