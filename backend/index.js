const express = require("express");
const app = express();
const port = 5000;
const mongoDB = require("./db")

mongoDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//added mandatory cors part 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


app.use(express.json());
app.use('/api' ,require('./routes/CreateUser'));
app.use('/api', require('./routes/DataDisplay'));
app.use("/api", require("./routes/OrderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
 