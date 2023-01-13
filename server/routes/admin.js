const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.get('/AllUser', (req, res) => {
    User.find({}, (err, found) => {
        if(err) {
            res.status(401).json({status: "Error", message: "Error While Fetching The Data"});
        } else {
            res.status(200).json({status: "done", data: found});
        }
    });

});

module.exports = router;
