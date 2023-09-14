import type { RequestEvent } from '../$types';

export interface GETReqData extends RequestEvent {
	params: {
		adhyaya: string;
		shloka: string;
	};
}
