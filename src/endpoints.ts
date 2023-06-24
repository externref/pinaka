export enum Endpoints {
	// for dev purpose
	create_account = "/dev/createaccount",
	insert_gita_shloka = "/dev/addshloka",

	// exposed to user
	home = "/",
	bhagavadgita = "/api/v1/bhagavadgita/:adhyaya/:shloka",
	bhagavadgita_home = "/bhagavadgita",
	bhagavadgita_shloka = "/bhagavadgita/:adhyaya/:shloka",
	bhagavadgita_query = "/api/v1/bhagavadgita/query",
	ramcharitmanas = "/api/v1/ramcharitmanas/:kanda/:shloka",
	ramcharitmanas_home = "/ramcharitmanas",
	ramcharitmanas_shloka = "/ramcharitmanas/:kanda/:shloka",
}
