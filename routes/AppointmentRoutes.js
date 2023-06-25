const router = require('express').Router();
const { verifyToken } = require('../controllers/authentication');

//Import Appointment controller
const AppointmentController = require('../controllers/AppointmentController');

//Get all Appointments
router.get('/', AppointmentController.getAllAppointments);

//Get Appointment By Id
router.get('/:id', AppointmentController.getAppointment);

//Post Appointment
router.post('/create', AppointmentController.createAppointment);

//Put Appointment
router.put('/edit/:id', AppointmentController.updateAppointment);

//Delete Appointment
router.delete('/delete/:id', AppointmentController.deleteAppointment);


module.exports = router;