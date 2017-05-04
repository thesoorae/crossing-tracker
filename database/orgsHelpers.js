const dbutils = require('./dbutils.js');

function getOrgs(cb) {
  const query = 'SELECT * FROM org';
  dbutils.runQuery(query, cb);
}

module.exports = {
  getOrgs: getOrgs
}
