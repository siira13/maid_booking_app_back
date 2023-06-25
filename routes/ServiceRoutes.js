const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');

//Import Service controller
const ServiceController = require('../controllers/ServiceController');

//Get all Services
router.get('/', ServiceController.getAllServices);

//Get Service By Id
router.get('/:id', ServiceController.getService);

//Post Service
router.post('/create', ServiceController.createService);

//Put Service
router.put('/edit/:id', ServiceController.updateService);

//Delete Service
router.delete('/delete/:id', ServiceController.deleteService);


module.exports = router;