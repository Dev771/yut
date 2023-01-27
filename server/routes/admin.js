const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const { Video } = require("../models/Video");

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

router.delete('/deleteUser', (req, res) => {
    User.findById(req.body._id, (err, found) => {
        if(err) res.status(401).json({status: "Error", message: "Error While Fetching The Data"});
        else if(!found) res.status(200).json({status: "Error", message: "Invalid User"})
        else {
            User.findByIdAndDelete(req.body._id, (err, done) => {
                if(err) res.status(401).json({status: "Error", message: "Error While Deleteing The Data"});
                else res.status(200).json({status: "Success", message: "User Gone To Pavilian!!!"});
            })
        }
    })
})

router.post('/videoApproved', (req, res) => {
    Video.findById(req.body, (err, found) => {
        if(err) {
            return res.status(401).json({status: "Error", message: "Error While Fetching Data"});
        } else if(!found) {
            return res.status(200).json({status: "Error", message: "Video Not Found"});
        } else {
            Video.findByIdAndUpdate(found._id, {approved: true}, (err, done) => {
                if(err) res.status(401).json({ status: "Error", message: "Error While Updating the Data"})
                else res.status(200).json({ status: "Success", data: done});
            })
        }
    })
})

router.delete('/deleteVideo', (req, res) => {
    // res.json(req.body);
    Video.findById(req.body, (err, found) => {
        if(err) {
            return res.status(401).json({status: "Error", message: "Error While Fetching Data"});
        } else if(!found) {
            return res.status(200).json({status: "Error", message: "Video Not Found"});
        } else {
            Video.findByIdAndDelete(found._id, (err, done) => {
                if(err) res.status(401).json({ status: "Error", message: " Error While Deleting the data"})
                else res.status(200).json({status: "Success", message: "Video Deleted SuccessFully"})
            })
        }
    })
})

router.get("/getVideosforApproval", (req, res) => {

    Video.find({approved: false})
        .populate('writer')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })

});

// router.get("/makeAdmin", (req,res) =>{

//     User.findOne({_id:req.body._id}, (err, found) => {
//         if(err) {
//             res.status(401).json({status: "Error", message: "Error While Fetching The Data"});
//         } else {
//             res.status(200).json({status: "done", data: found});
//         }
//     });
// });



module.exports = router;
