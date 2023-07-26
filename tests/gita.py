from fastapi.testclient import TestClient

from src.app import app

client = TestClient(app)


def first_shloka() -> None:
    response = client.get("/bhagavadgita/1/1")
    assert response.json() ==  {
    "adhyaya": 1,
    "shloka": 1,
    "speaker": "dhṛtarāṣṭra (धृतराष्ट्र)",
    "original": "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥",
    "romanised": "dharma-ksetre kuru-ksetre\nsamaveta yuyutsavah\nmamakah pandavas caiva\nkim akurvata sanjaya 1.1",
    "hindi":None,
    "english": None,
}
    
first_shloka()


