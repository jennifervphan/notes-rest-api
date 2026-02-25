import type { Response } from "express";
import type { ApiResponse, TypedRequest } from "../../types";
import type { CreateNoteInput, DeleteNoteParams } from "./note.schema";
import { type NotesService, noteService } from "./notes.service";

export class NotesController {
	constructor(private service: NotesService = noteService) {}
	createNote(req: TypedRequest<CreateNoteInput>, res: Response): void {
		const note = this.service.create(req.body);

		const response: ApiResponse = {
			data: note,
			message: "Note created successfully",
		};

		res.status(201).json(response);
	}

	getNotes(_req: TypedRequest, res: Response): void {
		const notes = this.service.get();

		const response: ApiResponse = {
			data: notes,
		};

		res.status(200).json(response);
	}

	deleteNote(req: TypedRequest<DeleteNoteParams>, res: Response): void {
		this.service.delete(req.params.id);

		const response: ApiResponse = {
			message: "Note deleted successfully",
		};

		res.status(200).json(response);
	}
}

export const notesController = new NotesController();
