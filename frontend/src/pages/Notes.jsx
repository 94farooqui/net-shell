import React, { useState } from "react";

const initialNotes = [
  { id: 1, title: "SSH Setup", text: "Configure SSH keys for secure login.", date: "2025-01-29" },
  { id: 2, title: "Firewall Rules", text: "Allow SSH traffic on port 22.", date: "2025-01-28" },
];

const NotesPage = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [modalOpen, setModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", text: "" });

  // Handle Input Change
  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  // Add Note Function
  const handleAddNote = () => {
    if (!newNote.title || !newNote.text) return;
    
    const newNoteEntry = {
      id: notes.length + 1,
      title: newNote.title,
      text: newNote.text,
      date: new Date().toISOString().split("T")[0], // Get current date
    };

    setNotes([newNoteEntry, ...notes]); // Add to list
    setModalOpen(false); // Close modal
    setNewNote({ title: "", text: "" }); // Reset form
  };

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

      {/* Notes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-[#202024] text-white p-4 rounded-md">
            <h3 className="text-xl font-semibold">{note.title}</h3>
            <p className="text-sm text-gray-400">{note.date}</p>
            <p className="mt-2">{note.text}</p>
          </div>
        ))}
      </div>

      {/* Add Note Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#202024] p-6 rounded-md w-full sm:w-96">
            <h3 className="text-xl font-semibold mb-4">Add New Note</h3>
            <input
              type="text"
              name="title"
              placeholder="Note Title"
              value={newNote.title}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-[#333333] text-white rounded-md"
            />
            <textarea
              name="text"
              placeholder="Note Text"
              value={newNote.text}
              onChange={handleChange}
              className="w-full p-2 mb-4 bg-[#333333] text-white rounded-md"
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleAddNote}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
