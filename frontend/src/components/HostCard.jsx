// Host Card Component
import axios from "axios";
import { Plus, Server, Router, Shield, HardDrive, Globe, EllipsisVertical } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const HostCard = ({ host, refetchHosts,groupNames }) => {
    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)
    const { name, ipAddress, type, connectionMethod, lastConnected } = host;

    // Icons for different device types
    const typeIcons = {
        router: <Router size={20} className="text-green-400" />,
        switch: <Globe size={20} className="text-blue-400" />,
        firewall: <Shield size={20} className="text-red-400" />,
        server: <Server size={20} className="text-yellow-400" />,
        other: <HardDrive size={20} className="text-gray-400" />,
    };

    const handleDelete = async (e) => {
        const response = await axios.delete(`http://localhost:5000/api/hosts/${host._id}`)
        if(response.status == 200){
            refetchHosts()
        }
    }

    useEffect(()=>{
        const handleOutSideClick = (event) => {
            if(menuRef.current && !menuRef.current.contains(event.target)){
                setShowMenu(false)
            }
        }

        document.addEventListener("mousedown", handleOutSideClick)

        return ()=> {document.removeEventListener("mousedown", handleOutSideClick)}
    },[])


    return (
        <div className="relative group bg-gray-800 text-white p-4 rounded-lg shadow-md border border-gray-700">
            <span className="hidden group-hover:block absolute top-4 right-2 text-white opacity-40 cursor-pointer hover:bg-gray-400/80 p-1 rounded-md" onClick={()=>setShowMenu(!showMenu)} ><EllipsisVertical size={16}  /></span>
            {showMenu && <div ref={menuRef} className="absolute bg-gray-900/80 top-4 right-6 border border-gray-700 rounded-md">
                <ul className="text-xs text-gray-400">
                    <Link><li className="px-4 py-2 hover:bg-gray-700">Connect</li></Link>
                    <Link to={`edit/${host._id}`} state={{host,groupNames}}><li className="px-4 py-2 hover:bg-gray-700 border-y border-gray-700">Edit</li></Link>
                    <button onClick={handleDelete}><li className="px-4 py-2 hover:bg-gray-700">Delete</li></button>
                </ul></div>}
            <div className="flex items-center gap-3">
                {typeIcons[type] || typeIcons.other}
                <h3 className="text-lg font-semibold">{name}</h3>
            </div>
            <p className="text-gray-400 text-sm mt-1">{ipAddress}</p>
            <p className="text-gray-300 text-sm mt-1">Connection: {connectionMethod}</p>
            {lastConnected && <p className="text-gray-500 text-xs mt-2">Last Connected: {lastConnected}</p>}
        </div>
    );
};

export default HostCard