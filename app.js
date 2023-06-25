const { TOKEN_SECRET, origin, methods } = require('./config/default.json');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

// app.use(cors({
//     origin: "*",
//     methods: methods,
//     credentials: true
// }));
app.use(cors());

app.use(express.json());
app.use(morgan('dev'));

//Import routes
const userAccountRoutes = require('./routes/userAccountRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const maidRoutes = require('./routes/MaidRoutes');
const serviceRoutes = require('./routes/ServiceRoutes');
const notificationRoutes = require('./routes/NotificationRoutes');
const appointmentRoutes = require('./routes/AppointmentRoutes');

//Route middleware
app.use('/api/users', userAccountRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/maids', maidRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/appointments', appointmentRoutes);


module.exports = app;

