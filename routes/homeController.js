const mongoose = require('mongoose');
const express = require('express');
const homeController = express.Router();

var isConnected = false;

mongoose.connect('mongodb://localhost:27017/vidly')
.then(() => isConnected = true)
.catch(err => console.log('Error', err.message));

homeController.get('/', (request, response) => {
    var dbMessage = isConnected ? 'Connected to db' : 'Not connected to db';
    response.render('index', {title: 'My Express App', message: 'Hello Ony !!!, ' + dbMessage});
});

module.exports = homeController;