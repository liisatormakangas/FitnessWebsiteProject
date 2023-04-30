import { Course } from './backendCalls/course.js';
import { Courses } from './backendCalls/handleCourses.js';
import { Cookies } from './backendCalls/sendLoginData.js';
import { Cart } from './backendCalls/cart.js';

const backendUrl = "http://localhost:3001/course";
const shoppingCartUrl = "http://localhost:3001/cart";

const courses = new Courses(backendUrl);
const cart = new Cart(shoppingCartUrl);

const shoppingcartDiv = document.getElementById("shopping-cart") as HTMLDivElement;