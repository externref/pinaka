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
	return BigInt(generator.generateId());
}

export function createAccessToken(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export function createLoginCookie(): string {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c == "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
class SnowflakeGenerator {
	epoch: bigint;
	workerIdBits: bigint;
	processIdBits: bigint;
	incrementBits: bigint;
	maxWorkerId: bigint;
	maxProcessId: bigint;
	maxIncrement: bigint;
	workerId: bigint;
	processId: bigint;
	lastTimestamp: bigint;
	increment: bigint;
	constructor() {
		this.epoch = 1420070400000n; // Discord epoch (in milliseconds since 1970-01-01)
		this.workerIdBits = 5n; // Number of bits for worker ID
		this.processIdBits = 5n; // Number of bits for process ID
		this.incrementBits = 12n; // Number of bits for increment

		this.maxWorkerId = (1n << this.workerIdBits) - 1n;
		this.maxProcessId = (1n << this.processIdBits) - 1n;
		this.maxIncrement = (1n << this.incrementBits) - 1n;

		this.workerId = 0n;
		this.processId = 0n;
		this.lastTimestamp = 0n;
		this.increment = 0n;
	}

	setWorkerId(workerId) {
		if (workerId < 0n || workerId > this.maxWorkerId) {
			throw new Error(`Worker ID must be between 0 and ${this.maxWorkerId}`);
		}
		this.workerId = BigInt(workerId);
	}

	setProcessId(processId) {
		if (processId < 0n || processId > this.maxProcessId) {
			throw new Error(`Process ID must be between 0 and ${this.maxProcessId}`);
		}
		this.processId = BigInt(processId);
	}

	generateId() {
		let timestamp = BigInt(Date.now());
		if (timestamp < this.lastTimestamp) {
			throw new Error("Invalid system clock");
		}

		if (this.lastTimestamp === timestamp) {
			this.increment = (this.increment + 1n) & this.maxIncrement;
			if (this.increment === 0n) {
				// Increment overflow, wait until next timestamp
				timestamp = this.waitNextMillis(this.lastTimestamp);
			}
		} else {
			this.increment = 0n;
		}

		this.lastTimestamp = timestamp;

		const snowflake =
			((timestamp - this.epoch) <<
				(this.workerIdBits + this.processIdBits + this.incrementBits)) |
			(this.workerId << (this.processIdBits + this.incrementBits)) |
			(this.processId << this.incrementBits) |
			this.increment;

		return snowflake.toString();
	}

	waitNextMillis(lastTimestamp) {
		let timestamp = BigInt(Date.now());
		while (timestamp <= lastTimestamp) {
			timestamp = BigInt(Date.now());
		}
		return timestamp;
	}
}

const generator = new SnowflakeGenerator();
