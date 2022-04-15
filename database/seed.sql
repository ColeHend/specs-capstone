DROP TABLE IF EXISTS users ;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    user_password TEXT
);

CREATE TABLE marker(
    marker_id SERIAL PRIMARY KEY,
    marker_x NUMBER,
    marker_y NUMBER,
    user_id INT REFERENCES users(user_id),
    world_id INT REFERENCES worlds(world_id),
    location_id INT REFERENCES locations(location_id)
)

CREATE TABLE locations(
    location_id SERIAL PRIMARY KEY,
    title VARCHAR(50),
    location_desc TEXT,
    user_id INT REFERENCES users(user_id),
    world_id INT REFERENCES worlds(world_id),
    parent_id INT REFERENCES groups(group_id)

)
CREATE TABLE worlds(
    world_id SERIAL PRIMARY KEY,
    world_name VARCHAR(50),
    map_img_link VARCHAR(500),
    
)
CREATE TABLE world_markers(
    user_id INT REFERENCES users(user_id),
    world_id INT REFERENCES worlds(world_id),
    marker_id INT REFERENCES marker(marker_id),

)
CREATE TABLE groups(
    group_id SERIAL PRIMARY KEY,
)
CREATE TABLE characters(
    char_id SERIAL PRIMARY KEY,
)