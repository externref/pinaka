import requests
import json 

fdata = open("bin/gita/adhyaya1.json")
data = json.load(fdata)

import os





for shloka, d in data.items():
    res=requests.post("http://localhost:8000/dev/addshloka", json={
        "password": os.environ["ADMIN_PASS"],
        "adhyaya": 1, 
        "shloka": int(shloka),
        "speaker": d["speaker"],
        "original": d["original"],
        "romanised": d["romanised"],
        "hindi": "TODO",
        "english": "TODO"
    }, headers={"content-type": "application/json"})
    print(f"shloka: {shloka}: {res.status_code}")
