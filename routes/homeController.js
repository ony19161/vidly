const mongoose = require('mongoose');
const express = require('express');
const homeController = express.Router();

var isConnected = false;
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type : Date, default : Date.now},
    isPublished: Boolean
});
const Course = mongoose.model('Course', courseSchema);
mongoose.connect('mongodb://localhost:27017/vidly')
.then(() => isConnected = true)
.catch(err => console.log('Error', err.message));

async function CreateCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Amanul Haque',
        tags: ['angular', 'frondend'],
        isPublished: true
    });
    
    const result = await course.save();
}

async function GetCourses() {
    var courses = await Course
    .find({author : 'Amanul Haque', isPublished: true})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log(courses);
    return courses;
}

homeController.get('/', (request, response) => {
    var dbMessage = isConnected ? 'Connected to db' : 'Not connected to db';
    
    
    console.log('Calling GetCourses');
    var courseList = GetCourses();
    console.log(courseList);
    
    response.render('index', {title: 'My Express App', message: 'Hello Ony !!!, ', courseList: courseList });

    
});

module.exports = homeController;