export function addNewlines(content: String): String {
	return content.replace('\n', `<br>`)?content : "Entry not found.";
}
