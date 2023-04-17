
const cartBtn = document.querySelector(".cartBtn");
/* no backend done yet, need to check */
const backendUrl = "http://localhost:3001/shoppingCart";


/* click cartbtn then will show cart item */
cartBtn.addEventListener("click", () => {
  shoppingCart.style.display = "block";
  console.log("Cart button clicked");
});

fetch(backendUrl, {
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
})
/* find server */
fetch("/shoppingCart")

