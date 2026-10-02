document.addEventListener("DOMContentLoaded", () => {

    // ================= REGISTER =================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            console.log("Register button clicked");

            try {

                const response = await fetch(
                    "https://skillswap-api-js8z.onrender.com/api/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            name: name,
                            email: email,
                            password: password
                        })
                    }
                );

                const data = await response.json();

                console.log("Register response:", data);

                if (response.ok) {

                    alert("Account created successfully!");

                    window.location.href = "login.html";

                } else {

                    alert(data.message || "Registration failed.");

                }

            } catch (error) {

                console.error("Register error:", error);

                alert(
                    "Unable to connect to SkillSwap server."
                );

            }

        });

    }


    // ================= LOGIN =================

    const loginForm = document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            console.log("Login button clicked");

            try {

                const response = await fetch(
                    "https://skillswap-api-js8z.onrender.com/api/auth/login",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            email: email,
                            password: password
                        })
                    }
                );

                const data = await response.json();

                console.log("Login response:", data);

                if (response.ok) {

                    localStorage.setItem(
                        "token",
                        data.token
                    );

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );

                    alert("Login successful!");

                    window.location.href =
                        "dashboard.html";

                } else {

                    alert(
                        data.message ||
                        "Login failed."
                    );

                }

            } catch (error) {

                console.error("Login error:", error);

                alert(
                    "Unable to connect to SkillSwap server."
                );

            }

        });

    }

});