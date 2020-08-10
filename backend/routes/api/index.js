const router = require('express').Router()
const auth = require('./auth')
const cytoscape_info = require('./cytoscape_info')

router.use('/auth', auth)
router.use('/cytoscape_info',cytoscape_info)

module.exports = router