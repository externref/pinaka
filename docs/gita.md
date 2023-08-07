<img
   src="../assets/gita_banner_text.png"
   width="90%"
  />

Shlokas of the Bhagavad Gita are stored as *GitaShloka* objects.

???+ example "structure of a GitaShloka object"
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
    ```py
    @attrs.define(kw_only=True)
    class GitaShloka:
        adhyaya: int
        shloka: int
        speaker: str
        original: str
        romanised: str
        english: str | None
        hindi: str | None
    ```

Endpoints
---------

### fetching a shloka
* Endpoint: `/bhagavadgita/{adhyaya}/{shloka}`

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
* Endpoint: `/bhagavadgita/query`

fetches multiple shlokas from the API and returns them as a list of Shlokas.

#### PARAMETERS


| Param    | Info                                         | Dtype |
| :--------| :------------------------------------------- | :---- |
| adhyaya  | Adhyaya from which shlokas are to be fetched | int   |
| range    | Range of shlokas to be fetched               | [int, int]   |
| shlokas  | The shloka number of the shlokas to fetch    | [int, ...]   |

??? examples
    **python**
    ```python
    import requests

    res = requests.post(
        "<core endpoint>/bhagavadgita/query", json={"adhyaya": 1, "range": [1, 5]}
    )
    res.raise_for_status()
    data = res.json() # data var stores a list of shloka dictionaries.
    ```
    **typescript**
    ```typescript
    import axios from "axios";

    const main = async ()=>{
        var res =  await axios.post("<core endpoint>/bhagavadgita/query",{
        adhyaya: 1, shlokas: [1, 3, 4, 9]
    })
        const data = res.data 
        // data stores GitaShloka objects in an array
    }

    main()
    ```



