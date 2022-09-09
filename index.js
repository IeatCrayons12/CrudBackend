express = require("express");
const app = express();
mysql = require("mysql");
cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "employeesystem"
})

app.get("/employee",(req,res)=>{
    db.query("SELECT * FROM employee",(err,result)=>{
        if (err) {
            console.log(err);
        } else {
           res.send(result);
        }
    
    });
});

app.post('/create', (req,res)=> {
    const name = req.body.name
    const Age = req.body.Age
    const Country = req.body.Country
    const Position = req.body.Position
    const Salary = req.body.Salary

    db.query("INSERT INTO employee (name,Age,Country,Position,Salary) VALUES(?,?,?,?,?)",
    [name,Age,Country,Position,Salary],
    (err,result)=> {
        if (err) {
        console.log(err)
        } else {
            res.send("Value Inserted")
        }
    })
})

app.put("/update",function(req,res){
    const id =req.body.id;
    const Salary = req.body.Salary
    db.query("UPDATE employee SET Salary = ? WHERE id =?", [Salary, id], function(err, result){
        if (err) {
            console.log(err)
        } else {
            res.send(result)
        }
    })
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employee WHERE id = ?", id, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(5000,function(){
    console.log("nugga 5000")
});