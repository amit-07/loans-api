var http = require("http");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://akd_admin:9zXw5pTotcLIPIRS@cluster0.6xjdl.mongodb.net/loans_db?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected to db");
  const collection = client.db("loans_db").collection("loandetails");
  // Make sure you place body-parser before your CRUD handlers!
  app.use(bodyParser.urlencoded({ extended: true }));

  // All your handlers here...
  app.get("/", (req, res) => {
    res.write("Hello World!"); //write a response to the client
    res.end();
  });
  // perform actions on the collection object
  app.post("/loans", (req, res) => {
    collection
      .insertOne(req.body)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.error(error));
  });
  client.close();
});

// http
//   .createServer(function (req, res) {
//      //end the response
//   })
//   .listen(8080); //the server object listens on port 8080
