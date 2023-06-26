login = (e) => {
    e.preventDefault();

    // const form = new FormData(e.target);
    // email = form.get('email')

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    alert( email);
    window.location.href = "index.html";
    localStorage.setItem("email", email);
}