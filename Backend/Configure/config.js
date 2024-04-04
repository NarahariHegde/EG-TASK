import { createConnection } from "mysql2";

const connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yoga_brochure",
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
