const router = require('express').Router();
const userCtrl = require('../controllers/user.controller')
const { protect } = require('../middleware/auth')
const validate = require('express-validation');
const { userParamsValidation } = require('../helpers/joi.validation');
 
router.route('/createUser')
    .post(userCtrl.createUser)

router.route('/listAllUsers')
    .get(userCtrl.listAllUsers)

router.route('/editUser/:id') 
    .put(userCtrl.editUser)

router.route('/deleteUser/:id')
    .delete( userCtrl.deleteUser)

router.route('/login')
    .post(userCtrl.login)

module.exports = router;