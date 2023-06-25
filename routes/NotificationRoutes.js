const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');

//Import Notification controller
const NotificationController = require('../controllers/NotificationController');

//Get all Notifications
router.get('/', NotificationController.getAllNotifications);

//Get Notification By Id
router.get('/:id', NotificationController.getNotification);

//Post Notification
router.post('/create', NotificationController.createNotification);

//Put Notification
router.put('/edit/:id', NotificationController.updateNotification);

//Delete Notification
router.delete('/delete/:id', NotificationController.deleteNotification);


module.exports = router;