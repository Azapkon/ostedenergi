// app.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const saltRounds = 10;

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const adminSchema = new mongoose.Schema({
  username: String,
  password: String
});

const Admin = mongoose.model('Admin', adminSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

app.post('/admin', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    const newAdmin = new Admin({
      username: req.body.username,
      password: hash
    });
    newAdmin.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Admin kaydedildi');
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server çalışıyor...');
});
