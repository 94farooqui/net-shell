import axios from 'axios';
import React, { useEffect, useState } from 'react'

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

const useCredentials = () => {

    const [credentials, setCredentials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(()=>{
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
                    console.log("Creds by type",credsByType)
                    //setCredentials(response.data)
                    setError("");
                }
            } catch (error) {
                setError("Something went wrong");
            } finally {
                setLoading(false);
            } 
        };
        getCredentials()
    },[])
    return {loading,error,credentials}
}

export default useCredentials