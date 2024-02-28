import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Almeera_1108",
    database:"test",
})

app.use(express.json())
app.use(cors())

app.get("/", (req,res)=>{
    res.json("Hello, this is the backend!")
})

app.get("/books", (req, res)=>{
    const q = "SELECT * FROM test.books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `cover`) VALUES (?)";
    const values = [
    // "title from backend", 
    // "desc from backend", 
    // "cover pic from backend",
    req.body.title,
    req.body.desc,
    req.body.cover,
];

db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been created successfully");
    });
});

app.listen(8800, () => {
    console.log("connected to backend!")
})