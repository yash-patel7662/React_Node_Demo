const router = require('express').Router();
const productCtrl = require('../controllers/product.controller')
const { protect } = require('../middleware/auth')

router.route('/createProduct')
    .post(productCtrl.createProduct)

router.route('/listAllProduct')
    .get(productCtrl.listAllProduct)

router.route('/editProduct/:id')
    .put(productCtrl.editProduct)

router.route('/deleteProduct/:id')
    .delete(productCtrl.deleteProduct)

module.exports = router;