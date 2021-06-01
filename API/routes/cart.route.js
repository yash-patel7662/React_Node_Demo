const router = require('express').Router();
const cartCtrl = require('../controllers/cart.controller')

router.route('/addCart')
    .post(cartCtrl.addCart)

router.route('/getCart/:id')
    .get(cartCtrl.getCart)

module.exports = router;