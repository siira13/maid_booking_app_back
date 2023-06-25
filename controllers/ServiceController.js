const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get Service by id
module.exports.getService = async (req, res) => {

    const id = req.params.id;
    const sql = 'SELECT * FROM Service WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};
//Get all Services
module.exports.getAllServices = async (req, res) => {

    const sql = 'SELECT * FROM Service';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Create Service
module.exports.createService = async (req, res) => {

    const {ServiceType, DateTime, Customer, Maid} = req.body;
    //use iso date time
    const isoDate = new Date(DateTime);
    const dateTime = isoDate.toJSON().slice(0, 19).replace('T', ' ');
    
    const sql = 'SELECT * FROM Service WHERE Name = ? ';
    //Create a Service
    const service = {
        "ServiceType": ServiceType,
        "DateTime": dateTime,
        "Customer": Customer,
        "Maid": Maid
    }

    //Create Service
    db.query("INSERT INTO Service SET ?", service, async (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};

//Update Service
module.exports.updateService = async (req, res) => {

    const id = req.params.id;
    let service = {};
    // const editedAt = { EditedAt: new Date()};
    // Service = {...req.body, ...editedAt};
    service = {...req.body};
    const updateSql = 'UPDATE Service SET ?  WHERE id = ?';
    db.query(updateSql, [service, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });  
};

//Delete Service
module.exports.deleteService = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM Service WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
