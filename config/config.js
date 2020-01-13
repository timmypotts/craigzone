require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.PASSWORD,
    database: "craigZoneDB",
    host: "localhost",
    port: "3306",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.JAWSDB_PASSWORD,
    password: "mxtkbkp7tra0i32x",
    database: "craigZoneDB",
    port: "3306",
    use_env_variable: "JAWSDB_URL",
    host: "y06qcehxdtkegbeb.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    dialect: "mysql"
  }
};
