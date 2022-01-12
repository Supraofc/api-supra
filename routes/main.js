__path = process.cwd()

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})
router.get('/api', (req, res) => {
    res.sendFile(__path + '/views/index.html')
})

router.get('/config', (req, res) => {
    config = {
        status: true,
        result: {
            prefix : '/',
            namabot: 'LhannaBot',
            namaowner: 'Newton',
            instagram: 'newton_cant',
            youtube : 'SUPRA LS'
        }
    }
    res.json(config)
})

module.exports = router
