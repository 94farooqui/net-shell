import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import { CircleUser, LogOut } from 'lucide-react'


const Navbar = () => {
  const {user, logout} = useAuth()
  const [showLogout,setShowLogout]=useState(false)

  const handleLogout = () => {
    logout()
  }
  useEffect(()=>{
    //console.log(user)
  },[])
  return (
    <div className='h-12 flex justify-between items-center p-4 bg-[#273138] text-white'>
      <h1 className='text-xl font-bold'>Net<span className='text-emerald-500'>Shell</span></h1>
      <div className='relative flex items-center gap-2 text-gray-200'>
      
        <p>{user.name}</p>
        <span onClick={()=>setShowLogout(true)}><CircleUser /></span>
        {showLogout && <button onClick={handleLogout} className=' bg-gray-700 p-2 px-4 rounded-lg'><LogOut className="mr-2 inline-block"/> Logout</button>}
      </div>
      </div>
  )
}

export default Navbar