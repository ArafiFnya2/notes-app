import express from "express";
import {
  getAllNotesHandler,
  addNoteHandler,
  getNoteByIdHandler,
  updateNoteByIdHandler,
  deleteNoteByIdHandler,
} from "../handlers/notesHandler.js";

const noteRouter = express.Router();

noteRouter.get("/", getAllNotesHandler);
noteRouter.post("/", addNoteHandler);
noteRouter.get("/:id", getNoteByIdHandler);
noteRouter.put("/:id", updateNoteByIdHandler);
noteRouter.delete("/:id", deleteNoteByIdHandler);

export default noteRouter;
