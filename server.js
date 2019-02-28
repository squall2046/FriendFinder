// Dependencies
// =============================================================
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('app/public/assets'));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Require Routes
// =============================================================
require(path.join(__dirname, '/app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, '/app/routing/htmlRoutes.js'))(app);

// Sets up PORT and starts the server to begin listening
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> {
    console.log("App listening on PORT " + PORT);
});