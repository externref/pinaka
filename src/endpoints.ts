export enum Endpoints {
	home = "/",
	insert_gita_shloka = "/dev/addshloka",
	bhagavadgita = "/api/v1/bhagavadgita/:adhyaya/:shloka",
	bhagavadgita_home = "/bhagavadgita",
	bhagavadgita_shloka = "/bhagavadgita/:adhyaya/:shloka",
	ramcharitmanas = "/api/v1/ramcharitmanas/:kanda/:shloka",
	ramcharitmanas_home = "/ramcharitmanas",
	ramcharitmanas_shloka = "/ramcharitmanas/:kanda/:shloka",
}
