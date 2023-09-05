<img
   src="../assets/tandava_banner_text.png"
  />

Shlokas from the Shiva Tandava Strotam are stored as _TandavaShloka_ objects.

???+ example "structure of a TandavaShloka object"
`json
    {
        "shloka": 1,
        "original": "जटाटवीगलज्जलप्रवाहपावितस्थले\nगलेऽवलम्ब्य लम्बितां भुजङ्गतुङ्गमालिकाम् ।\nडमड्डमड्डमड्डमन्निनादवड्डमर्वयं\nचकार चण्डताण्डवं तनोतु नः शिवः शिवम् ॥१॥",
        "romanised": "Jatatavigalajjala pravahapavitasthale\nGaleavalambya lambitam bhujangatungamalikam\nDamad damad damaddama ninadavadamarvayam\nChakara chandtandavam tanotu nah shivah shivam"
    }
    `

## Endpoints

### fetching a shloka

- Endpoint: `/shivtandava/{shloka}`

Queries a particular shloka from the strotam using it's index number.
a 404 error is returned if the index is invalid (>17). For querying shlokas in group see the next endpoint.

### fetching the entire strotam

- Endpoint: `/shivtandava`

Entire shloka in form of a list of TandavaShloka objects is returned.
