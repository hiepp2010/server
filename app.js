const express = require("express");
const app = express();
const port = 4000;
const sql = require("mssql");
const sqlConfig = {
  user: "sa",
  password: "123456",
  database: "Grafana",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

app.use(express.json());

app.post("/", async (req, res) => {
  res.send("hello world");
  time = req.body.time;
  elec = req.body.elec;
  console.log(req.body);
  await sql.query(`insert into elec values(\'${time}\',${elec})`);
});
 
app.listen(port, async () => {
  await sql.connect(sqlConfig);
  console.log("ok");
});
