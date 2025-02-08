import axios from 'axios';
import React, { useEffect } from 'react'


const token = localStorage.getItem("net_shell_token")

const NoteForm = ({ note, setNote, setShow, setRefetch, action }) => {

    

    // Handle Input Change
    const handleChange = (e) => {
        //console.log(e.target.name,":", e.target.value , ":", note)
        setNote({ ...note, [e.target.name]: e.target.value });
    };



    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-gray-700 p-6 rounded-md w-full sm:w-96">
                <h3 className="text-xl font-semibold mb-4">Add New Note</h3>
                <input
                    type="text"
                    name="title"
                    placeholder="Note Title"
                    value={note.title}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 bg-black text-white rounded-md"
                />
                <textarea
                    name="content"
                    placeholder="Note Text"
                    value={note.content}
                    onChange={handleChange}
                    className="w-full p-2 mb-4 bg-black text-white rounded-md"
                ></textarea>
                <div className="flex justify-between">
                    <button type="button" onClick={() => setShow(false)}>Cancel</button>
                    <button
                        onClick={() => action(note)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Save Note
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NoteForm