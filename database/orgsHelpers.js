const dbutils = require('./dbutils.js');

function getOrgs(cb) {
  const query = 'SELECT org_id,org_name From org';
  dbutils.runQuery(query, cb);
}

module.exports = {
  getOrgs: getOrgs
}
