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

Endpoints
---------

### fetching a shloka
* Endpoint: `/api/bhagavadgita/{adhyaya}/{shloka}`

Fetches the shloka number from the provided adhyaya number, the shloka and adhyaya number must be positive integer values.
If no data for the requested values are found a `404` status is returned.


### querying the gita
* Endpoint: `/api/bhagavadgita/{adhyaya}`

fetches multiple shlokas from the API and returns them as a list of Shlokas.

#### PARAMETERS


| Param    | Info                                         | Dtype |
| :--------| :------------------------------------------- | :---- |
| range    | Range of shlokas to be fetched               | [int, int]   |
| shlokas  | The shloka number of the shlokas to fetch    | [int, ...]   |





