import axios from 'axios'
import { FilePenLine, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import NoteForm from './NoteForm'




const NotesCard = ({note,setRefetch, setShowEditForm,setEditableNote,setDeletableNote}) => {
  //const [editEnable, setEditEnable] = useState(false)

  const onClickEdit = () => {
    setEditableNote(note)
    //console.log("editablenote", note )
    setShowEditForm(true)
  }

  const deleteNote = async () => {
    try{
      const response = await axios.delete(`http://localhost:5000/api/notes/${note._id}`)
      if(response.status == 200){
        console.log(response.data.message)
        setRefetch((prev)=>prev+1)
      }
    }
    catch(error){
      console.log("Error",error)
    }
    finally{

    }
  }


  return (
    <>
    <div className="relative bg-gray-800 border border-gray-700  hover:bg-gray-700 text-white p-4 pb-8 rounded-md group">
        <button onClick={deleteNote} className='absolute hidden bottom-2 right-4 text-gray-500 group-hover:block'><Trash2 size={16} strokeWidth={1.5}  /></button>
        <button onClick={onClickEdit}  className='absolute hidden bottom-2 left-4 text-gray-500 group-hover:block'><FilePenLine size={16} /></button>
        <h3 className="text-xl font-semibold text-gray-200">{note.title}</h3>
            <p className="text-sm text-gray-400">{note.date}</p>
            <p className="mt-2 text-gray-400">{note.content}</p>
          
    </div>
    </>
  )
}

export default NotesCard