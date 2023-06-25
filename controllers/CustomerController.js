const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const jwt = require('jsonwebtoken');
const db = require('../config/connectDB');
const { TOKEN_SECRET } = require('../config/default.json');

//Get customer by id
module.exports.getCustomer = async (req, res) => {

    const id = req.params.id;
    const sql = 'SELECT * FROM Customer WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);
    });

};
//Get all customers
module.exports.getAllCustomers = async (req, res) => {

    const sql = 'SELECT * FROM Customer';
    db.query(sql, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });

};

//Create user account & customer profile
module.exports.createCustomerUserAccount = async (req, res, next) => {

    const {Name, Password, Phone, Address, Email, City, Subcity, Woreda} = req.body;
    let userId;
    //Check if Name exists
    const sql = 'SELECT * FROM Customer WHERE Name = ?';
    db.query(sql, Name, async (err, rows) => {

        if(err) {
            return res.status(400).json({ error: err.sqlMessage });
        }else if(rows.length) { 
            res.status(400).json({ error: "Customer Name already exist" });
        } else {
            //Check if user name exists
            const sql = 'SELECT * FROM account WHERE UserName = ? ';
            db.query(sql, Name, async (err, row) => {

                if(err) {
                    return res.status(400).json({ error: err.sqlMessage });
                }else if(row.length) {
                    return res.status(400).json({ message: "User Name already exists"});
                } else {
                    //Create a customer
                    const customer = {
                        "Name": Name,
                        "Address": Address,
                        "Phone": Phone,
                        "Email": Email
                    }
                    db.query("INSERT INTO Customer SET ?", customer, async (err, result) => {
                        if(err) return res.status(400).json({ error: err.sqlMessage });
                        const sql = 'SELECT * FROM Customer WHERE Name = ?';
                        db.query(sql, Name, async (err, result) => {
                            if(err) return res.status(400).json({ error: err.sqlMessage });
                            // console.log(`result ${result[0].id}`);
                            userId = result[0].id;

                            //Hash password
                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(Password, salt);

                            //Create a customer user accouunt
                            const customerUserAccount = {
                                "UserId": userId,
                                "UserName": Name,
                                "AccountType": "Customer",
                                "Password": hashedPassword,
                            
                            }

                            //Create customer user account
                            db.query("INSERT INTO account SET ?", customerUserAccount, async (err, result) => {
                                if(err) return res.status(400).json({ error: err.sqlMessage });
                                //Create a customer address
                                const customerAddress = {
                                    "City": City,
                                    "Subcity": Subcity,
                                    "Woreda": Woreda,
                                    "UserId": userId
                                
                                }

                                //Create customer address
                                db.query("INSERT INTO Address SET ?", customerAddress, async (err, result) => {
                                    if(err) return res.status(400).json({ error: err.sqlMessage });
                                    return res.status(200).json(result);
                                });
                                // return res.status(201).json(result);
                            });
                        });
                    });
                }
            });
        }
    });
};

//Create customer
module.exports.createCustomer = async (req, res) => {

    const {Name, Address, Phone} = req.body;
    // console.log(`userAccount ${req.body}`)
    //Check if user name exists
    const sql = 'SELECT * FROM Customer WHERE Name = ? ';
    db.query(sql, Name, async (err, row) => {

        if(err) {
            return res.status(400).json({error: err.message});
        }else if(row.length) {
            return res.status(400).json({ message: "Name already exists"});
        }else {
            //Create a customer
            const customer = {
                "Name": Name,
                // "UserRole": "Customer",
                // "Password": hashedPassword,
                "Address": Address,
                "Phone": Phone
            }

            //Create customer
            db.query("INSERT INTO Customer SET ?", customer, async (err, result) => {
                if(err) return res.status(400).json({ error: err.sqlMessage });
                return res.status(200).json(result);
            });
        }

    });

};

//Update customer
module.exports.updateCustomer = async (req, res) => {

    const id = req.params.id;
    let customer = {};
    // const editedAt = { EditedAt: new Date()};
    // customer = {...req.body, ...editedAt};
    customer = {...req.body};
    const updateSql = 'UPDATE Customer SET ?  WHERE id = ?';
    db.query(updateSql, [customer, id], (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        return res.status(200).json(result);

    });  
};

//Delete customer
module.exports.deleteCustomer = async (req, res) => {

    const id = req.params.id;
    const sql = 'DELETE FROM Customer WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if(err) return res.status(400).json({ error: err.sqlMessage });
        res.status(200).json(result);

    });

};
