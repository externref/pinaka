export function addNewlines(content: String): String {
	return content ? content.replaceAll('\n', `<br>`) : 'Entry not found.';
}

export const adhyayaNames: String[][] = [
	['Arjuna Vishada Yoga', 'अर्जुन विषाद योग'],
	['Sankhya Yoga', 'सांख्य योग'],
	['Karma Yoga', 'कर्म योग'],
	['gnana-Karma-Sanyasa Yoga', 'ज्ञान-कर्म-संन्यास योग'],
	['Karma-Sanyasa Yoga', 'कर्म-संन्यास योग'],
	['Atma-Samyama Yoga', 'आत्म-संयम योग'],
	['gnana-Vignana Yoga', 'ज्ञान विज्ञान योग'],
	['Aksara-ParaBrahma Yoga', 'अक्षर-ब्रह्म योग'],
	['Raja-Vidya-Raja-Guhya Yoga', 'राज-विद्या-राज-गुह्य योग'],
	['Vibhuti Yoga', 'विभूति योग'],
	['Vishwarupa-Darsana', 'विश्वरूप-दर्शन'],
	['Bhakti Yoga', 'भक्ति योग'],
	['Ksetra-Ksetrajna-Vibhaga Yoga', 'क्षेत्र-क्षत्र-विभाग योग'],
	['Gunatraya-Vibhaga Yoga', 'गुणत्रय-विभाग योग'],
	['Purushottama Yoga', 'पुरूषोत्तम योग'],
	['Daivasura-Sampad-Vibhaga Yoga', 'दैवासुर-संपद्विभाग योग'],
	['Shraddhatraya-Vibhaga Yoga', 'श्रद्धात्रय-विभाग योग'],
	['Moksha-Sanyasa Yoga', 'मोक्ष-संन्यास योग']
];
