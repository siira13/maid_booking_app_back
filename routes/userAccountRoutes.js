const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');

//Import userAccount controller
const UserAccountController = require('../controllers/userAccountController');

//Get all UserAccounts
router.get('/', UserAccountController.getAllUserAccounts);

//Get UserAccount By Id
router.get('/profile/:id', UserAccountController.getUser);

//Post SystemAdminUserAccount
router.post('/create/admin', UserAccountController.createSystemAdminUserAccount);

//Login User
router.post('/login', UserAccountController.loginUser);

//Put UserAccount
router.put('/edit/:id', UserAccountController.editSystemAdminUserAccount);

//Delete UserAccount
router.delete('/delete/:id', UserAccountController.deleteUserAccount);


module.exports = router;