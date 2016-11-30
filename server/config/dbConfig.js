// Settings for database access.
const dbConfig = {
  username: process.env['DBUSER'],
  password: process.env['DBPASSWORD'],
  database: process.env['DBNAME'],
  domain: process.env['DBURL'],
  port: process.env['DBPORT']
}

// Store database connection string in dbConfig.
dbConfig['CONN_STRING'] = 'mongodb://' + dbConfig.username + ':' + dbConfig.password + '@' + dbConfig.domain + ':' + dbConfig.port + '/' + dbConfig.database;

// Export database configuration.
module.exports = dbConfig;
