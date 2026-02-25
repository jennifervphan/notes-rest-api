import type { NextFunction, Request, Response } from "express";

export class ServerError extends Error {
	public readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
	}
}

export class NotFoundError extends ServerError {
	constructor(resource: string) {
		super(`${resource} not found`, 404);
	}
}

export class BadRequestError extends ServerError {
	constructor(message: string) {
		super(message, 400);
	}
}

export class UnauthorizedError extends ServerError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

export class ForbiddenError extends ServerError {
	constructor(message = "Forbidden") {
		super(message, 403);
	}
}

export class ConflictError extends ServerError {
	constructor(message: string) {
		super(message, 409);
	}
}

export const errorHandler = (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
): void => {
	if (err instanceof ServerError) {
		res.status(err.statusCode).json({
			success: false,
			error: err.message,
		});
		return;
	}

	const statusCode = 500;
	const message =
		process.env.NODE_ENV === "production"
			? "Internal server error"
			: err.message;

	res.status(statusCode).json({
		success: false,
		error: message,
	});
};
