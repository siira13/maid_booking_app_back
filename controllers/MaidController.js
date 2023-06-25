const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get Maid by id
module.exports.getMaid = async (req, res) => {

    const id = req.params.id;
    const sql = 'SELECT * FROM Maid WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};

//Get all Maids
module.exports.getAllMaids = async (req, res) => {

    const sql = 'SELECT * FROM Maid';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Get by service type
module.exports.getByServiceType = async (req, res) => {

    const {serviceType} = req.params;
    // console.log(serviceType);

    const sql = 'SELECT * FROM Maid WHERE ServiceType = ?';
    db.query(sql, serviceType, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Create user account & maid profile
module.exports.createMaidUserAccount = async (req, res, next) => {

    const {Name, Password, Phone, Email, BackgroundInfo, ServiceType} = req.body;
    let userId;
    //Check if Name exists
    const sql = 'SELECT * FROM Maid WHERE Name = ?';
    db.query(sql, Name, async (err, rows) => {

        if(err) {
            return res.status(400).json({ error: err.sqlMessage });
        }else if(rows.length) { 
            res.status(400).json({ error: "Maid Name already exist" });
        } else {
            //Check if user name exists
            const sql = 'SELECT * FROM account WHERE UserName = ? ';
            db.query(sql, Name, async (err, row) => {

                if(err) {
                    return res.status(400).json({ error: err.sqlMessage });
                }else if(row.length) {
                    return res.status(400).json({ message: "User Name already exists"});
                } else {
                    //Create a Maid
                    const maid = {
                        "Name": Name,
                        // "UserRole": "Maid",
                        // "Password": hashedPassword,
                        "Email": Email,
                        "Phone": Phone,
                        "BackgroundInfo": BackgroundInfo,
                        "ServiceType": ServiceType
                    }
                    db.query("INSERT INTO Maid SET ?", maid, async (err, result) => {
                        if(err) return res.status(400).json({ error: err.sqlMessage });
                        const sql = 'SELECT * FROM Maid WHERE Name = ?';
                        db.query(sql, Name, async (err, result) => {
                            if(err) return res.status(400).json({ error: err.sqlMessage });
                            // console.log(`result ${result[0].id}`);
                            userId = result[0].id;

                            //Hash password
                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(Password, salt);

                            //Create a maid user accouunt
                            const maidUserAccount = {
                                "UserId": userId,
                                "UserName": Name,
                                "AccountType": "SericeProvider",
                                "Password": hashedPassword,
                            
                            }

                            //Create user account
                            db.query("INSERT INTO account SET ?", maidUserAccount, async (err, result) => {
                                if(err) return res.status(400).json({ error: err.sqlMessage });
                                return res.status(200).json(result);
                            });
                        });
                    });
                }
            });
        }
    });
};

//Create Maid
module.exports.createMaid = async (req, res) => {

    const {Name, Email, BackgroundInfo, Phone, ServiceType} = req.body;
    // console.log(`userAccount ${req.body}`)
    //Check if user name exists
    const sql = 'SELECT * FROM Maid WHERE Name = ? ';
    db.query(sql, Name, async (err, row) => {

        if(err){
            return res.status(400).json({ error: err.message });
        } else if(row.length) {
            return res.status(400).json({ message: "Name already exists"});
        } else {
            //Create a Maid
            const maid = {
                "Name": Name,
                // "UserRole": "Maid",
                // "Password": hashedPassword,
                "Email": Email,
                "Phone": Phone,
                "BackgroundInfo": BackgroundInfo,
                "ServiceType": ServiceType
            }

            //Create Maid
            db.query("INSERT INTO Maid SET ?", maid, async (err, result) => {
                if(err) return res.status(400).json({ error: err.sqlMessage });
                return res.status(200).json(result);
            });
        }

    });

};

//Update Maid
module.exports.updateMaid = async (req, res) => {

    const id = req.params.id;
    let maid = {};
    // const editedAt = { EditedAt: new Date()};
    // Maid = {...req.body, ...editedAt};
    maid = {...req.body};
    const updateSql = 'UPDATE Maid SET ?  WHERE id = ?';
    db.query(updateSql, [maid, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });
};

//Delete Maid
module.exports.deleteMaid = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM Maid WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
