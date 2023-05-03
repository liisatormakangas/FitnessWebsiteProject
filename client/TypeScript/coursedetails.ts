import { Course } from './backendCalls/course.js';
import { Courses } from './backendCalls/handleCourses.js';

const backendUrl = "http://localhost:3001/course";

const courses = new Courses(backendUrl);
const courseName = document.getElementById("navcourseName") as HTMLUListElement;
const courseTitle = document.getElementById("courseTitle") as HTMLDivElement;
//const courseVideo = document.getElementById("courseVideo") as HTMLVideoElement;
const courseTrainer_image_name = document.getElementById("trainerImage") as HTMLImageElement;
const courseTrainerName = document.getElementById("courseTrainerName") as HTMLDivElement;
const courseDescription = document.getElementById("courseDescription") as HTMLParagraphElement;
const scheduleWeekday = document.getElementById("scheduleWeekday") as HTMLHeadingElement;
const scheduleWeekend = document.getElementById("scheduleWeekend") as HTMLHeadingElement;
const courseTimeWeek = document.getElementById("courseTimeWeek") as HTMLUListElement;
const courseTimeWeekend = document.getElementById("courseTimeWeekend") as HTMLUListElement;
const courseAvailability = document.getElementById("courseAvailability") as HTMLUListElement;
const coursePriceMonth = document.getElementById("coursePriceMonth") as HTMLUListElement;


const queryParams = new URLSearchParams(window.location.search);
const id_course = Number(queryParams.get('id'));


// get the course with given id from the database
courses.getCourseById(id_course).then((course: Course) => {
    renderCourse(course);
})
.catch((error: any) => {
    alert(error);
    });

const renderCourse = (course: Course) => {
    courseName.innerText = course.course_name;
    courseTitle.innerText = course.course_name;
    //courseVideo.src = `./images/${course.video_name}`;
    courseTrainer_image_name.src = `./images/${course.trainer_image_name}`;
    courseTrainerName.innerText = course.trainer_name;
    courseDescription.innerText = course.course_description;
    scheduleWeekday.innerText = course.weekdays;
    scheduleWeekend.innerText = course.weekends;
    courseTimeWeek.innerText = course.weekday_duration;
    courseTimeWeekend.innerText = course.weekend_duration;
    courseAvailability.innerText = course.available_seats.toString();
    coursePriceMonth.innerText = `${course.price_month} € / Month`; 
    //courseImages2.src = `./images/${course.extra_image2}`;
    //courseImages3.src = `./images/${course.extra_image3}`;
    //courseImages4.src = `./images/${course.extra_image4}`;
	//coursePrice.innerText = `$ ${course.price_year}`; 
    
}