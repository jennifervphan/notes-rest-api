import { z } from "zod";

export const NoteSchema = z.object({
	title: z.string().min(1, "Title is required"),
	content: z.string().min(1, "Content is required"),
});

export const createNoteSchema = z.object({
	body: z.object({
		title: z
			.string()
			.min(1, "Title is required")
			.max(100, "Title must be less than 100 characters"),
		content: z
			.string()
			.min(1, "Content is required")
			.max(1000, "Content must be less than 1000 characters"),
	}),
});

export const deleteNoteSchema = z.object({
	params: z.object({
		id: z.uuid("Invalid note ID"),
	}),
});

export type Note = z.infer<typeof NoteSchema>;
export type CreateNoteInput = z.infer<typeof createNoteSchema>["body"];
export type DeleteNoteParams = z.infer<typeof deleteNoteSchema>["params"];
