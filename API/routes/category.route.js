const router = require('express').Router();
const categoryCtrl = require('../controllers/category.controller')
const { protect } = require('../middleware/auth')

router.route('/createCategory')
    .post(categoryCtrl.createCategory)

router.route('/listAllCategory')
    .get(categoryCtrl.listAllCategory)

router.route('/editCategory/:id')
    .put(categoryCtrl.editCategory)

router.route('/deleteCategory/:id')
    .delete(categoryCtrl.deleteCategory)

module.exports = router;