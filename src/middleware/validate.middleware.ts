import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";

interface RequestData {
	body?: unknown;
	query?: unknown;
	params?: unknown;
}

export const validate = (schema: ZodType<RequestData>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			// Parse and validate request against schema
			const validated = await schema.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			// Replace request data with validated and transformed data
			if (validated.body) req.body = validated.body;
			if (validated.query) req.query = validated.query as typeof req.query;
			if (validated.params) req.params = validated.params as typeof req.params;

			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				}));

				return res.status(400).json({
					success: false,
					error: "Validation failed",
					details: errors,
				});
			}

			next(error);
		}
	};
};
