export enum Endpoints {
	// for dev purpose
	create_account = "/dev/createaccount",
	verify_login = "/dev/authenticate",
	verify_cookie = "/dev/validate_cookie",
	insert_gita_shloka = "/dev/addgitashloka",
	insert_tandava_shloka = "/dev/addtandavashloka",

	// redirects
	docs = "/docs",
	discord = "/discord",
	github = "/github",

	// exposed to user
	home = "/",

	bhagavadgita = "/api/v1/bhagavadgita/:adhyaya/:shloka",
	bhagavadgita_query = "/api/v1/bhagavadgita/query",
	ramcharitmanas = "/api/v1/ramcharitmanas/:kanda/:shloka",
}
