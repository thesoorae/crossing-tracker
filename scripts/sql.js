const org = `CREATE TABLE IF NOT EXISTS org (
  org_id serial PRIMARY KEY,
  org_name varchar(50)
);`;
const usertype = `CREATE TABLE IF NOT EXISTS usertype (
  usertype_id INT PRIMARY KEY,
  usertype varchar(25)
);`;
const location = `CREATE TABLE IF NOT EXISTS location (
    location_id serial PRIMARY KEY,
    location_name varchar(50)
  );`;
const users = `CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY ,
    username varchar(25),
    email varchar(100) UNIQUE,
    password varchar(255),
    phone varchar(15),
    org_id INT references org(org_id),
    user_type INT references usertype(usertype_id) DEFAULT 3,
    approved INT  DEFAULT 0
  );`;
const trip = `CREATE TABLE IF NOT EXISTS trip (
    trip_id serial PRIMARY KEY,
    location_from_id INT references location(location_id),
    location_to_id INT references location(location_id),
    time varchar(30),
    date varchar(30),
    pass_point_time varchar(30),
    passing_by varchar(50),
    user_id INT references users(user_id),
    available_seats int
  );`;
const usertrip = `CREATE TABLE IF NOT EXISTS usertrip (
  id serial PRIMARY KEY,
  user_id INT references users (user_id),
  trip_id INT references trip(trip_id)
);`;
module.exports = {
  users,
  trip,
  usertrip,
  org,
  location,
  usertype
}
