var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Login_backendurl;
class Login {
    constructor(backendurl) {
        _Login_backendurl.set(this, "");
        this.sendLoginData = (formObject) => __awaiter(this, void 0, void 0, function* () {
            fetch(__classPrivateFieldGet(this, _Login_backendurl, "f"), {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
                .then(response => response.json())
                .then(data => {
                console.log(data);
                if (data.message == 'Login successful') {
                    // Login successful, change login button text to logout
                    document.getElementById("loginButton").textContent = "Logout";
                    // Save the token in the browser's local storage
                    localStorage.setItem("token", data.token);
                    // Display a welcome message
                    alert("Login successed. welcome! " + data.username);
                }
                else {
                    // Login failed, display error message
                    alert("Login failed. Please try again.");
                }
            })
                .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while processing your request. Please try again.");
            });
            // const loginButton = document.getElementById("loginButton");
            // if (loginButton.textContent === "Login") {
            // // User is logged out, so show login form
            // const loginForm = document.getElementById("loginForm");
            // loginForm.style.display = "block";
            // } else {
            // // User is logged in, so show logout button
            // const logoutButton = document.createElement("button");
            // logoutButton.textContent = "Logout";
            // logoutButton.addEventListener("click", () => {
            //     // Handle logout logic here
            // });
            // loginButton.replaceWith(logoutButton);
            // }
        });
        __classPrivateFieldSet(this, _Login_backendurl, backendurl, "f");
    }
}
_Login_backendurl = new WeakMap();
export { Login };
