const { Client } = require("pg");
const db = new Client({
  //  host: "database-2.c3oj2jnqjpxk.ap-south-1.rds.amazonaws.com",
  host: "192.168.1.7",
  user: "postgres",
  password: "postgres",
  database: "TestDB1",
  port: 5432,
});

db.connect((err) => {
  if (err) {
    console.log("error");
  }
  console.log("Database Connected");
});
db.end();
module.exports.db = db;
