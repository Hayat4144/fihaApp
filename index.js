const mongoose = require("mongoose");
const epxress = require("express");
const app = epxress();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cookiParser = require("cookie-parser");
const router = require("./Routes/route");
const dotenv = require('dotenv').config() ;
const path = require('path');

const cors = require('cors');   // for development mode    

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected"))
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000 ;

app.use(cors()); // for only development mode 

app.use(cookiParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(router);

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
 app.use(epxress.static('client/build'));
 app.get('*', (req, res) => {
 res.sendFile(path.join(__dirname + '/client/build/index.html'));
 });
}


app.listen(PORT, () => {
  console.log(`running at ${PORT}`);
});
