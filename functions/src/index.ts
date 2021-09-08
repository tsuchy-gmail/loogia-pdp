const functions = require("firebase-functions");
const express = require("express");
const basicAuth = require("basic-auth-connect");

const app = express();
const USER = encodeURIComponent(functions.config().auth.user);
const PASSWORD = encodeURIComponent(functions.config().auth.password);

app.all(
  "/*",
  basicAuth(
    (user: string, password: string) => user === USER && password === PASSWORD
  )
);

app.use(express.static(__dirname + "/build/"));

exports.app = functions.https.onRequest(app);
