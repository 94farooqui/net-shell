import axios from "axios";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import HostCard from "../components/HostCard";
import NewHost from "./NewHost";
import { useNavigate } from "react-router-dom";
import HostGroupCard from "../components/HostGroupCard";



const Hosts = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("net_shell_token");
  //console.log(token);

  const [searchFilter, setSearchFilter] = useState("")
  const [hostGroups, setHostGroups] = useState([]);
  const [filteredHostGroups, setFilteredHostGroups] = useState([])

  const [groupNames, setGroupNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filteredGroup = hostGroups.map(group => ({ ...group, devices: group.devices.filter(device => (device.name.toLowerCase().includes(searchFilter) || device.ipAddress.includes(searchFilter))) })).filter(group => group.devices.length > 0)
    if (filteredGroup) {
      console.log("found Group", filteredGroup)
      setFilteredHostGroups(filteredGroup)
    }
  }, [searchFilter])

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase()
    console.log(searchValue)
    setSearchFilter(searchValue)

    if (!searchValue) {
      setFilteredHostGroups(hostGroups)
    }
  };


  const getHosts = async () => {
    const response = await axios.get("http://localhost:5000/api/hosts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status == 200) {
      console.log(response.data);


      setGroupNames(response.data.map(group => ({ id: group._id, name: group.name })))

      setHostGroups(response.data);
      setFilteredHostGroups(response.data)

      setLoading(false);
    }

    if (response.status == 403) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getHosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="p-6">
      {/* Navbar */}

      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-semibold">Hosts</h1>
        <button
          onClick={() => navigate("new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={16} /> New Host
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6">
        <form
          className="w-full flex gap-x-4"
        >
          <input
            onChange={handleSearchInputChange}
            className="flex-1 p-2 rounded-md border bg-gray-800  border-gray-700 focus:outline-none focus:border-gray-500"
            placeholder="Enter IP or Host name"
          />
        </form>
      </div>

      {/* Hosts Grid */}
      <div className="flex flex-col">
        {filteredHostGroups.filter(hostGroup => hostGroup.devices.length > 0).map((hostGroup) => (
          <HostGroupCard key={hostGroup._id} hostGroup={hostGroup} groupNames={groupNames} refetchHosts={getHosts} />
        ))}
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {hosts.map((host) => (
          <HostCard key={host.id} host={host} refetchHosts={getHosts} />
        ))}
      </div> */}
    </div>
  );
};

export default Hosts;
