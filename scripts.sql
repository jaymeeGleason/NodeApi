CREATE SEQUENCE persona_seq START 1;
CREATE SEQUENCE profile_seq START 1;
CREATE SEQUENCE profile_persona_seq START 1;

CREATE TABLE persona(
    id INTEGER NOT NULL DEFAULT nextval('persona_seq'),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    CONSTRAINT pk_persona PRIMARY KEY(id)
);
CREATE TABLE profile(
    id INTEGER NOT NULL DEFAULT nextval('profile_seq'),
    interests VARCHAR(1000),
    CONSTRAINT pk_profile PRIMARY KEY(id)
);

CREATE TABLE profile_persona(
    id INTEGER NOT NULL DEFAULT nextval('profile_persona_seq'),
    persona_id INTEGER NOT NULL,
    profile_id INTEGER NOT NULL,
    CONSTRAINT pk_profile_persona PRIMARY KEY(id),
    CONSTRAINT fk_persona FOREIGN KEY (persona_id) REFERENCES persona(id),
    CONSTRAINT fk_profile FOREIGN KEY (profile_id) REFERENCES profile(id)
);

-- DROP TABLE persona;
-- DROP TABLE profile;
-- DROP TABLE profile_persona;