import {Course } from './backendCalls/course.js';
import { Courses } from './backendCalls/handleCourses.js';

const backendUrl = "http://localhost:3001/course";

const courses = new Courses(backendUrl);
const courseTittle = document.getElementById("courseTittle");
const courseVideo = document.getElementById("courseVideo");
const courseTrainer = document.getElementById("courseTrainer");
const courseTrainerName = document.getElementById("courseTrainerName");
const courseDescription = document.getElementById("courseDescription");
const courseSchedule = document.getElementById("courseSchedule");
const courseImages = document.getElementById("courseImages");
const coursePrice = document.getElementById("coursePrice");