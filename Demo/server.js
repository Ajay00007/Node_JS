const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({ host: "localhost",

                                    user: "root",

                                    password: "root",

                                    database: "emplist" })

app.post("/register", (req, res) => {

const sql = "INSERT INTO register (`name`, `email`, `password`) VALUES (?)";
const values = [   

req.body.name,
                                    
req.body.email,
                                    
req.body.password,

 ]

db.query(sql, [values], (err, data) => {
if (err)  throw err;
return res.json(data);
})
                                    
})

app.get("/login/:email/:password", (req, res) => {

    const sql = "SELECT * FROM register";
 
     db.query(sql, (err, data) => {
 
         if (err) throw err;
         return res.json(data);
     });
 });




app.get("/emplist", (req, res) => {

   const sql = "SELECT * FROM emp";

    db.query(sql, (err, data) => {

        if (err) throw err;
        return res.json(data);
    });
});
app.get("/emp/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM emp where ID= ? ";
    db.query(sql, [id], (err, results) => {
        if (err)  throw err;
        return res.json(results);
    })
});

app.post("/addemp", (req, res) => {

    const sql = "INSERT INTO emp (`name`, `sex`, `dob`, `salary`, `department` ) VALUES (?)";
    const values = [

       req.body.name,

       req.body.sex,

       req.body.dob,
       
       req.body.salary,

       req.body.department,
    ]
    db.query(sql, [values], (err, data) => {
        if (err)  throw err;
        return res.json(data);
    })

})

app.put("/editemp/:id", (req, res) => {

    const sql = "update emp set `name` = ? `sex` = ? `dob` = ? `salary` = ? `department` = ?  where ID = ?";
    const values = [req.body.name, req.body.sex, req.body.dob, req.body.salary, req.body.department]
    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {

        if (err) return res.json("Error");

       return res.json(data);
    })
})


app.delete("/delemp/:id", (req, res) => {

    const sql = "DELETE FROM emp WHERE ID = ?";

    const id = req.params.id;

    db.query(sql, [id], (err, data) => {

        if (err)  throw err;

        return res.json(data);

    })
})

app.listen(8080, () => { console.log("Started!!"); })