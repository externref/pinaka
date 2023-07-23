Shlokas from the Shiva Tandava Strotam are stored as *TandavaShloka* objects.

???+ example "structure of a TandavaShloka object"
    ```json
    {
        "shloka": 1,
        "original": "जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥१॥",
        "romanised": "Jatatavigalajjala pravahapavitasthale\nGaleavalambya lambitam bhujangatungamalikam\nDamad damad damaddama ninadavadamarvayam\nChakara chandtandavam tanotu nah shivah shivam"
    }
    ```

??? question "view in source"
    ```py
    @attrs.define(kw_only=True)
    class TandavaShloka(AttrsClassToPayload):
        shloka: int
        original: str
        romanised: str
    ```

Endpoints
---------

### fetching a shloka
* Endpoint: `/shivtandava/{shloka}`

Queries a particular shloka from the strotam using it's index number.
a 404 error is returned if the index is invalid (>17). For querying shlokas in group see the next endpoint.

??? examples 
    **python:**
    ```python
    import requests

    response = requests.get("<core endpoint>/shivtandava/1")
    if response.status_code == 404:
        print("No data found.")
    else:
        shloka_data: dict[str, str | int] = response.json()
        # the shloka_data is now a dictionary that contains all the
        # shloka class data as keys and values
    ```

    **embedded js**
    ```javascript
    const req = new XMLHttpRequest()
    req.open("GET", "<core endpoint>/shivtandava/1")
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

### fetching the entire strotam
* Endpoint: `/shivtandava`

Entire shloka in form of a list of TandavaShloka objects is returned.

??? examples 
    **python:**
    ```python
    import requests

    response = requests.get("<core endpoint>/shivtandava")
    if response.status_code == 404:
        print("No data found.")
    else:
        shloka_data: list[dict[str, str | int]] = response.json()
        # the shloka_data is now a dictionary that contains all the
        # shloka class data in a list
    ```

    **embedded js**
    ```javascript
    const req = new XMLHttpRequest()
    req.open("GET", "<core endpoint>/shivtandava")
    req.onload = () => {
        if (req.status === 404) console.log("Data not found.")
        else {
            let shlokaData = JSON.parse(req.responseText)
            // the shloka_data is now a dictionary that contains all the 
            // shloka class data in an array
        }
    }
    req.send()
    ```
