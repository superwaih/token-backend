const express = require('express')
const router = express.Router()

const {
   
    getAllWallets,
    uploadWallets

} = require('../controller/Users')

router.route('/data').get(getAllWallets)
router.route('/create').post(uploadWallets)






module.exports = router