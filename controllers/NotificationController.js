const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get Notification by id
module.exports.getNotification = async (req, res) => {

    const id = req.params.id;
    const sql = 'SELECT * FROM Notification WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(201).json(result);
    });

};
//Get all Notifications
module.exports.getAllNotifications = async (req, res) => {

    const sql = 'SELECT * FROM Notification';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(201).json(result);

    });

};

//Create Notification
module.exports.createNotification = async (req, res) => {

    const {Title, Description, DateTime} = req.body;

    //Create a Notification
    const Notification = {
        "Title": Title,
        "Description": Description,
        "Date": DateTime
    }

    //Create Notification
    db.query("INSERT INTO Notification SET ?", Notification, async (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(201).json(result);
    });

};

//Update Notification
module.exports.updateNotification = async (req, res) => {

    const id = req.params.id;
    let Notification = {};
    // const editedAt = { EditedAt: new Date()};
    // Notification = {...req.body, ...editedAt};
    Notification = {...req.body};
    const updateSql = 'UPDATE Notification SET ?  WHERE id = ?';
    db.query(updateSql, [Notification, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(201).json(result);

    });
};

//Delete Notification
module.exports.deleteNotification = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM Notification WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(201).json(result);

    });

};
