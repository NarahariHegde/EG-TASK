import { createConnection } from "mysql2";

const connection = createConnection({
  host: "sql6.freesqldatabase.com",
  user: "sql6696775",
  password: "ifr4qgqB1k",
  database: "sql6696775",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err.message);
  } else {
    console.log("Connected successfully!");
  }
});

export const query = async (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
