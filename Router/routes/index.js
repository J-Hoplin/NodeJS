const express = require('express')

const router = express.Router()

router.get('/', (req,res) => {
    return res.send("Hello world this is from index.js")
})

module.exports = router