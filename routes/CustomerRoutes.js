const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');

//Import Customer controller
const CustomerController = require('../controllers/CustomerController');

//Get all Customers
router.get('/', CustomerController.getAllCustomers);

//Get Customer By Id
router.get('/profile/:id', CustomerController.getCustomer);

//Post Customer
// router.post('/create', CustomerController.createCustomer);
router.post('/create', CustomerController.createCustomerUserAccount);

//Login User
// router.post('/login', CustomerController.loginUser);

//Put Customer
router.put('/edit/:id', CustomerController.updateCustomer);

//Delete Customer
router.delete('/delete/:id', CustomerController.deleteCustomer);


module.exports = router;