import { useState, useEffect } from "react";
import AddNoteDialog from "./components/AddNoteDialog";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "./network/notes_api";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NotesApi.fetchNotes();
        setNotes(notes.data.notes);
      } catch (error) {
        console.log(error);
      }
    }

    loadNotes();
  }, []);

  return (
    <div className="w-full h-[100vh] relative z-10">
      <button
        className="bg-amber-700 text-white px-6 py-2 rounded-md text-sm my-6 mx-6"
        type="button"
        onClick={() => setShowAddNoteDialog(true)}
      >
        New Note
      </button>

      <div className="flex flex-wrap gap-6 px-6">
        {notes.map((note) => (
          <Note note={note} key={note._id} />
        ))}
      </div>

      {showAddNoteDialog && (
        <AddNoteDialog onDismiss={() => setShowAddNoteDialog(false)} onNoteSaved={} />
      )}
    </div>
  );
}

export default App;
