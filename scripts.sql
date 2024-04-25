CREATE SEQUENCE persona_seq START 1;
CREATE SEQUENCE profile_seq START 1;
CREATE SEQUENCE product_seq START 1;

CREATE TABLE profile(
    id INTEGER NOT NULL DEFAULT nextval('profile_seq'),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    CONSTRAINT pk_profile PRIMARY KEY(id)
);

CREATE TABLE persona(
    id INTEGER NOT NULL DEFAULT nextval('persona_seq'),
    profile_id INTEGER NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    interests VARCHAR(1000),
    CONSTRAINT pk_persona PRIMARY KEY(id),
    CONSTRAINT fk_profile FOREIGN KEY (profile_id) REFERENCES profile(id)

);

CREATE TABLE product(
    id INTEGER NOT NULL DEFAULT nextval('product_seq'),
    persona_id INTEGER NOT NULL,
    description VARCHAR(500),
    CONSTRAINT pk_product PRIMARY KEY(id),
    CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES persona(id)
);

-- DROP TABLE persona;
-- DROP TABLE profile;
-- DROP TABLE profile_persona;