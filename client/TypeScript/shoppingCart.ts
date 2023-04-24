import { ShoppingCart } from "./backendCalls/cart";
//wait for course.ts
/* import {course} from "./course.ts"; */
//get login and register from backendCalls
//import { Login } from "./backendCalls/sendLoginData";
//import { Register } from "./backendCalls/sendRegisterData";
//wait for define the cart btn
const cartBtn = document.querySelector(".cartBtn");
/* no backend done yet, need to check */
const backendUrl = "http://localhost:3001/shoppingCart";
//need to check too
//const loginForm = new Login("#loginForm");
//may not need to use register coz loginform has register button
//const register = new Register("/register");

//get this from login controller, so far save to localStorage
//unable for awhile becuase the login controller is not done yet
/*
let token = "";

function ifUserLogin() {
    // Check if the user is already logged in (has a token)
    token = localStorage.getItem("token");
    const enrollButton = document.querySelectorAll(".enroll-button");
    const loginModal = document.querySelector("#loginButton");
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
window.onload = ifUserLogin;*/

function addShopCart() {
    fetch(`${backendUrl}`)
    .then((response=> response.json())) 
    .then((data) => {
        console.log(data);
        const cartBody = document.querySelector(".cart-body");
        cartBody.innerHTML = "";

        data.forEach((course) => {
            const newDiv = document.createElement("div");
            newDiv.classList.add("cart-item");

            const imageDiv = document.createElement("div");
            imageDiv.classList.add("cart-item-image");

            const image = document.createElement("img");
            image.src = course.image;
            imageDiv.appendChild(image);

            const detailsDiv = document.createElement("div");
            detailsDiv.classList.add("cart-item-details");
            const courseName = document.createElement("h4");
            courseName.innerText = course.name;
            detailsDiv.appendChild(courseName);

            const rightDiv = document.createElement("div");
        rightDiv.classList.add("cart-item-right");
        const removeDiv = document.createElement("div");
        removeDiv.classList.add("cart-item-remove");
        const removeButton = document.createElement("button");
        removeButton.classList.add("btn", "btn-danger");
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeDiv.appendChild(removeButton);
        rightDiv.appendChild(removeDiv);
        
        const priceDiv = document.createElement("div");
        priceDiv.classList.add("cart-item-price");
        const price = document.createElement("h3");
        price.textContent = course.price;

        priceDiv.appendChild(price);
        rightDiv.appendChild(priceDiv);
        
        newDiv.appendChild(imageDiv);
        newDiv.appendChild(detailsDiv);
        newDiv.appendChild(rightDiv);
        cartBody.appendChild(newDiv);
      });
    })
    .catch((err) => {
        console.log(err);
    });
}
addShopCart();

//codepilot code

/*

function addToShopCart() {
    // Get the course id from the URL
    const courseId = window.location.pathname.split("/")[2];
    // Check if user is logged in
    if (!token) {
      return alert("Please log in to enroll course");
    }
    // Check if course exists in database
    fetch(`/course/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Course not found");
        }
        return response.json();
      })
      .then((course) => {
        // Check if course already exists in user's cart
        if (course) {
          return alert("Course already added to cart");
        }
        // Add course to user's cart
        fetch(`/course/add/${courseId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Course not found");
            }
            return response.json();
          })
          .then((data) => {
            alert("Course added to cart");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
}
*/
const enrollButton = document.querySelectorAll(".enroll-button");
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
        addShopCart();
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

