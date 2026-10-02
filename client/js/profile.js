const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!user || !token) {
    window.location.href = "login.html";
}


// ================= PROFILE INFORMATION =================

document.getElementById("profileName").textContent =
    user.name;

document.getElementById("profileEmail").textContent =
    user.email;

document.getElementById("infoName").textContent =
    user.name;

document.getElementById("infoEmail").textContent =
    user.email;

document.getElementById("infoId").textContent =
    user.id;


// ================= PROFILE AVATAR =================

const avatar =
    document.getElementById("profileAvatar");

if (user.name) {

    avatar.textContent =
        user.name.charAt(0).toUpperCase();

}


// ================= LOAD PROFILE SKILLS =================

async function loadProfileSkills() {

    try {

        const response = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/skills/user/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        // Token expired / invalid

        if (
            response.status === 401 ||
            response.status === 403
        ) {

            logoutUser();

            return;
        }


        const skills =
            await response.json();


        const teachContainer =
            document.getElementById("teachSkills");

        const learnContainer =
            document.getElementById("learnSkills");


        teachContainer.innerHTML = "";
        learnContainer.innerHTML = "";


        let teachCount = 0;
        let learnCount = 0;


        skills.forEach(skill => {

            const skillTag =
                document.createElement("span");

            skillTag.className =
                "skill-tag";

            skillTag.textContent =
                skill.skill_name;


            if (skill.skill_type === "TEACH") {

                teachContainer.appendChild(skillTag);

                teachCount++;

            }


            if (skill.skill_type === "LEARN") {

                learnContainer.appendChild(skillTag);

                learnCount++;

            }

        });


        // ================= EMPTY MESSAGES =================

        if (teachCount === 0) {

            teachContainer.innerHTML = `
                <p class="empty-message">
                    No teaching skills added yet.
                </p>
            `;

        }


        if (learnCount === 0) {

            learnContainer.innerHTML = `
                <p class="empty-message">
                    No learning skills added yet.
                </p>
            `;

        }

    } catch (error) {

        console.error(error);

        document.getElementById(
            "teachSkills"
        ).innerHTML = `
            <p class="empty-message">
                Unable to load skills.
            </p>
        `;

        document.getElementById(
            "learnSkills"
        ).innerHTML = `
            <p class="empty-message">
                Unable to load skills.
            </p>
        `;

    }

}


// ================= LOGOUT =================

function logoutUser() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}


const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        logoutUser();

    });

}


// ================= PAGE LOAD =================

loadProfileSkills();