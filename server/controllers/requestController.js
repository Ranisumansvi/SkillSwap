const db = require("../config/db");


// ================= SEND REQUEST =================

const sendRequest = (req, res) => {

    // Logged-in user from verified JWT
    const sender_id = req.user.id;

    const { receiver_id } = req.body;


    if (!receiver_id) {

        return res.status(400).json({
            message: "Receiver is required"
        });

    }


    // Prevent sending request to yourself

    if (sender_id == receiver_id) {

        return res.status(400).json({
            message: "You cannot send a request to yourself"
        });

    }


    // ================= CHECK EXISTING REQUEST =================

    const checkQuery = `
        SELECT id
        FROM exchange_requests
        WHERE sender_id = ?
        AND receiver_id = ?
        AND status = 'PENDING'
    `;


    db.query(
        checkQuery,
        [sender_id, receiver_id],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }


            if (results.length > 0) {

                return res.status(400).json({
                    message: "Request already sent"
                });

            }


            // ================= INSERT REQUEST =================

            const insertQuery = `
                INSERT INTO exchange_requests
                (sender_id, receiver_id)
                VALUES (?, ?)
            `;


            db.query(
                insertQuery,
                [sender_id, receiver_id],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Failed to send request"
                        });

                    }


                    res.status(201).json({
                        message: "Exchange request sent successfully"
                    });

                }
            );

        }
    );

};


// ================= RECEIVED REQUESTS =================

const getReceivedRequests = (req, res) => {

    // Logged-in user from JWT
    const user_id = req.user.id;


    const sql = `
        SELECT
            er.id,
            er.sender_id,
            er.receiver_id,
            er.status,
            er.created_at,
            u.name AS sender_name,
            u.email AS sender_email
        FROM exchange_requests er

        JOIN users u
            ON er.sender_id = u.id

        WHERE er.receiver_id = ?

        ORDER BY er.created_at DESC
    `;


    db.query(
        sql,
        [user_id],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to fetch requests"
                });

            }


            res.json(results);

        }
    );

};


// ================= SENT REQUESTS =================

const getSentRequests = (req, res) => {

    // Logged-in user from JWT
    const user_id = req.user.id;


    const sql = `
        SELECT
            er.id,
            er.sender_id,
            er.receiver_id,
            er.status,
            er.created_at,
            u.name AS receiver_name,
            u.email AS receiver_email
        FROM exchange_requests er

        JOIN users u
            ON er.receiver_id = u.id

        WHERE er.sender_id = ?

        ORDER BY er.created_at DESC
    `;


    db.query(
        sql,
        [user_id],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to fetch sent requests"
                });

            }


            res.json(results);

        }
    );

};


// ================= UPDATE REQUEST =================

const updateRequest = (req, res) => {

    const { request_id } = req.params;

    const { status } = req.body;


    if (!["ACCEPTED", "REJECTED"].includes(status)) {

        return res.status(400).json({
            message: "Invalid request status"
        });

    }


    // Get logged-in user from JWT
    const receiver_id = req.user.id;


    // ================= UPDATE ONLY OWN RECEIVED REQUEST =================

    const sql = `
        UPDATE exchange_requests

        SET status = ?

        WHERE id = ?

        AND receiver_id = ?

        AND status = 'PENDING'
    `;


    db.query(
        sql,
        [
            status,
            request_id,
            receiver_id
        ],
        (err, result) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to update request"
                });

            }


            if (result.affectedRows === 0) {

                return res.status(404).json({
                    message: "Request not found or already processed"
                });

            }


            res.json({
                message:
                    `Request ${status.toLowerCase()} successfully`
            });

        }
    );

};


module.exports = {
    sendRequest,
    getReceivedRequests,
    getSentRequests,
    updateRequest
};