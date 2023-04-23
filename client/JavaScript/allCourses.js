import { Courses } from './backendCalls/handleCourses.js';
const backendUrl = "http://localhost:3001/course";
const courses = new Courses(backendUrl);
const contentDiv = document.getElementById("content");
const courseCard = document.querySelector(".product-card");
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
    courseDiv.classList.add("product-card");
    courseDiv.innerHTML = `
      <div id="priceInSpan" class="ribbon ribbon-top-right"><span></span></div>
      <img id="courseMainImage" alt="Product image">
      <h3 id="courseTitle"></h3>
      <p id="courseDescription"></p>
      <a href="courseDetails.html?id=" + ${course.id_course} class="view-more">View more</a>
      <button class="buy-btn">Enroll now</button>
      <div class="star-container">
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
      </div>
    `;
    contentDiv.appendChild(courseDiv);
    const spanPrice = courseDiv.querySelector("#priceInSpan span");
    const mainImage = courseDiv.querySelector("#courseMainImage");
    const courseTitle = courseDiv.querySelector("#courseTitle");
    const courseDescription = courseDiv.querySelector("#courseDescription");
    spanPrice.innerHTML = "$ " + String(course.price_month) + " / month";
    mainImage.src = `./images/${course.name_image1}`;
    courseTitle.innerHTML = course.course_name;
    courseDescription.innerHTML = course.course_description;
};
