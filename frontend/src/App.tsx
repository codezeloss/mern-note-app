import { useState, useEffect } from "react";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import Note from "./components/Note";
import { Note as NoteModel } from "./models/note";
import * as NotesApi from "./network/notes_api";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    async function loadNotes() {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    }

    loadNotes();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.log(error);
    }
  }

  // async function updateNote(params: type) {}

  const notesGrid = (
    <div className="flex flex-wrap gap-6 px-6">
      {notes.map((note) => (
        <Note
          note={note}
          key={note._id}
          onUpdateNoteClicked={setNoteToEdit}
          onDeleteNoteClicked={deleteNote}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full h-[100vh] flex justify-center">
      <div className="my-10">
        {/* Add Note BTN */}
        <button
          className="bg-amber-700 text-white px-6 py-2 rounded-md text-sm mb-6 mx-6"
          type="button"
          onClick={() => setShowAddNoteDialog(true)}
        >
          + New Note
        </button>

        {/* Show All Notes */}
        {notesLoading && <h1>Loading ...</h1>}

        {showNotesLoadingError && (
          <h1>Something went wrong! Please Refresh the page (:</h1>
        )}

        {!notesLoading && !showNotesLoadingError && (
          <>
            {notes.length > 0 ? (
              notesGrid
            ) : (
              <h1>You don't have any notes yet!</h1>
            )}
          </>
        )}

        {/* Add/Edit Note Modal */}
        {showAddNoteDialog && (
          <AddEditNoteDialog
            onDismiss={() => setShowAddNoteDialog(false)}
            onNoteSaved={(newNote) => {
              setNotes([...notes, newNote]);
              setShowAddNoteDialog(false);
            }}
          />
        )}
        {noteToEdit && (
          <AddEditNoteDialog
            noteToEdit={noteToEdit}
            onDismiss={() => setNoteToEdit(null)}
            onNoteSaved={(updatedNote) => {
              setNotes(
                notes.map((existingNote) =>
                  existingNote._id === updatedNote._id
                    ? updatedNote
                    : existingNote
                )
              );
              setNoteToEdit(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
