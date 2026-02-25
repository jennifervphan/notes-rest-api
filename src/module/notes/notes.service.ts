import {
	type Note,
	type NotesRepository,
	notesRepository,
} from "./notes.repository";

export class NotesService {
	constructor(private repository: NotesRepository = notesRepository) {}
	create(data: { content: string; title: string }): Note {
		return this.repository.create(data.content, data.title);
	}

	get(): Note[] {
		return this.repository.getAll();
	}

	delete(id: string): void {
		this.repository.delete(id);
	}
}

export const noteService = new NotesService();
