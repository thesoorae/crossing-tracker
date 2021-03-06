const dbutils = require('./dbutils.js');
const hash = require('../backend/hashing.js');

function getuserbyemail(email, cb) {
  const query = `SELECT
  user_id,username,
  email,password,
  phone,org_id,
  user_type,
  approved
  FROM users
  WHERE email=$1`;
  dbutils.runQuery(query, [email], cb)
}
function getuserbyid(userid, cb) {
  const query = `SELECT
  username,
  email,password,
  phone,org_id,
  user_type,
  approved
  FROM users
  WHERE user_id=$1`;
  dbutils.runQuery(query, [userid], cb)
}

function getuserbyusername(username, cb) {
  const query = `SELECT
  user_id,username,
  email,password,
  phone,org_id,
  user_type,
  approved
  From users WHERE username=$1`;
  dbutils.runQuery(query, [username], cb)
}
function changestatus(email, cb) {
  const query = `UPDATE users
SET approved=1 WHERE email=$1`
  dbutils.runQuery(query, [email], cb)
}
function deletUser(email, cb) {
  const query = 'DELETE FROM users WHERE email=$1'
  dbutils.runQuery(query, [email], cb)
}
function getDisApprovedUser(cb) {
  const query = `select users.username,
  users.email,
  users.phone,
  o.org_name as org_id from users,
  org o where approved=$1 and users.org_id=o.org_id;`
  dbutils.runQuery(query, ['0'], cb)
}

function createuser(data, cb) {
  hash.make(data.password)
    .then(hsh => {
      const query = `INSERT INTO users
    (
      username,
      email,
      password,
      phone,
      org_id
    )
    values
    (
      $1, $2, $3, $4, $5
    )
    `;
      dbutils.runQuery(
        query, [
          data.username,
          data.email,
          hsh,
          data.phone,
          data.org_id
        ], cb);
    });
}

module.exports = {
  getuserbyemail: getuserbyemail,
  getuserbyusername: getuserbyusername,
  createuser,
  changestatus,
  deletUser,
  getDisApprovedUser,
  getuserbyid

}
