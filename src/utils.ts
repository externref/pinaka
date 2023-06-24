export class DBCache<V> {
	colllection: Object = new Object();

	push(key: string, value: V) {
		this.colllection[key] = value;
	}
	get(key: string): V | undefined {
		return this.colllection[key];
	}
}

export function createSnowflake(): bigint {
	return BigInt("");
}

export function createAccessToken(): string {
	return "";
}
