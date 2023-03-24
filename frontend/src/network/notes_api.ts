import { Note } from "../models/note";

// MAIN DEFAULT FETCH()
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

// GET all Notes
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:3000/api/notes", {
    method: "GET",
  });
  return response.json();
}

// CREATE
export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData("http://localhost:3000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return response.json();
}

// UPDATE
export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `http://localhost:3000/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

// DELETE
export async function deleteNote(noteId: string) {
  await fetchData(`http://localhost:3000/api/notes/${noteId}`, {
    method: "DELETE",
  });
}
