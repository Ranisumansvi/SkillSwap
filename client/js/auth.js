// ================= REGISTER =================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {

                alert("Account created successfully!");

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Server error. Please try again.");

        }

    });

}


// ================= LOGIN =================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {

                // Save JWT token
                localStorage.setItem("token", data.token);

                // Save user information
                localStorage.setItem("user", JSON.stringify(data.user));

                alert("Login successful!");

                window.location.href = "dashboard.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Server error. Please try again.");

        }

    });

}