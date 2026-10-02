const db = require("../config/db");


// ================= GET MATCHES =================

const getMatches = (req, res) => {

    // Get logged-in user's ID from verified JWT
    const user_id = req.user.id;


    const sql = `
        SELECT DISTINCT
            u.id,
            u.name,
            u.email
        FROM users u

        JOIN user_skills us_teach
            ON u.id = us_teach.user_id

        JOIN skills s_teach
            ON us_teach.skill_id = s_teach.id

        JOIN user_skills us_learn
            ON u.id = us_learn.user_id

        JOIN skills s_learn
            ON us_learn.skill_id = s_learn.id

        WHERE u.id != ?

        AND us_teach.skill_type = 'TEACH'
        AND us_learn.skill_type = 'LEARN'

        AND EXISTS (
            SELECT 1
            FROM user_skills my_teach
            JOIN skills my_teach_skill
                ON my_teach.skill_id = my_teach_skill.id

            WHERE my_teach.user_id = ?

            AND my_teach.skill_type = 'TEACH'

            AND my_teach_skill.id = us_learn.skill_id
        )

        AND EXISTS (
            SELECT 1
            FROM user_skills my_learn
            JOIN skills my_learn_skill
                ON my_learn.skill_id = my_learn_skill.id

            WHERE my_learn.user_id = ?

            AND my_learn.skill_type = 'LEARN'

            AND my_learn_skill.id = us_teach.skill_id
        )
    `;


    db.query(
        sql,
        [
            user_id,
            user_id,
            user_id
        ],
        (err, results) => {

            if (err) {

                console.log(err);

                return res.status(500).json({
                    message: "Failed to find matches"
                });

            }


            res.json(results);

        }
    );

};


module.exports = {
    getMatches
};