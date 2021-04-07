// imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Student = require('./models/Students.js');
const app = express();

//db connections
dotenv.config({path:'./config.env'});
require('./db/db.js');
const PORT = process.env.PORT || 5000
//middlewares
app.use(cors());
app.use(express.json());
//routes
app.get('/',(req,res)=>{
    Student.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result);
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})
app.post('/students',(req,res)=>{
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.place);
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        place: req.body.place
    });
    student.save()
    .then(result=>{
        console.log(result)
        res.status(200).json({msg:"successfully submitted"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured"});
    })
});
app.delete('/student/:id',(req,res)=>{
    const id = req.params.id;
    Student.remove({_id:id},(err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send('error occured');
        }
        else {
            res.status(200).json({msg:"successfully deleted"});
        }
    })
})
app.put('/student/:id',(req,res)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const place = req.body.place;
    const id = req.params.id;
    Student.update({_id:id},{$set:{firstname:firstname,lastname:lastname,place:place}})
    .then(result=>{
        console.log(result);
        res.status(201).json({msg:"succesfully updated!!"});
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({msg:"error occured"});
    })
})

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/client/build")));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, 'client','build', 'index.html'));
    })
} else {
    app.get('/',(req,res)=>{
        res.send('API Running');
    })
}

//server
app.listen(PORT,()=>{
    console.log(`Server Was Connected on Port: ${PORT}`);
})