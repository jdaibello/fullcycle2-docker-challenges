const express = require("express");
const app = express();
const port = 3000;
const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};
const mysql = require("mysql");
const connection = mysql.createConnection(config);

const sql_create_table = `CREATE TABLE IF NOT EXISTS people(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY ( id )
)`;
connection.query(sql_create_table);

const sql_insert = `INSERT INTO people(name) VALUES('João')`;
connection.query(sql_insert);

const sql_get_all = `SELECT * FROM people`;

app.get("/", (req, res) => {
  let html = "<h1>Full Cycle</h1><ul>";
  connection.query(sql_get_all, function (err, result) {
    result.forEach((row) => {
      html += `<li> ID : ${row["id"]} NOME : ${row["name"]}</li>`;
    });
    html += "</ul>";
    return res.send(html);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
