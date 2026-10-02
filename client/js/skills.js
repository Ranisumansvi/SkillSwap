const skillForm = document.getElementById("skillForm");


// ================= ADD SKILL =================

skillForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const skillName = document.getElementById("skill").value;
    const skillType = document.getElementById("skillType").value;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            "https://skillswap-api-js8z.onrender.com/api/skills/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    user_id: user.id,
                    skill_name: skillName,
                    skill_type: skillType
                })
            }
        );

        const data = await response.json();

        if (response.ok) {

            alert("Skill added successfully!");

            skillForm.reset();

            loadSkills();

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert("Server error. Please try again.");

    }

});


// ================= LOAD SKILLS =================

async function loadSkills() {

    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
        window.location.href = "login.html";
        return;
    }

    try {

        const response = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/skills/user/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        const skills = await response.json();

        // If token is invalid or expired
        if (response.status === 401 || response.status === 403) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            alert("Session expired. Please login again.");

            window.location.href = "login.html";

            return;
        }

        const teachSkills =
            document.getElementById("teachSkills");

        const learnSkills =
            document.getElementById("learnSkills");

        teachSkills.innerHTML = "";
        learnSkills.innerHTML = "";


        let teachCount = 0;
        let learnCount = 0;


        skills.forEach((skill) => {

            const skillTag =
                document.createElement("span");

            skillTag.className = "skill-tag";

            skillTag.textContent =
                skill.skill_name;


            if (skill.skill_type === "TEACH") {

                teachSkills.appendChild(skillTag);

                teachCount++;

            } else if (skill.skill_type === "LEARN") {

                learnSkills.appendChild(skillTag);

                learnCount++;

            }

        });


        // ================= EMPTY MESSAGES =================

        if (teachCount === 0) {

            teachSkills.innerHTML =
                '<p class="empty-message">No teaching skills added yet.</p>';

        }


        if (learnCount === 0) {

            learnSkills.innerHTML =
                '<p class="empty-message">No learning skills added yet.</p>';

        }

    } catch (error) {

        console.error(error);

    }

}


// ================= LOGOUT =================

const logoutBtn =
    document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        window.location.href = "login.html";

    });

}


// ================= LOAD WHEN PAGE OPENS =================

loadSkills();