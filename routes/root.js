const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => { // ^start with, $ends, | or, (with or without)?optional
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router;