require('dotenv').config()

module.exports = 
{
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "kanban-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "ffyucykqvrkrxu",
    "password": "7baba23f7b96af681654159dd09351cdbf98c666ecb3c8bc795c4525dc27e8be",
    "database": "dbo4sspnfqqqud",
    "host": "ec2-34-234-228-127.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
