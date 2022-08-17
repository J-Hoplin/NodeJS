const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    return res.send("Hello user this is from user.js")
})

module.exports = router