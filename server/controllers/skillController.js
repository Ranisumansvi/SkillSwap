const db = require("../config/db");


// ================= ADD USER SKILL =================

const addUserSkill = (req, res) => {

    const { skill_name, skill_type } = req.body;

    // Get user ID from verified JWT
    const user_id = req.user.id;


    if (!skill_name || !skill_type) {

        return res.status(400).json({
            message: "Skill name and skill type are required"
        });

    }


    // ================= FIND SKILL =================

    const skillQuery =
        "SELECT id FROM skills WHERE skill_name = ?";


    db.query(
        skillQuery,
        [skill_name],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Database error"
                });

            }


            if (results.length === 0) {

                return res.status(404).json({
                    message: "Skill not found"
                });

            }


            const skill_id =
                results[0].id;


            // ================= INSERT USER SKILL =================

            const insertQuery = `
                INSERT INTO user_skills
                (user_id, skill_id, skill_type)
                VALUES (?, ?, ?)
            `;


            db.query(
                insertQuery,
                [
                    user_id,
                    skill_id,
                    skill_type
                ],
                (err, result) => {

                    if (err) {

                        console.log(err);

                        return res.status(500).json({
                            message: "Failed to add skill"
                        });

                    }


                    res.status(201).json({
                        message: "Skill added successfully"
                    });

                }
            );

        }
    );

};


// ================= GET USER SKILLS =================

const getUserSkills = (req, res) => {

    // Use logged-in user's ID from JWT
    const user_id = req.user.id;


    const sql = `
        SELECT
            user_skills.id,
            skills.skill_name,
            skills.category,
            user_skills.skill_type
        FROM user_skills
        JOIN skills
            ON user_skills.skill_id = skills.id
        WHERE user_skills.user_id = ?
    `;


    db.query(
        sql,
        [user_id],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to fetch skills"
                });

            }


            res.json(results);

        }
    );

};


module.exports = {
    addUserSkill,
    getUserSkills
};