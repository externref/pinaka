import { app, database } from "./app";

app.listen(8000, async () => {
	await database.setup();
	console.log("Started listening on port 8000");
});
