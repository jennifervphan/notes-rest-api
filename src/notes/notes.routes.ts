import { Router } from "express";
import { validate } from "../middleware/validate.middleware";
import { createNoteSchema, deleteNoteSchema } from "./note.schema";
import { notesController } from "./notes.controller";

const router = Router();

router.get("/", notesController.getNotes);

router.post("/", validate(createNoteSchema), notesController.createNote);

router.delete("/:id", validate(deleteNoteSchema), notesController.deleteNote);

export default router;
