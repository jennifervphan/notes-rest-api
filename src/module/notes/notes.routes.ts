import { Router } from "express";
import { validate } from "../../middleware/validate.middleware";
import { createNoteSchema, deleteNoteSchema } from "./note.schema";
import { notesController } from "./notes.controller";

const router = Router();

router.get("/", (req, res) => notesController.getNotes(req, res));

router.post("/", validate(createNoteSchema), (req, res) =>
	notesController.createNote(req, res),
);

router.delete("/:id", validate(deleteNoteSchema), (req, res) =>
	notesController.deleteNote(req, res),
);

export default router;
