const registerForm = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const emailInput = document.getElementById("email");
const strength = document.getElementById("strength");

// Login elements
const loginForm = document.getElementById("login-form");
const loginNameInput = document.getElementById("login-name");
const loginPassInput = document.getElementById("login-password");

let users = JSON.parse(localStorage.getItem("users")) || [];


// ================= REGISTER =================

if (registerForm) {

    passwordInput.addEventListener("input", () => {

        const length = passwordInput.value.length;

        if (length === 0) {
            strength.innerText = "Password strength";
        }
        else if (length < 6) {
            strength.innerText = "Password strength is weak 🔴";
        }
        else if (length < 9) {
            strength.innerText = "Password strength is medium 🟡";
        }
        else {
            strength.innerText = "Password strength is strong 🟢";
        }
    });


    registerForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const enteredName = nameInput.value.trim();
        const enteredUsername =
            usernameInput.value.trim().toLowerCase();

        const enteredEmail =
            emailInput.value.trim().toLowerCase();

        const enteredPassword =
            passwordInput.value;


        if (enteredName === "") {
            alert("Name cannot be empty");
            return;
        }


        if (enteredUsername === "") {
            alert("Username cannot be empty");
            return;
        }


        if (enteredPassword !== confirmPasswordInput.value) {
            alert("Passwords do not match");
            return;
        }


        for (let user of users) {

            if (user.username === enteredUsername) {
                alert("Username already exists");
                return;
            }


            if (user.email === enteredEmail) {
                alert("Email already exists");
                return;
            }
        }


        const newUser = {
            id: Date.now(),
            name: enteredName,
            username: enteredUsername,
            email: enteredEmail,
            password: enteredPassword
        };


        users.push(newUser);

        localStorage.setItem(
            "users",
            JSON.stringify(users)
        );


        registerForm.reset();
        strength.innerText = "Password strength";


        alert("Account created successfully");

        window.location.href = "login.html";

    });
}



// ================= LOGIN =================

if (loginForm) {

    loginForm.addEventListener("submit", (event) => {

        event.preventDefault();


        const enteredName =
            loginNameInput.value.trim().toLowerCase();

        const enteredPassword =
            loginPassInput.value;

        if (enteredName === "") {
            alert("Enter username or email");
            return;
        }


        if (enteredPassword === "") {
            alert("Enter password");
            return;
        }


        let foundUser = null;


        for (let user of users) {

            if (
                (user.username === enteredName ||
                 user.email === enteredName)
                 &&
                user.password === enteredPassword
            ) {

                foundUser = user;
                break;
            }
        }


        if (foundUser) {

            // Create session
            localStorage.setItem(
                "currentUser",
                JSON.stringify(foundUser)
            );


            alert("Login successful");

            window.location.href = "index.html";
        }

        else {

            alert(
                "Invalid username/email or password"
            );
        }

    });

}