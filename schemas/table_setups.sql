CREATE TABLE IF NOT EXISTS bhagavadgita (
    adhyaya INT NOT NULL, 
    shloka INT NOT NULL, 
    speaker VARCHAR NOT NULL,
    original VARCHAR NOT NULL,
    romanised VARCHAR NOT NULL,
    hindi VARCHAR NOT NULL, 
    english VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id BIGINT NOT NULL, 
    username VARCHAR NOT NULL, 
    display_name VARCHAR NOT NULL,
    avatar VARCHAR NOT NULL,
    passwd VARCHAR NOT NULL,
    access_token VARCHAR NOT NULL,
    current_login_token VARCHAR 
);

CREATE TABLE IF NOT EXISTS shivtandava (
    shloka INT NOT NULL,
    original VARCHAR NOT NULL,
    romanised VARCHAR NOT NULL, 
    hindi VARCHAR NOT NULL, 
    english VARCHAR NOT NULL
)