import { Course } from './backendCalls/course.js';
import { Courses } from './backendCalls/handleCourses.js';
import { Cookies } from './backendCalls/sendLoginData.js';

const backendUrl = "http://localhost:3001/course";
const shoppingCartUrl = "http://localhost:3001/cart";

const courses = new Courses(backendUrl);

const contentDiv = document.getElementById("content") as HTMLDivElement;

//get all stories from the database
const renderCourses = (course: Course) => {
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
  
	const button = courseDiv.querySelector(".buy-btn");
  
	if (button) {
	  button.addEventListener("click", async () => {
		const cookie = new Cookies();
		const isLoggedIn = cookie.isCookieSet("session_token");
		if (isLoggedIn) {
		  const token = cookie.getCookie("session_token");
		  const decodedToken = JSON.parse(atob(token.split('.')[1])); //eyJ1c2VybmFtZSI6IlNjYXJsZXQiLCJpYXQiOjE2ODI1ODM5MjMsImV4cCI6MTY4MjU4NTcyM30
		  const userId = decodedToken.userid; // access the userid field from the decoded payload
		  //const userId = decodedToken.id_user; //4 
			alert(userId); //cant get user id 
		  const courseId = course.id_course;
/* 		  const userId = decodedToken.user_id;
		  console.log(userId); */

		 try {
			const response = await fetch(`${shoppingCartUrl}/add-to-cart?userId={userId}`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			  },
			  //4/26 change, due to it put course id as user id, change this and the backend code 
			  body: JSON.stringify({ userId, courseId }),
			 //old code
			  //body: JSON.stringify({ userId, courseId }),
			}); 
			if (response.ok) {
			  alert("Course added to shopping cart!");
			} else {
			  alert("There was an error adding the course to the shopping cart");
			}
		  } catch (error) {
			console.log(error);
		  }
		} else {
		  alert("You need to be logged in to add a course to the shopping cart");
		}
	});
	}
};

courses.getCourses().then((courses : Course[]) => {
	courses.forEach((course: Course) => {
		renderCourses(course);
	});
})
.catch((error) => {
	console.log(error);
});

