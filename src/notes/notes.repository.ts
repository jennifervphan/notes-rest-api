import { randomUUID } from "node:crypto";
import { NotFoundError } from "../middleware/error.middleware";

export interface Note {
	id: string;
	title: string;
	content: string;
}

export class NotesRepository {
	private notes: Note[] = [];

	create(content: string, title: string): Note {
		const note = { id: randomUUID(), content, title };
		this.notes.push(note);
		return note;
	}

	findById(id: string): Note | undefined {
		return this.notes.find((note) => note.id === id);
	}

	getAll(): Note[] {
		return this.notes;
	}

	delete(id: string): void {
		const index = this.notes.findIndex((note) => note.id === id);
		if (index === -1) {
			throw new NotFoundError("Note");
		}
		this.notes.splice(index, 1);
	}
}

export const notesRepository = new NotesRepository();
