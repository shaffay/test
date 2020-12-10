const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { json } = require("body-parser");
require("./Employee")
const Employee = mongoose.model("employee");
app.use(bodyParser.json())

const con = "mongodb+srv://bajwa:UeCkIAazzSsBrv7A@cluster0.amwvx.mongodb.net/<dbname>?retryWrites=true&w=majority";


mongoose.connect(con, {
    useNewUrlParser: true,
  
    useUnifiedTopology: true,
  });


  
  mongoose.connection.on("connected", (err) => {

    console.log("connected to mongoo ");
    
  });

  
app.get("/", (req, res) => {

  Employee.find({})
  
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });

    
});
  
  app.post('/send-data',(req,res)=>{

    const employee = new Employee({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    picture: req.body.picture,
    salary: req.body.salary,
    position: req.body.position,
      
    })  


    employee.save()
    
    .then(data=> {
      console.log(data);
      res.send("suceess");
    })
    .catch(err=> {
      console.log(err);
    });
});




  mongoose.connection.on("error", (err) => {
    console.log("error", err);
  });


        app.post("/delete", (req, res) => {

          Employee.findByIdAndRemove(req.body.id)


            .then((data) => {
              console.log(data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });

        app.get('/random.text', function (req, res) {
          res.send('random.text')
        })

        app.post("/update", (req, res) => {

          Employee.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            picture: req.body.picture,
            salary: req.body.salary,
            position: req.body.position,
          }
          
          )
        
            .then((data) => {
              console.log(data);
              res.send(data);
            })
            .catch((err) => {
              console.log(err);
            });
        });

app.listen((80),()=>{

    console.log("server is runing");
})