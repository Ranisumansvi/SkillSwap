const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!user || !token) {
    window.location.href = "login.html";
}


// ================= LOAD MATCHES =================

async function loadMatches() {

    const matchesContainer =
        document.getElementById("matchesContainer");

    try {

        // ================= GET MY SKILLS =================

        const mySkillsResponse = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/skills/user/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (
            mySkillsResponse.status === 401 ||
            mySkillsResponse.status === 403
        ) {
            logoutUser();
            return;
        }

        const mySkills =
            await mySkillsResponse.json();


        // ================= GET MATCHES =================

        const matchesResponse = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/matches/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (
            matchesResponse.status === 401 ||
            matchesResponse.status === 403
        ) {
            logoutUser();
            return;
        }

        const matches =
            await matchesResponse.json();


        // ================= NO MATCHES =================

        if (matches.length === 0) {

            matchesContainer.innerHTML = `
                <div class="no-matches">
                    <h2>No matches found yet</h2>

                    <p>
                        Add more teaching and learning skills
                        or wait for another student to join.
                    </p>
                </div>
            `;

            return;
        }


        matchesContainer.innerHTML = "";


        // ================= DISPLAY MATCHES =================

        for (const match of matches) {

            const skillsResponse = await fetch(
                `https://skillswap-api-js8z.onrender.com/api/skills/user/${match.id}`,
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );


            if (
                skillsResponse.status === 401 ||
                skillsResponse.status === 403
            ) {
                logoutUser();
                return;
            }


            const matchSkills =
                await skillsResponse.json();


            // ================= FIND EXCHANGE SKILLS =================

            const myTeach = mySkills.find(mySkill =>
                mySkill.skill_type === "TEACH" &&
                matchSkills.some(matchSkill =>
                    matchSkill.skill_name === mySkill.skill_name &&
                    matchSkill.skill_type === "LEARN"
                )
            );


            const myLearn = mySkills.find(mySkill =>
                mySkill.skill_type === "LEARN" &&
                matchSkills.some(matchSkill =>
                    matchSkill.skill_name === mySkill.skill_name &&
                    matchSkill.skill_type === "TEACH"
                )
            );


            // ================= CREATE CARD =================

            const card =
                document.createElement("div");

            card.className = "match-card";


            card.innerHTML = `

                <div class="match-header">

                    <div class="avatar">
                        ${match.name.charAt(0).toUpperCase()}
                    </div>

                    <div>

                        <h2>${match.name}</h2>

                        <p>${match.email}</p>

                    </div>

                </div>


                <div class="exchange-box">

                    <div class="exchange-row">

                        <span class="exchange-label">
                            They can teach you
                        </span>

                        <span class="exchange-skill">
                            ${myLearn ? myLearn.skill_name : "Skill"}
                        </span>

                    </div>


                    <div class="exchange-row">

                        <span class="exchange-label">
                            You can teach them
                        </span>

                        <span class="exchange-skill">
                            ${myTeach ? myTeach.skill_name : "Skill"}
                        </span>

                    </div>

                </div>


                <button
                    class="request-btn"
                    onclick="sendRequest(${match.id})">

                    Send Exchange Request

                </button>

            `;


            matchesContainer.appendChild(card);

        }

    } catch (error) {

        console.error(error);

        matchesContainer.innerHTML = `

            <div class="no-matches">

                <h2>Something went wrong</h2>

                <p>
                    Unable to load matches.
                    Please make sure the server is running.
                </p>

            </div>

        `;

    }

}


// ================= SEND REQUEST =================

async function sendRequest(matchId) {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const token =
        localStorage.getItem("token");


    if (!user || !token) {

        alert("Please login first.");

        window.location.href = "login.html";

        return;
    }


    try {

        const response = await fetch(
            "https://skillswap-api-js8z.onrender.com/api/requests/send",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    sender_id: user.id,
                    receiver_id: matchId
                })
            }
        );


        if (
            response.status === 401 ||
            response.status === 403
        ) {
            logoutUser();
            return;
        }


        const data =
            await response.json();


        if (response.ok) {

            alert(
                "Exchange request sent successfully!"
            );

        } else {

            alert(data.message);

        }

    } catch (error) {

        console.error(error);

        alert(
            "Server error. Please try again."
        );

    }

}


// ================= LOGOUT USER =================

function logoutUser() {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";

}


// ================= LOGOUT BUTTON =================

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        logoutUser();

    });

}


// ================= PAGE LOAD =================

loadMatches();