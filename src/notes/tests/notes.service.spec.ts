import { NotesRepository } from "../notes.repository";
import { NoteService } from "../notes.service";

describe("NoteService", () => {
	let noteService: NoteService;

	beforeEach(() => {
		const repository = new NotesRepository();
		noteService = new NoteService(repository);
	});

	describe("create", () => {
		it("should create a note with correct properties", () => {
			const note = noteService.create({
				content: "Test content",
				title: "Test title",
			});

			expect(note).toHaveProperty("id");
			expect(note.content).toBe("Test content");
			expect(note.title).toBe("Test title");
		});

		it("should create unique notes", () => {
			const note1 = noteService.create({
				content: "Test content 1",
				title: "Test title 1",
			});
			const note2 = noteService.create({
				content: "Test content 2",
				title: "Test title 2",
			});

			expect(note1.id).not.toBe(note2.id);
		});
	});

	describe("get", () => {
		it("should return an empty array if no notes exist", () => {
			const notes = noteService.get();

			expect(Array.isArray(notes)).toBe(true);
			expect(notes.length).toBe(0);
		});

		it("should return all notes", () => {
			// Create 15 notes
			for (let i = 0; i < 15; i++) {
				noteService.create({ content: `Content ${i}`, title: `Title ${i}` });
			}

			const notes = noteService.get();
			expect(notes.length).toBe(15);
		});
	});

	describe("delete", () => {
		it("should delete a note by id", () => {
			const note = noteService.create({
				content: "Test content",
				title: "Test title",
			});
			noteService.delete(note.id);

			const deletedNote = noteService.get().find((n) => n.id === note.id);
			expect(deletedNote).toBeUndefined();
		});

		it("should throw an error if note does not exist", () => {
			expect(() => {
				noteService.delete("non-existent-id");
			}).toThrow();
		});
	});
});
