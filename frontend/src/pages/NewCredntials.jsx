import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const credentialTypes = ["SSH", "Secret Key", "Website Credentials"]
const defaultCredential = {
  type: "SSH",
  name: "",
  website: "",
  username: "",
  password: "",
  key: "",
  notes: ""
}

const token = localStorage.getItem("net_shell_token")

const NewCredntials = () => {
  const [newCredential, setNewCredential] = useState(defaultCredential)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleAddCredSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(newCredential)
      const response = await axios.post("http://localhost:5000/api/credentials", newCredential, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if(response.status == 201){
        navigate(-1)
        setNewCredential(defaultCredential)
        setError("")
      }
    }
    catch (error) {
      setError("Something went wrong")
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className=' p-6'>
      <h2 className='text-2xl font-bold text-gray-200 mb-4'>New Credential</h2>
      <form onSubmit={handleAddCredSubmit} className='flex flex-col gap-4'>
        <div className='flex-1 flex flex-col gap-y-2'>
          <label>Type</label>
          <select defaultValue={newCredential.type} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewCredential({ ...newCredential, type: e.target.value })}>
            {credentialTypes.map((type, index) => <option key={index} value={type}>{type}</option>)}
          </select>
        </div>
        <div className='flex-1 flex flex-col gap-y-2'>
          <label>Name</label>
          <input defaultValue={newCredential.name} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewCredential({ ...newCredential, name: e.target.value })} />
        </div>
        {newCredential.type == "Website Credentials" && <div className='flex-1 flex flex-col gap-y-2'>
          <label>Website</label>
          <input defaultValue={newCredential.website} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewCredential({ ...newCredential, website: e.target.value })} />
        </div>}
        {newCredential.type !== "Secret Key" && <div className='flex-1 flex flex-col gap-y-2'>
          <label>Username</label>
          <input defaultValue={newCredential.username} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewCredential({ ...newCredential, username: e.target.value })} />
        </div>}
        {newCredential.type !== "Secret Key" && <div className='flex-1 flex flex-col gap-y-2'>
          <label>Password</label>
          <input defaultValue={newCredential.password} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewCredential({ ...newCredential, password: e.target.value })} />
        </div>}
        {newCredential.type == "Secret Key" && <div className='flex-1 flex flex-col gap-y-2'>
          <label>Key</label>
          <input defaultValue={newCredential.key} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700' onChange={(e) => setNewCredential({ ...newCredential, key: e.target.value })} />
        </div>}
        <div className='flex-1 flex flex-col gap-y-2'>
          <label>Notes</label>
          <textarea defaultValue={newCredential.notes} className='w-full bg-gray-800 p-2 rounded-md border border-gray-700 resize-none' onChange={(e) => setNewCredential({ ...newCredential, notes: e.target.value })} rows={3} />
        </div>
        <div className='flex justify-end gap-x-4 mt-4'>
          <button type='reset' className='px-8 py-2 text-white bg-red-700 rounded-md '>Cancel</button>
          <button type='submit' className='px-8 py-2 text-white bg-green-700 rounded-md '>{loading ? "Loading...":"Save"}</button>

        </div>
        {error && <p className='text-red-500'>{error}</p>}
      </form>
    </div>

  )
}

export default NewCredntials