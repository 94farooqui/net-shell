import axios from "axios";
import React, { useEffect, useState } from "react";
import NotesCard from "../components/NotesCard";
import NoteForm from "../components/NoteForm";


const token = localStorage.getItem("net_shell_token")

const NotesPage = () => {

  const [refetch, setRefetch] = useState(0)
  const [notes, setNotes] = useState([]);
  const [filteredNotes,setFilteredNotes]=useState([])
  const [notesLoading, setNotesLoading] = useState(true)
  const [notesError, setNotesError] = useState("")

  const [searchFilter,setSearchFilter] = useState()

  const [newNoteModal, setNewNoteModal] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const [showEditForm, setShowEditForm] = useState(false);
  const [editableNote, setEditableNote] = useState()

  const handleSearchInputChange = (e) => {
    setSearchFilter(e.target.value.toLowerCase())
  }

  useEffect(()=>{
    if(!searchFilter){
      setFilteredNotes(notes)
    }

    const filtered = notes.filter(note => (note.title.toLowerCase().includes(searchFilter) || note.content.toLowerCase().includes(searchFilter) ))
    setFilteredNotes(filtered)
  },[searchFilter])

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/notes", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (response.status == 200) {
          setNotes(response.data)
          setFilteredNotes(response.data)
        }
      }
      catch (error) {
        setNotesError("Error in fetching notes")
      }
      finally {
        setNotesLoading(false)
      }
    }
    getNotes()
  }, [refetch])


  // Handle Add Note
  const handleAddNote = async (note) => {
    if (!note.title || !note.content) return;
    try {
      const response = await axios.post("http://localhost:5000/api/notes", note, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status == 201) {
        console.log(response.data)
        setRefetch((prev) => prev + 1)
      }
    }
    catch (error) {
      //setNotesError("Error in adding notes")
      console.log("Error", error)
    }
    finally {
      setNotesLoading(false)
    }
    setNewNoteModal(false); // Close modal
    setNewNote({ title: "", text: "" }); // Reset form
  };


  //Handle Delete Note


  //Handle Update Note
  const handleUpdateNote = async (note) => {
    //console.log("Updating note", note)
    if (!note.title || !note.content) return;
    try {
      const response = await axios.put(`http://localhost:5000/api/notes/${note._id}`, note, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response) {
        if (response.status == 200) {
          //console.log(response.data)
          setShowEditForm(false)
          setRefetch((prev) => prev + 1)
        }
      }
    }
    catch (error) {
      //setNotesError("Error in adding notes")
      console.log("Error", error)
    }
    finally {
      setNotesLoading(false)
    }
    setShowEditForm(false); // Close modal
    setEditableNote({ title: "", text: "" }); // Reset form
  }

  if (notesLoading) {
    return <p>Loading...</p>
  }


  if (notesError) {
    <p className="text-red-500">Error in fetching notes</p>
  }

  return (
    <div className="p-6 text-white bg-[#18181b] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Notes</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 px-4 py-2 text-white rounded-md"
        >
          Add Note
        </button>
      </div>
      <div className="mb-6">
        <form
          className="w-full flex gap-x-4"
        >
          <input
            onChange={handleSearchInputChange}
            className="flex-1 p-2 rounded-md border bg-gray-800  border-gray-700 focus:outline-none focus:border-gray-500"
            placeholder="Search Notes"
          />
        </form>
      </div>


      {/* Notes List */}
      {filteredNotes.length > 0 ?
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NotesCard key={note._id} note={note} setRefetch={setRefetch} setShowEditForm={setShowEditForm} setEditableNote={setEditableNote} />

          ))}
        </div> : <div><p>No Notes Found</p></div>}

      {/* Add Note Modal */}
      {newNoteModal && (
        <NoteForm note={newNote} setNote={setNewNote} setShow={setModalOpen} setRefetch={setRefetch} action={handleAddNote} />
      )}
      {showEditForm && (
        <NoteForm note={editableNote} setNote={setEditableNote} setShow={setShowEditForm} setRefetch={setRefetch} action={handleUpdateNote} />
      )}
    </div>
  );
};

export default NotesPage;
