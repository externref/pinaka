interface Shloka {
	adhyaya: Number;
	shloka: Number;
	original: String;
	hindi: String;
	english: String;
}

/**
 * handler for gita queries
 * this class contains all methods useful for bhagwadgita endpoints.
 */
export class GitaHandler {
	/**
	 *
	 * @param {Number} adhyaya the adhyaya to look into.
	 * @param {Number} shloka the shloka to look up for.
	 * @returns {Shloka} data of the shloka.
	 */
	getShloka(adhyaya: Number, shloka: Number): Shloka {
		return {
			adhyaya: 1,
			shloka: 1,
			original: "hello",
			hindi: "hindi",
			english: "english",
		};
	}
}
