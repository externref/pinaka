import type { RequestEvent } from './$types';

interface QueryRequest extends Request {
	json(): Promise<{
		shlokas: number[] | undefined;
		range: number[] | undefined;
	}>;
}

export interface QueryPOSTData extends RequestEvent {
	request: QueryRequest;
	params: {
		adhyaya: string;
	};
}
