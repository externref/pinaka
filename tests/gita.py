import json

import unittest
import requests


class GitaTest(unittest.TestCase):
    def test_shloka_1(self) -> None:
        data = requests.get("http://localhost:8000/bhagavadgita/1/1")
        with self.assertRaises(ConnectionError):
            assert data.json() == {
                "adhyaya": 1,
                "shloka": 1,
                "speaker": "dhṛtarāṣṭra (धृतराष्ट्र)",
                "original": "धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः ।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय ॥ १-१॥",
                "romanised": "dharma-ksetre kuru-ksetre\nsamaveta yuyutsavah\nmamakah pandavas caiva\nkim akurvata sanjaya 1.1",
                "hindi": "TODO",
                "english": "TODO",
            }


if __name__ == "__main__":
    unittest.main()
