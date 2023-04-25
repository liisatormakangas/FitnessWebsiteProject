import { Courses } from './backendCalls/handleCourses.js';
import { Cookies } from './backendCalls/sendLoginData.js';
const backendUrl = "http://localhost:3001/course";
const courses = new Courses(backendUrl);
const contentDiv = document.getElementById("content");
//get all stories from the database
courses.getCourses().then((courses) => {
    courses.forEach((course) => {
        renderCourses(course);
    });
})
    .catch((error) => {
    alert(error);
});
const renderCourses = (course) => {
    const courseDiv = document.createElement("div");
    courseDiv.id = String(course.id_course);
    courseDiv.className = "courseId";
    const productCard = document.createElement("div");
    productCard.className = "product-card";
    const courseImage = document.createElement("img");
    courseImage.className = "courseMainImage";
    courseImage.alt = "Product image";
    courseImage.src = `./images/${course.name_image1}`;
    productCard.appendChild(courseImage);
    const span = document.createElement("div");
    span.id = "priceInSpan";
    span.className = "ribbon ribbon-top-right";
    const price = document.createElement("span");
    price.innerHTML = "$ " + String(course.price_month) + " / month";
    span.appendChild(price);
    productCard.appendChild(span);
    const courseName = document.createElement("h3");
    courseName.id = "courseTitle";
    courseName.innerHTML = course.course_name;
    productCard.appendChild(courseName);
    const courseDescript = document.createElement("p");
    courseDescript.id = "courseDescription";
    courseDescript.innerHTML = course.course_description;
    productCard.appendChild(courseDescript);
    const viewMore = document.createElement("a");
    viewMore.href = "courseDetails.html?id=" + course.id_course;
    viewMore.className = "view-more";
    viewMore.innerHTML = "View more";
    productCard.appendChild(viewMore);
    const enrollBtn = document.createElement("button");
    enrollBtn.className = "buy-btn";
    enrollBtn.innerHTML = "Enroll now";
    productCard.appendChild(enrollBtn);
    const starContainer = document.createElement("div");
    starContainer.className = "star-container";
    starContainer.innerHTML = `
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`;
    productCard.appendChild(starContainer);
    courseDiv.appendChild(productCard);
    contentDiv.appendChild(courseDiv);
    enrollBtn.addEventListener("click", () => {
        const cookie = new Cookies();
        const isLoggedIn = cookie.isCookieSet("session_token");
        if (isLoggedIn) {
            const token = cookie.getCookie("session_token");
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const username = decodedToken.username;
            //here are now the variables username and id_course that we need to send to the backend
            console.log(course.id_course);
            console.log(username);
        }
        else {
            alert("You need to be logged in to enroll in a course");
        }
    });
};