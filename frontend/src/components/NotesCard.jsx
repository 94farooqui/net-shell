import axios from "axios";
import { CircleX, FilePenLine, Logs, NotebookText, Trash2 } from "lucide-react";
import React, { useState } from "react";
import NoteForm from "./NoteForm";

const NotesCard = ({
  note,
  setRefetch,
  setShowEditForm,
  setEditableNote,
  setDeletableNote,
}) => {
  //const [editEnable, setEditEnable] = useState(false)
  const [openNoteModal, setOpenNoteModal] = useState();

  const handleOpenNoteModal = () => {
    setOpenNoteModal(true);
  };

  const onClickEdit = () => {
    setEditableNote(note);
    //console.log("editablenote", note )
    setShowEditForm(true);
  };

  const deleteNote = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/notes/${note._id}`
      );
      if (response.status == 200) {
        console.log(response.data.message);
        setRefetch((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
    }
  };

  return (
    <>
      <div
        onClick={handleOpenNoteModal}
        className="h-full bg-gray-800 border border-gray-700  hover:bg-gray-700 text-white p-4 pb-8 rounded-md group"
      >
        <div className="flex flex-col items-start gap-2 text-gray-300 text-sm pb-2 mt-2  border-b-2 border-gray-600">
          <NotebookText size={24} className="text-green-400 mt-1" />
          <p className="text-lg font-semibold text-gray-200 line-clamp-1">
            {note.title}
          </p>
        </div>
        <div className="flex items-start gap-2 text-gray-300 text-sm mt-4">
          {/* <Logs size={16} className="text-yellow-400 w-4" /> */}
          <p className="flex-1 text-gray-400 line-clamp-2">{note.content}</p>
        </div>
        <p className="text-sm text-gray-400">{note.date}</p>
      </div>
      {openNoteModal && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center z-60 bg-gray-900/70">
          <button
            onClick={() => setOpenNoteModal(false)}
            className="absolute top-8 right-8"
          >
            <CircleX className="text-gray-200" size={48} />
          </button>
          <div className="min-w-[400px] p-6 rounded-lg flex flex-col bg-gray-700 text-gray-100">
            <span className="pb-4 border-b-2 border-gray-100">
              <p className="text-2xl font-bold">{note.title}</p>
            </span>
            <span className="py-4">
              <p className="text-lg opacity-70">{note.content}</p>
            </span>
            <div className="flex justify-between gap-8">
              <button
                onClick={deleteNote}
                className=" group-hover:block flex items-center gap-2 text-lg bg-gray-800 px-4 py-2 rounded-lg text-gray-200"
              >
                <Trash2 size={16} strokeWidth={1.5} />
                Delete
              </button>
              <button
                onClick={onClickEdit}
                className="text-gray-400 group-hover:block flex items-center gap-2 text-lg border-2 border-gray-400 px-4 py-2 rounded-lg"
              >
                <FilePenLine size={16} />
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesCard;
