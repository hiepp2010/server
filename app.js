const express = require("express");
const app = express();
const port = 4000;
const sql = require("mysql2");

const connection = sql.createConnection({
  host: "localhost:3306",
  user: "admin",
  database: "denso",
});

app.use(express.json());

app.post("/score", async (req, res) => {
  score = req.body.score;
  time = req.body.time;
  connection.query(`insert into score values(\'${time}\',${score})`);
});

app.post("/", async (req, res) => {
  res.send("hello world");
  time = req.body.timestamp;
  elec = req.body.value;
  co2 = req.body.CO2;
  temperature = req.body.temperature;
  score = req.body.score;
  console.log(req.body);
  connection.query(`insert into elec values(\'${time}\',${elec})`);
  connection.query(`insert into co2 values(\'${time}\',${co2})`);
  connection.query(`insert into temp values(\'${time}\',${temperature})`);
  value = [];
  value.push(elec);
  value.push(co2);
  value.push(temperature);
  data = { numbers: value, time: time };
  await axios
    .post("http://localhost:8000", data)
    .then((response) => {
      //receive response
      console.log("ok", JSON.stringify(data));
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, async () => {
  await sql.connect(sqlConfig);
  console.log("ok");
});
