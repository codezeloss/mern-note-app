import { Note } from "../models/note";
import { User } from "../models/user";

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

// GET Logged In user
export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData("/api/users", { method: "GET" });
  return response.json();
}

// SIGN UP user
export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// LOG IN user
export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials) {
  const response = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

// LOG OUT user
export async function logout() {
  await fetchData("/api/users/logout", { method: "GET" });
}

// GET all Notes
export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData("http://localhost:3000/api/notes", {
    method: "GET",
  });
  return response.json();
}

// CREATE Note
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

// UPDATE Note
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

// DELETE Note
export async function deleteNote(noteId: string) {
  await fetchData(`http://localhost:3000/api/notes/${noteId}`, {
    method: "DELETE",
  });
}
