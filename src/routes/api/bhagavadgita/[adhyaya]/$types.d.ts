interface QueryRequest extends Request {
	json(): Promise<{
		shlokas: number[] | undefined;
		range: number[] | undefined;
	}>;
}

export interface QueryPOSTData {
	request: QueryRequest;
	params: {
		adhyaya: string;
	};
}
