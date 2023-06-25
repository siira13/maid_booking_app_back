const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');

//Import Maid controller
const MaidController = require('../controllers/MaidController');

//Get all Maids
router.get('/', MaidController.getAllMaids);

//Get Maid By Id
router.get('/profile/:id', MaidController.getMaid);

//Get by service type
router.get('/filtter/:serviceType', MaidController.getByServiceType);

//Post Maid
// router.post('/create', MaidController.createMaid);
router.post('/create', MaidController.createMaidUserAccount);

//Login User
// router.post('/login', MaidController.loginUser);

//Put Maid
router.put('/edit/:id', MaidController.updateMaid);

//Delete Maid
router.delete('/delete/:id', MaidController.deleteMaid);


module.exports = router;