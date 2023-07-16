API_CORE = "/api/v1"


class Endpoints:
    _INDEX = "/"

    # bhagavadgita shlokas
    BHAGAVADGITA_SHLOKA = API_CORE + "/bhagavadgita/{adhyaya}/{shloka}"
    BHAGAVADGITA_QUERY = API_CORE + "/bhagavadgita/query"


endp = Endpoints()
