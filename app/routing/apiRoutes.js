// Dependencies
// =============================================================
const connection = require("../config/connection.js");
const friends = require("../data/friends.js");

// Routes
// =============================================================
module.exports = (app) => {
    app.get("/api/friends", (req, res) => {
        res.json(friends);
    });

    app.post("/anywhere", (req, res) => {
        // response to MySQL (backup data)
        // =============================================================
        var scoresToStr = req.body.scores.join(",");
        connection.query("INSERT INTO friends (name, photo, scores) VALUES (?, ?, ?)",
            [req.body.name, req.body.photo, scoresToStr], function (err, result) {
                if (err) { throw err };
                console.log("backup data to mysql: ", req.body.name, req.body.photo, scoresToStr);
                console.log("MySQL changes: ", result);
            });

        // response to survey.html
        // =============================================================
        friends.push(req.body);
        let userScoresArr = req.body.scores;
        let difOne = 0;
        let difAll = [];

        for (let i = 0; i < friends.length - 1; i++) {
            difOne = 0;
            for (let j = 0; j < 10; j++) {
                difOne += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(userScoresArr[j])))
            }
            difAll.push(difOne);
        };

        // Choose the minimum number in this array which is the best match person's total different number.
        let difMatch = Math.min(...difAll);
        let matchNum = difAll.indexOf(difMatch);
        let match = friends[matchNum];
        // console.log(match);

        res.json(match);
    });
}