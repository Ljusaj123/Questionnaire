const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const express = require('express');

process.env.cfgPath = path.join(__dirname, "web.cfg");

const cfg = JSON.parse(fs.readFileSync(process.env.cfgPath, "utf-8"));

const PORT = cfg.port;
const MONGODB_URI = cfg.mongoDb;

const app = express();

app.use(express.json());

const questionnareRoutes = require("./routes/questionnare.routes.js");

app.use('/', express.static(path.join(__dirname, 'www')));
app.use('/', express.static(path.join(__dirname, 'www/browser')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "www", "index.html"));
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, PATCH, DELETE, OPTIONS, GET, PUT'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.options("/*path", (req, res) => {
  return res.status(200).end();
});

app.use('/questionnare/api', questionnareRoutes);

app.get('/*path', (req, res) => {
    res.sendFile(path.join(__dirname, 'www/browser','index.html'));
});


mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});