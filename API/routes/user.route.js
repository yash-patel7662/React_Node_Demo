const router = require('express').Router();
const userCtrl = require('../controllers/user.controller')
const { protect } = require('../middleware/auth')

router.route('/createUser')
    .post(userCtrl.createUser)

router.route('/listAllUsers')
    .get(protect, userCtrl.listAllUsers)

router.route('/editUser/:id')
    .put(userCtrl.editUser)

router.route('/deleteUser/:id')
    .delete(protect, userCtrl.deleteUser)

router.route('/login')
    .post(userCtrl.login)

module.exports = router;