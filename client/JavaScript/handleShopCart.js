var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Cookies } from './backendCalls/sendLoginData.js';
// URL of the backend endpoints
//const backendUrl = "http://localhost:3001/course";
const shoppingCartUrl = "http://localhost:3001/cart";
//const courses = new Courses(backendUrl);
const cartContentDiv = document.getElementById("cart-content");
const totalPriceDiv = document.getElementById("total-price");
/* alert(totalPriceDiv); */
// Get user id from cookie
const cookie = new Cookies();
const isLoggedIn = cookie.isCookieSet("session_token");
if (isLoggedIn) {
    const token = cookie.getCookie("session_token");
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const userId = decodedToken.userid;
    //console.log(userId);
    // Fetch the cart items from backend
    fetch(`${shoppingCartUrl}/${userId}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Unable to retrieve cart items.");
        }
        return response.json();
    })
        .then((cartItems) => {
        //5-3 new code for fix can not show empty shopping cart
        if (cartItems.length === 0) {
            const emptyCartInfo = document.createElement("h3");
            emptyCartInfo.innerHTML = "You have no courses in your shopping cart";
            cartContentDiv.appendChild(emptyCartInfo);
            totalPriceDiv.innerHTML = `Total price: 0`;
            //end at here}
        }
        else {
            cartItems.forEach((cartItem) => {
                renderCartItem(cartItem);
            });
            const totalPrice = cartItems.reduce((total, cartItem) => {
                const itemPrice = parseFloat(cartItem.price_month);
                return total + itemPrice;
            }, 0);
            if (isNaN(totalPrice)) {
                totalPriceDiv.innerHTML = `Total price: 0`;
            }
            else {
                totalPriceDiv.innerHTML = `Total price: ${totalPrice}`;
            }
        }
    })
        .catch((error) => {
        alert(error);
    });
}
else {
    alert("You need to be logged in to view your shopping cart");
}
const renderCartItem = (cartItem) => {
    //5-3 new code for fix can not show empty shopping cart
    if (!cartItem.id_course)
        return;
    //end at here
    //  if (cartItem.id_course === null) {
    //    const emptyCartInfo = document.createElement("h3");
    //    emptyCartInfo.innerHTML = "You have no courses in your shopping cart";
    //    cartContentDiv.appendChild(emptyCartInfo);
    //    return;
    //  } 
    const cartItemDiv = document.createElement("div");
    cartItemDiv.id = cartItem.id_course.toString();
    ;
    cartItemDiv.className = "cart-item";
    const cartItemImage = document.createElement("div");
    cartItemImage.className = "cart-item-image";
    const cartItemImageImg = document.createElement("img");
    cartItemImageImg.src = `./images/${cartItem.name_image1}`;
    //cartItemImageImg.src = ./images/${course.name_image1};
    cartItemImage.appendChild(cartItemImageImg);
    cartItemDiv.appendChild(cartItemImage);
    const cartItemDetails = document.createElement("div");
    cartItemDetails.className = "cart-item-details";
    const cartItemDetailsName = document.createElement("h3");
    cartItemDetailsName.innerHTML = cartItem.course_name;
    const cartItemDetailsRemove = document.createElement("div");
    cartItemDetailsRemove.className = "cart-item-remove";
    const cartItemDetailsRemoveBtn = document.createElement("button");
    cartItemDetailsRemoveBtn.className = "removeCourse";
    cartItemDetailsRemoveBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    cartItemDetailsRemoveBtn.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
        if (isLoggedIn) {
            const token = cookie.getCookie("session_token");
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userid;
            const courseId = cartItem.id_course;
            console.log(userId);
            console.log(courseId);
            try {
                const response = yield fetch(`${shoppingCartUrl}/remove-from-cart`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ courseId, userId }),
                });
                if (response.ok) {
                    alert("Course removed from shopping cart!");
                    window.location.reload(); // reload the page to show updated shopping cart
                }
                else {
                    alert("There was an error removing the course from the shopping cart");
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert("You need to be logged in to remove a course from the shopping cart");
        }
    }));
    cartItemDetailsRemove.appendChild(cartItemDetailsRemoveBtn);
    cartItemDetails.appendChild(cartItemDetailsName);
    cartItemDetails.appendChild(cartItemDetailsRemove);
    cartItemDiv.appendChild(cartItemDetails);
    const cartItemPrice = document.createElement("div");
    cartItemPrice.className = "cart-item-price";
    const price = document.createElement("h3");
    price.innerHTML = "$ " + String(cartItem.price_month);
    cartItemPrice.appendChild(price);
    cartItemDiv.appendChild(cartItemPrice);
    cartContentDiv.appendChild(cartItemDiv);
};
// const renderShoppingCart = (courses: Course[]) => {
//   //it may cause issue 
// const cartContainer = document.getElementById("cart-items") as HTMLDivElement;
// cartContainer.innerHTML = "";
// //let total = 0;
// courses.forEach((course: Course) => {
// const cartItem = document.createElement("div");
// cartItem.className = "cart-item";
// cartItem.id = String(course.id_course);
// const cartItemImage = document.createElement("div");
// cartItemImage.className = "cart-item-image";
// const image = document.createElement("img");
// image.src = `./images/${course.name_image1}`;
// image.alt = course.course_name;
// cartItemImage.appendChild(image);
// cartItem.appendChild(cartItemImage);
// const cartItemDetails = document.createElement("div");
// cartItemDetails.className = "cart-item-details";
// const courseName = document.createElement("h3");
// courseName.innerHTML = course.course_name;
// cartItemDetails.appendChild(courseName);
// cartItem.appendChild(cartItemDetails);
// const cartItemRight = document.createElement("div");
// cartItemRight.className = "cart-item-right";
// const cartItemPrice = document.createElement("div");
// cartItemPrice.className = "cart-item-price";
// const price = document.createElement("h3");
// price.innerHTML = "$ " + String(course.price_month);
// cartItemPrice.appendChild(price);
// cartItemRight.appendChild(cartItemPrice);
// const cartItemRemove = document.createElement("div");
// cartItemRemove.className = "cart-item-remove";
// const removeBtn = document.createElement("button");
// removeBtn.className = "removeCourse";
// removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
// removeBtn.addEventListener("click", async () => {
// if (isLoggedIn) {
// const token = cookie.getCookie("session_token");
// const decodedToken = JSON.parse(atob(token.split('.')[1]));
// const userId = decodedToken.userid;
// const courseId = course.id_course;
// try {
//   const response = await fetch(`${shoppingCartUrl}/remove-from-cart`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ userId, courseId }),
//   });
//   if (response.ok) {
//     alert("Course removed from shopping cart!");
//     window.location.reload(); // reload the page to show updated shopping cart
//   } else {
//     alert("There was an error removing the course from the shopping cart");
//   }
// } catch (error) {
//   console.log(error);
// }
// } else {
// alert("You need to be logged in to remove a course from the shopping cart");
// }
// });
// cartItemRemove.appendChild(removeBtn);
// cartItemRight.appendChild(cartItemRemove);
// cartItem.appendChild(cartItemRight);
// cartContainer.appendChild(cartItem);
// });
// };
// //reload but look like not working
// window.onload = () => {
//   // Call the function to render shopping cart
//   courses.getCourses().then(renderShoppingCart);
// };
