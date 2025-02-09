import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CredentialCard from "../components/CredentialCard";
import { useEffect, useState } from "react";
import axios from "axios";

// Sample data (Replace with API call in real implementation)
// const credentials2 = [
//   { id: 1, cred_name: "AWS Server", username: "admin", ip_url: "192.168.1.1", comment: "Main production server" },
//   { id: 2, cred_name: "Cisco Router", username: "cisco", ip_url: "10.0.0.1", comment: "Core router" },
//   { id: 3, cred_name: "Firewall", username: "security", ip_url: "10.10.10.1", comment: "Perimeter firewall" },
//   { id: 4, cred_name: "Dev Server", username: "developer", ip_url: "dev.example.com", comment: "Development environment" },
// ];

const credsByType = [
  {
    type: "SSH",
    creds: [],
  },
  {
    type: "Secret Key",
    creds: [],
  },
  {
    type: "Website Credentials",
    creds: [],
  },
];

const token = localStorage.getItem("net_shell_token");

const CredentialsManager = () => {
  const [credentials, setCredentials] = useState([]);
  const [filteredCredentials,setFilteredCredentials] = useState([])
  const [searchFilter,setSearchFilter] = useState("")
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getCredentials = async () => {
    try {
      console.log("Fetching...");
      const response = await axios.get(
        "http://localhost:5000/api/credentials",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        console.log("received credentials", response.data);
        credsByType.forEach((credType) => {
          response.data.forEach((cred) => {
            if (credType.type == cred.type) {
              credType.creds.push(cred);
            }
          });
        });
        setCredentials(credsByType);
        setFilteredCredentials(credsByType)
        //setCredentials(response.data)
        setError("");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const searchValue = e.target.value.toLocaleLowerCase()
    console.log(searchValue)
    setSearchFilter(searchValue)

    if (!searchValue) {
      setFilteredHostGroups(hostGroups)
    }
  };

  useEffect(()=>{
    if(!searchFilter){
      setFilteredCredentials(credentials)
    }

    const filtered = credentials.map(credential => credential.creds.filter(cred=> cred.name.toLowerCase().includes(searchFilter)))
    setFilteredCredentials(filtered)
    console.log("Filtered", filtered)
  },[searchFilter])

  useEffect(() => {
    getCredentials();
  }, []);

  return (
    <div className="p-6">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Credentials Manager</h1>
        <button
          onClick={() => navigate("new")}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus size={16} /> New Credential
        </button>
      </div>
      {/* Search bar */}
      <div className="mb-6">
        <form className="w-full flex gap-x-4">
          <input
            onChange={handleSearchInputChange}
            className="flex-1 p-2 rounded-md border bg-gray-800  border-gray-700 focus:outline-none focus:border-gray-500"
            placeholder="Enter IP or Host name"
          />
        </form>
      </div>

      {/* Credentials Grid */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}
      {/* {credentials.map((cred) => (
          <CredentialCard key={cred._id} credential={cred} />
        ))} */}
      <div className="flex flex-col gap-y-6">
        {filteredCredentials.map((credential,index) => (
          <div key={index}>
            <h2 className="text-lg font-semibold mb-2">{credential.type}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {credential.creds.map((cred) => (
                <CredentialCard key={cred._id} credential={cred} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};

// Credential Card Component

export default CredentialsManager;
