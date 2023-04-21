import { ShoppingCart } from "./backendCalls/cart";
//wait for course.ts
/* import {course} from "./course.ts"; */
//get login and register from backendCalls
import { Login } from "./backendCalls/sendLoginData";
import { Register } from "./backendCalls/sendRegisterData";
//wait for define the cart btn
const cartBtn = document.querySelector(".cartBtn");
/* no backend done yet, need to check */
const backendUrl = "http://localhost:3001/shoppingCart";
//need to check too
const login = new Login("#loginForm");
//may not need to use register coz loginform has register button
const register = new Register("/register");

//get this from login controller, so far save to localStorage
let token = "";

function ifUserLogin() {
    // Check if the user is already logged in (has a token)
    token = localStorage.getItem("token");
    const enrollButton = document.querySelectorAll(".enroll-button");
    const loginForm = document.querySelector("#loginButton");
    if (token) {
      // User is already logged in, enable the enroll button
      enrollButton.forEach((enrollButton) => {
        enrollButton.removeAttribute("disabled");
      });
    } else {
      // User is not logged in, disable the enroll button
      const loginModal = document.querySelector('#loginForm');
        const bsModal = new bootstrap.Modal(loginModal, { keyboard: false });
        bsModal.show(); 
      enrollButton.forEach((enrollButton) => {
        enrollButton.setAttribute("disabled", "true");
      });
    }
  }

  // Call checkLoginStatus on page load
window.onload = ifUserLogin;

const enrollButton = document.querySelectorAll("enroll-button");
enrollButton.forEach(async (enrollButton) => {
    enrollButton.addEventListener("click",async() => {
    //check if user log in
    if (token) {
        //need to know the userid setting and courseid setting
        const userId = localStorage.getItem("id_user");
        const courseId = enrollButton.getAttribute("id_course");
    
        //need to know add to cart or others is course/add or "/add-to-cart"
    fetch(`/course/add/${courseId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }, 
        body: JSON.stringify({
            userId,
            courseId,
        }),
    })
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
    }else {
        // show the login modal by selecting the modal element using its ID (#loginModal) 
        //in html is loginForm
        const loginModal = document.querySelector('#loginForm');
        const bsModal = new bootstrap.Modal(loginModal, { keyboard: false });
        bsModal.show();
    } 
    });
});



 
   
/* click cartbtn then will show cart item */
/* cartBtn.addEventListener("click", () => {
  shoppingCart.style.display = "block";
  console.log("Cart button clicked");
}); */

/*fetch(backendUrl, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        accept: "application/json",
}).then(res=>res.json())
.then(data=>{
    data.forEach(courses=>{
        const div = document.createElement("div");
        div.classList.add("course name");
        div.setAttribute("course-id", courses.id);
        div.innerHTML = 
        ` <h3>${courses.name}</h3> 
          <span class="price">€${courses.price}</span> `;

    })
}) */
/* find server */
fetch("/shoppingCart")

