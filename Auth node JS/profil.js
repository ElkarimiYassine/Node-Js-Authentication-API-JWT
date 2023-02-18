const router = require('express').Router();
const verifyToken = require('./Token');
const User = require('./model/User');

router.get('/',verifyToken, (req, res) => {
    if(User.findById(req.user._id)){
        User.findById(req.user._id)
            .then(result => {
                res.send(result);
            }).catch(err => {
                console.log(err);
            });
    }
});


module.exports = router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2YxMmY1ZDMxYzFlNzk1NTc1NjNkNzgiLCJpYXQiOjE2NzY3NTA3MjJ9.vvbhy9enQbpy1jYk438vW6JWiZI8NeZPsdngd5EzAm8