require("dotenv").config();
const mysql = require("mysql");
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DEFAULT_SCHEMA } = process.env;

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating mysql connection...");

      const config = {
        connectionLimit: 100,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DEFAULT_SCHEMA,
      };

      if (process.env.NODE_ENV === "production" && process.env.CLOUD_INSTANCE) {
        console.log(`connect socket: ${process.env.CLOUD_INSTANCE}`);
        config.socketPath = `/cloudsql/${process.env.CLOUD_INSTANCE}`;
      }

      this.pool = mysql.createPool(config);

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
