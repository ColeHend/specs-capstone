
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    user_password TEXT
);

CREATE TABLE worlds(
    world_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    world_name VARCHAR(50),
    map_img_link VARCHAR(500)
    
);
CREATE TABLE groups(
    group_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    group_name VARCHAR(240),
    group_desc TEXT

);
CREATE TABLE locations(
    location_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    world_id INT REFERENCES worlds(world_id),
    parent_id INT REFERENCES groups(group_id),
    title VARCHAR(50),
    location_desc TEXT
);
CREATE TABLE marker(
    marker_id SERIAL PRIMARY KEY,
    marker_name VARCHAR(50),
    marker_x INT,
    marker_y INT,
    marker_scale INT,
    user_id INT REFERENCES users(user_id),
    world_id INT REFERENCES worlds(world_id),
    location_id INT REFERENCES locations(location_id)
);

CREATE TABLE characters(
    char_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    location_id INT REFERENCES locations(location_id),
    char_name VARCHAR(240),
    char_desc TEXT
);