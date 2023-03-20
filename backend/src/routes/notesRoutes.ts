import express from "express";
import * as NotesController from "../controllers/NotesController";

const router = express.Router();

router
  .route("/")
  .get(NotesController.getAllNotes)
  .post(NotesController.createNote);

router
  .route("/:noteId")
  .get(NotesController.getNote)
  .patch(NotesController.updateNote)
  .delete(NotesController.deleteMovie);

export default router;
