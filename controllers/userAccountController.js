const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get user by id
module.exports.getUser = async (req, res) => {

    const userAccountId = req.params.id
    const sql = 'SELECT * FROM account WHERE id = ?';
    db.query(sql, userAccountId, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};
//Get all user accounts
module.exports.getAllUserAccounts = async (req, res) => {

    const sql = 'SELECT * FROM account';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Login user
module.exports.loginUser = async (req, res) => {

    const {UserName, Password} = req.body;

    //Check if phone exists
    const sql = 'SELECT * FROM account WHERE UserName = ?';
    db.query(sql, UserName, async (err, rows) => {

        if(err || !rows.length) return res.status(400).json({ error: "User Name does not exist" });
        // return res.status(200).json({});

        // if(!rows.length) return res.status(400).json({ error: "User account does not exist" });

        // Check password
        const validPassword = await bcrypt.compare(Password, rows[0].Password);
        if(!validPassword) return res.status(400).json({ error: "Password is not valid" });
        
        // Create token
        const token = await jwt.sign(rows[0], TOKEN_SECRET);
        // res.header('Authorization', token);
        // req.session.user = rows;
        console.log(rows[0]);

        return res.status(200).json(token);

    });

};

//Create system amin user account
module.exports.createSystemAdminUserAccount = async (req, res, next) => {

    const {UserName, Password, AccountType} = req.body;
    //Check if phone exists
    const sql = 'SELECT * FROM account WHERE UserName = ? ';
    db.query(sql, UserName, async (err, row) => {

        if(err) {
            // console.log('err', err);
            return res.status(400).json({ error: err.sqlMessage });
        }else if(row.length) {
            // console.log('err', err);
            return res.status(400).json({ message: "User Name already exists"});
        } else {
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(Password, salt);

        //Create a system admin user accouunt
        const systemAdminUserAccount = {
            "UserName": UserName,
            "Password": hashedPassword,
            "AccountType": "Admin"
        }

        //Create system admin user account
        db.query("INSERT INTO account SET ?", systemAdminUserAccount, async (err, result) => {
            if(err) return res.status(400).json({ error: err.sqlMessage });
            return res.status(200).json(result);
        });
        }
    });

};

//Update system admin user account
module.exports.editSystemAdminUserAccount = async (req, res) => {

    const id = req.params.id;
    let userAccount = req.body;
    const sql = 'UPDATE account SET ?  WHERE id = ?';
    db.query(sql, [userAccount, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};

//Delete user account
module.exports.deleteUserAccount = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM account WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
