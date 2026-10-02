// ================= GET LOGGED-IN USER =================

const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!user || !token) {
    window.location.href = "login.html";
}


// ================= USER NAME =================

const userName = document.getElementById("userName");

if (userName) {
    userName.textContent = user.name;
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


// ================= LOAD DASHBOARD DATA =================

async function loadDashboard() {

    try {

        // ================= GET MY SKILLS =================

        const skillsResponse = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/skills/user/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        // Token expired / invalid

        if (
            skillsResponse.status === 401 ||
            skillsResponse.status === 403
        ) {

            logoutUser();

            return;
        }


        const skills =
            await skillsResponse.json();


        // ================= COUNT SKILLS =================

        const teachingCount =
            skills.filter(
                skill => skill.skill_type === "TEACH"
            ).length;


        const learningCount =
            skills.filter(
                skill => skill.skill_type === "LEARN"
            ).length;


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


        // ================= GET RECEIVED REQUESTS =================

        const receivedResponse = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/requests/received/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (
            receivedResponse.status === 401 ||
            receivedResponse.status === 403
        ) {

            logoutUser();

            return;
        }


        const receivedRequests =
            await receivedResponse.json();


        // ================= GET SENT REQUESTS =================

        const sentResponse = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/requests/sent/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (
            sentResponse.status === 401 ||
            sentResponse.status === 403
        ) {

            logoutUser();

            return;
        }


        const sentRequests =
            await sentResponse.json();


        // ================= UPDATE DASHBOARD =================

        const teachingElement =
            document.getElementById("teachingCount");

        const learningElement =
            document.getElementById("learningCount");

        const matchesElement =
            document.getElementById("matchesCount");

        const requestsElement =
            document.getElementById("requestsCount");


        // Teaching skills

        if (teachingElement) {

            teachingElement.textContent =
                teachingCount;

        }


        // Learning skills

        if (learningElement) {

            learningElement.textContent =
                learningCount;

        }


        // Matches

        if (matchesElement) {

            matchesElement.textContent =
                matches.length;

        }


        // Requests

        if (requestsElement) {

            const pendingReceived =
                receivedRequests.filter(
                    request =>
                        request.status === "PENDING"
                ).length;


            const pendingSent =
                sentRequests.filter(
                    request =>
                        request.status === "PENDING"
                ).length;


            requestsElement.textContent =
                pendingReceived + pendingSent;

        }


    } catch (error) {

        console.error(
            "Failed to load dashboard:",
            error
        );

    }

}


// ================= PAGE LOAD =================

loadDashboard();