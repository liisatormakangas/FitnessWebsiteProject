// logout function
const logout = () => {
    const loginButton = document.getElementById('loginButton');
    // localStorage.removeItem('token');
    window.location.reload();
    loginButton.innerHTML = 'Login';
};
export { logout };
