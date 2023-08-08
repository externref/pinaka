class Endpoints:
    _INDEX = "/"

    # developer endpoints 
    SLASHN_GENERATOR = "/_dev/slashn/{text}"

    # bhagavadgita shlokas
    BHAGAVADGITA_SHLOKA = "/bhagavadgita/{adhyaya}/{shloka}"
    BHAGAVADGITA_QUERY = "/bhagavadgita/query"

    # shiv tandava strotam
    SHIV_TANDAVA = "/shivtandava"
    SHIV_TANDAVA_SHLOKA = "/shivtandava/{shloka}"


endp = Endpoints()
