<img
   src="../assets/gita_banner_text.png"
   width="90%"
  />

**Core endpoint**: `/api/v1/bhagavadgita`

Shlokas of the Bhagavad Gita are stored as *Shloka* objects.

???+ example "structure of a Shloka object"
    ```json
    {
        "adhyaya": 0,
        "shloka": 0,
        "speaker": "the speaker of the shloka",
        "original": "the actual shloka",
        "romainised": "romanised version of the shloka",
        "hindi": "hindi translation of the shloka",
        "english": "english translation of the shloka"
    }
    ```

??? question "view in source"
    ```ts
    export interface Shloka {
        adhyaya: Number;
        shloka: Number;
        speaker: String;
        original: String;
        romanised: String;
        hindi: String;
        english: String;
    }
    ```

Endpoints
---------

### fetching a shloka
* Endpoint: `/api/v1/bhagavadgita/:adhyaya/:shloka`

Fetches the shloka number from the provided adhyaya number, the shloka and adhyaya number must be positive integer values.
If no data for the requested values are found a `404` status is returned.


??? examples 
    **python:**
    ```python
    import requests

    response = requests.get( "<core endpoint>/bhagavadgita/1/1")
    if response.status_code == 404:
        print("No data found.")
    else:
        shloka_data: dict[str, str|int] = response.json()
        # the shloka_data is now a dictionary that contains all the 
        # shloka class data as keys and values
    ```

    **typescript**
    ```typescript
    const req = new XMLHttpRequest()
    req.open("GET", "<core endpoint>/bhagavadgita/1/1")
    req.onload = () => {
        if (req.status === 404) console.log("Data not found.")
        else {
            let shlokaData = JSON.parse(req.responseText)
            // the shloka_data is now a dictionary that contains all the 
            // shloka class data as keys and values
        }
    }
    req.send()
    ```