from fastapi.testclient import TestClient

from src.app import app

client = TestClient(app)


def test_first_shloka() -> None:
    response = client.get("/bhagavadgita/1/1")
    assert response.json() == {
        "adhyaya": 1,
        "shloka": 1,
        "speaker": "dhṛtarāṣṭra (धृतराष्ट्र)",
        "original": "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥१-१॥",
        "romanised": "dharma-ksetre kuru-ksetre samaveta yuyutsavah\nmamakah pandavas caiva kim akurvata sanjaya 1.1",
        "hindi": None,
        "english": None,
    }


def test_query() -> None:
    response = client.post("/bhagavadgita/query", json={"adhyaya": 1, "shlokas": [2, 8, 9]})
    assert response.json() == {
        "adhyaya": 1,
        "range": None,
        "shlokas": [2, 8, 9],
        "responses": [
            {
                "adhyaya": 1,
                "shloka": 2,
                "speaker": "sañjaya (सञ्जय)",
                "original": "दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा ।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत् ॥१-२॥",
                "romanised": "drstva tu pandavanikam vyudham duryodhanas tada\nacaryam upasangamya raja vacanam abravit 1.2",
                "english": None,
                "hindi": None,
            },
            {
                "adhyaya": 1,
                "shloka": 8,
                "speaker": "sañjaya (सञ्जय)",
                "original": "भवान्भीष्मश्च कर्णश्च कृपश्च समितिञ्जयः ।\nअश्वत्थामा विकर्णश्च सौमदत्तिस्तथैव च ॥१-८॥",
                "romanised": "bhavan bhismas ca karnas ca krpas ca samitim-jayah\nasvatthama vikarnas ca saumadattis tathaiva ca 1.8",
                "english": None,
                "hindi": None,
            },
            {
                "adhyaya": 1,
                "shloka": 9,
                "speaker": "sañjaya (सञ्जय)",
                "original": "अन्ये च बहवः शूरा मदर्थे त्यक्तजीविताः ।\nनानाशस्त्रप्रहरणाः सर्वे युद्धविशारदाः ॥१-९॥",
                "romanised": "anye ca bahavah sura mad-arthe tyakta-jivitah\nnana-sastra-praharanah sarve yuddha-visaradah 1.9",
                "english": None,
                "hindi": None,
            },
        ],
    }
