const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get Appointment by id
module.exports.getAppointment = async (req, res) => {

    const id = req.params.id;
    const sql = 'SELECT * FROM Appointment WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};
//Get all Appointments
module.exports.getAllAppointments = async (req, res) => {

    const sql = 'SELECT * FROM Appointment';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Create Appointment
module.exports.createAppointment = async (req, res) => {

    const {DateTime} = req.body;

    //Create a Appointment
    const Appointment = {
        "DateTime": DateTime
    }

    //Create Appointment
    db.query("INSERT INTO Appointment SET ?", Appointment, async (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};

//Update Appointment
module.exports.updateAppointment = async (req, res) => {

    const id = req.params.id;
    let Appointment = {};
    // const editedAt = { EditedAt: new Date()};
    // Appointment = {...req.body, ...editedAt};
    Appointment = {...req.body};
    const updateSql = 'UPDATE Appointment SET ?  WHERE id = ?';
    db.query(updateSql, [Appointment, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });
};

//Delete Appointment
module.exports.deleteAppointment = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM Appointment WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
