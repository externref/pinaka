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
        "romanised": "romanised version of the shloka",
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
        shloka_data: typing.Dict[str, str|int] = response.json()
        # the shloka_data is now a dictionary that contains all the 
        # shloka class data as keys and values
    ```

    **embedded js**
    ```javascript
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

### querying the gita
* Endpoint: `/api/v1/bhagavadgita/query`

fetches multiple shlokas from the API and returns them as a list of Shlokas.

#### PARAMETERS


| Param    | Info                                         | Dtype |
| :--------| :------------------------------------------- | :---- |
| adhyaya  | Adhyaya from which shlokas are to be fetched | int   |
| from     | The shloka number to start fetching from.    | int   |
| to       | The shloka number to stop querying on.       | int   |

??? examples
    **python**
    ```python
    import requests

    res = requests.post(
        "<core endpoint>/bhagavadgita/query", json={"adhyaya": 1, "from": 1, "to": 5}
    )
    res.raise_for_status()
    data = res.json() # data var stores a list of shloka dictionaries.
    ```
    **typescript**
    ```typescript
    import axios from "axios";

    const main = async ()=>{
        var res =  await axios.post("http://localhost:8000/api/v1/bhagavadgita/query",{
        adhyaya: 1, from: 1, to:5
    })
        const data = res.data 
        // data stores Shloka objects in an array
    }

    main()
    ```



