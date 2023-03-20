import NoteModel from "../models/Note";
import { RequestHandler } from "express";
import mongoose from "mongoose";
import createHttpError from "http-errors";

// @ @ @ @
// GET All Notes
export const getAllNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();

    res.status(200).json({
      status: "success",
      data: {
        notes,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @ @ @ @
// GET a single Note
export const getNote: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @ @ @ @
// POST a Note
interface CreateNoteBody {
  title?: string;
  text?: string;
}
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, "Note must have a title");
    }

    const newNote = await NoteModel.create({ title, text });

    res.status(201).json({
      status: "success",
      data: {
        newNote,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @ @ @ @
// UPDATE a Note
interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNodeBody {
  title?: string;
  text?: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNodeBody,
  unknown
> = async (req, res, next) => {
  const { noteId } = req.params;

  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    if (!newTitle) {
      throw createHttpError(400, "Note must have a title");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();

    res.status(200).json({
      status: "success",
      data: {
        updatedNote,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @ @ @ @
// DELETE a Note
export const deleteMovie: RequestHandler = async (req, res, next) => {
  const { noteId } = req.params;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note ID");
    }

    await NoteModel.findByIdAndDelete(noteId);

    // if (!note) {
    //   throw createHttpError(404, "Note not found");
    // }

    // res.status(204).json({
    //   status: "success",
    //   data: null,
    // });

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
