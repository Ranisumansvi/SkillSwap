const user = JSON.parse(localStorage.getItem("user"));
const token = localStorage.getItem("token");

if (!user || !token) {
    window.location.href = "login.html";
}


// ================= LOAD RECEIVED REQUESTS =================

async function loadReceivedRequests() {

    const container =
        document.getElementById("receivedRequests");

    try {

        const response = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/requests/received/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (
            response.status === 401 ||
            response.status === 403
        ) {
            logoutUser();
            return;
        }


        const requests =
            await response.json();


        container.innerHTML = "";


        if (requests.length === 0) {

            container.innerHTML = `
                <div class="empty-message">
                    No received requests yet.
                </div>
            `;

            return;
        }


        requests.forEach(request => {

            const card =
                document.createElement("div");

            card.className = "request-card";


            card.innerHTML = `

                <div class="request-header">

                    <div class="avatar">
                        ${request.sender_name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <h3>
                            ${request.sender_name}
                        </h3>

                        <p>
                            ${request.sender_email}
                        </p>

                    </div>

                </div>


                <span class="status ${request.status.toLowerCase()}">
                    ${request.status}
                </span>


                ${
                    request.status === "PENDING"
                    ? `
                        <div class="request-actions">

                            <button
                                class="accept-btn"
                                onclick="updateRequest(
                                    ${request.id},
                                    'ACCEPTED'
                                )">

                                Accept

                            </button>


                            <button
                                class="reject-btn"
                                onclick="updateRequest(
                                    ${request.id},
                                    'REJECTED'
                                )">

                                Reject

                            </button>

                        </div>
                    `
                    : ""
                }

            `;


            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-message">
                Unable to load received requests.
            </div>
        `;

    }

}


// ================= LOAD SENT REQUESTS =================

async function loadSentRequests() {

    const container =
        document.getElementById("sentRequests");

    try {

        const response = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/requests/sent/${user.id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );


        if (
            response.status === 401 ||
            response.status === 403
        ) {
            logoutUser();
            return;
        }


        const requests =
            await response.json();


        container.innerHTML = "";


        if (requests.length === 0) {

            container.innerHTML = `
                <div class="empty-message">
                    No sent requests yet.
                </div>
            `;

            return;
        }


        requests.forEach(request => {

            const card =
                document.createElement("div");

            card.className = "request-card";


            card.innerHTML = `

                <div class="request-header">

                    <div class="avatar">
                        ${request.receiver_name
                            .charAt(0)
                            .toUpperCase()}
                    </div>

                    <div>

                        <h3>
                            ${request.receiver_name}
                        </h3>

                        <p>
                            ${request.receiver_email}
                        </p>

                    </div>

                </div>


                <span class="status ${request.status.toLowerCase()}">
                    ${request.status}
                </span>

            `;


            container.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-message">
                Unable to load sent requests.
            </div>
        `;

    }

}


// ================= UPDATE REQUEST =================

async function updateRequest(requestId, status) {

    try {

        const response = await fetch(
            `https://skillswap-api-js8z.onrender.com/api/requests/update/${requestId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    status: status
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

            alert(data.message);

            loadReceivedRequests();

            loadSentRequests();

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

loadReceivedRequests();

loadSentRequests();