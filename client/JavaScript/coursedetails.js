var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Courses } from './backendCalls/handleCourses.js';
import { Cookies } from './backendCalls/sendLoginData.js';
const backendUrl = "http://localhost:3001/course";
const shoppingCartUrl = "http://localhost:3001/cart";
const courses = new Courses(backendUrl);
const courseNavbarName = document.getElementById("courseNameNav");
const courseTitle = document.getElementById("courseTitle");
//const courseVideo = document.getElementById("courseVideo") as HTMLVideoElement;
const courseTrainer_image_name = document.getElementById("trainerImage");
const courseTrainerName = document.getElementById("courseTrainerName");
const courseDescription = document.getElementById("courseDescription");
const courseScheduleWeek = document.getElementById("courseScheduleWeek");
const courseScheduleWeekend = document.getElementById("courseScheduleWeekend");
const courseTimeWeek = document.getElementById("courseTimeWeek");
const courseTimeWeekend = document.getElementById("courseTimeWeekend");
const coursePlaces = document.getElementById("placesAvailable");
const courseImages1 = document.getElementById("courseImages1");
const courseImages2 = document.getElementById("courseImages2");
const courseImages3 = document.getElementById("courseImages3");
const courseImages4 = document.getElementById("courseImages4");
const coursePricePerMonth = document.getElementById("pricePerMonth");
const coursePricePerYear = document.getElementById("pricePerYear");
const queryParams = new URLSearchParams(window.location.search);
const id_course = Number(queryParams.get('id'));
// get the course with given id from the database
courses.getCourseById(id_course).then((course) => {
    renderCourse(course);
})
    .catch((error) => {
    alert(error);
});
const renderCourse = (course) => {
    courseNavbarName.innerText = course.course_name;
    courseTitle.innerText = course.course_name;
    //courseVideo.src = `./videos/${course.video_name}`;
    courseTrainer_image_name.src = `./images/${course.trainer_image_name}`;
    courseTrainerName.innerText = course.trainer_name;
    courseDescription.innerText = course.course_description;
    courseScheduleWeek.innerText = course.weekdays;
    courseScheduleWeekend.innerText = course.weekends;
    courseTimeWeek.textContent = course.weekday_duration;
    courseTimeWeekend.textContent = course.weekend_duration;
    coursePlaces.innerHTML = String(course.available_seats);
    //courseImages1.src = `./images/${course.name_image1}`;
    courseImages2.src = `./images/${course.extra_image2}`;
    courseImages3.src = `./images/${course.extra_image3}`;
    courseImages4.src = `./images/${course.extra_image4}`;
    coursePricePerMonth.textContent = ` $ ${course.price_month} / month`;
    coursePricePerYear.textContent = ` $ ${course.price_year} / year`;
    const courseEnrollButton = document.getElementById("courseEnrollButton");
    courseEnrollButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        const cookie = new Cookies();
        const isLoggedIn = cookie.isCookieSet("session_token");
        if (isLoggedIn) {
            const token = cookie.getCookie("session_token");
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userid;
            const courseId = course.id_course;
            console.log(userId, courseId);
            try {
                const response = yield fetch(`${shoppingCartUrl}/add-to-cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ userId, courseId }),
                });
                if (response.ok) {
                    alert("Course added to shopping cart!");
                }
                else {
                    alert("There was an error adding the course to the shopping cart");
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert("You need to be logged in to add a course to the shopping cart");
        }
    }));
};
