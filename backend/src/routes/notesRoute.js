import { getAllNotesHandler, addNoteHandler, getNoteByIdHandler, updateNoteByIdHandler, deleteNoteByIdHandler } from "../handlers/notesHandler.js";
import express from "express";

const noteRouter = express.Router();

noteRouter.get("/notes", getAllNotesHandler);
noteRouter.post("/notes", addNoteHandler); 
noteRouter.get("/notes/:id", getNoteByIdHandler); 
noteRouter.put("/notes/:id", updateNoteByIdHandler);
noteRouter.delete("/notes/:id", deleteNoteByIdHandler);

export default noteRouter;