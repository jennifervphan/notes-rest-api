import type { Request } from "express";

export interface TypedRequest<
	TBody = unknown,
	TQuery = unknown,
	TParams = Record<string, string>,
> extends Request<TParams, unknown, TBody, TQuery> {
	body: TBody;
	query: TQuery;
	params: TParams;
}

export interface ApiResponse<T = unknown> {
	data?: T;
	error?: string;
	message?: string;
}
