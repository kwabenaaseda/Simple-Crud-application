const express = require("express");
const path = require("path")
const dotenv= require("dotenv");
const cors = require('cors');

dotenv.config()

const PORT = process.env.PORT;
//Database
const admin =[];//stores admins
const db = [];//stores users 
const userdb=[];//stores user specific data
const userpost=[];//stores user specific posts
const activity=[];//app history
//
//Queue
const navigation =[];
//
const time = new Date();

const server = express();
server.use(cors({
    origin: 'https://snappod.netlify.app', // Only allow your frontend domain
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    
}));

function id(id){
    return toString(id);
}

server.use(express.json())
server.use(express.urlencoded({extended:true}));


//Requests

    //Post (Sign up data) /api/signup/data
    server.post("/api/signup/data",(req,res)=>{
        const userdata = {
            "id":db.length > 0 ? `${db.length}`:"0",
            "userData":req.body,
        }
//middleware

        db.push(userdata);
        console.log(db);
        console.log("User Added!!")
         activity.push({
                "message":`User ${userdata.userData.name} at index: ${userdata.id} is added Successfully!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
         res.json({ 
        success: true,
        message: "User added successfully",
        redirectUrl: "https://snappod.netlify.app/user.html" 
    });
        
    }
); //adds a new user to the db array and assigns an id

 
    //put (update the data) /api/data/id
    server.post("/api/data/users/update/",(req,res)=>{
        console.log(req.body)
       const x = req.body.id;
       db[x].userData.name=req.body.name;
       db[x].userData.age=req.body.age;
       db[x].userData.mail=req.body.mail;
       db[x].userData.password=req.body.password;
    console.log(db)
    console.log("User Updated!!");
     activity.push({
                "message":`User at index: ${db[x]} is Updated Successfully!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
     res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/homepage.html"
    });      
    })
    //delete (remove the data)/api/data/id
    server.post("/api/data/users/delete",(req,res)=>{
        const id = req.body.id;
        db.splice(id,1)
        db.forEach(item=>{
            item.id =db.indexOf(item)
        })
        console.log(db)
        console.log("User deleted!!")
         activity.push({
                "message":`User at index: ${id[id]} is Deleted Successfully!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
         res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/homepage.html"
    });
    })

    //login
    server.post("/api/signup/data/login",(req,res)=>{
        if(db.length>0){
            for(let i=0;i<db.length;i++){
                if(db[i].userData.mail==req.body.mail&&db[i].userData.password==req.body.password){
                    console.log(`User ${db[i].userData.name} at index: ${db[i].id} exists !!`)
                    console.log(`User ${db[i].userData.name} at index: ${db[i].id} is Logged in Successfully!!`)
                    activity.push({
                "message":`User ${db[i].userData.name} at index: ${db[i].id} is Logged in Successfully!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
                    console.log(db)
                    res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/user.html"
    });//userdashboard
                }else{
             console.log(`User ${req.body.mail} login attempt invalid!`)
                      activity.push({
                "message":`User ${req.body.mail} login attempt invalid!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
                 res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/login.html"
    });
        }
            }
        }else{
             console.log(`User Doesnt exist!`)
                      activity.push({
                "message":`User doesnt exist`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
                 res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/signup.html"
    });
        }
    })
    //get user id
    //get user posts
    //search for user
    //add friend
    //remove friend 

// Administator Endpoints
   //Admin - Get (Get the Data) /api/data
    server.get("/api/data/users",(req,res)=>{
        res.send(db)
        console.log(db)
    });
    //An interface for the admin to see all users

//adds a new admin
    server.post("/api/signup/admin",(req,res)=>{
        const adminData = {
            "id":admin.length > 0 ? `${admin.length}`:"0",
            "adminData":{
                "name":req.body.name,
                "mail":req.body.mail,
                "password":"Gibson@2020242914"
            }
        }
        if(req.body.password!==adminData.adminData.password){
            activity.push({
                "message":`User ${req.body.name} invalid Admin Signup attempt!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
            console.log(`User ${req.body.name} invalid Admin Signup attempt!!`)
            return  res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/adminsignup.html"
    });
        }
        else{
            admin.push(adminData)
            console.log(`Admin ${adminData.adminData.name} has Signed in Succesfully!`)
            activity.push({
                "message":`Admin ${adminData.adminData.name} has Signed in Succesfully!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
            console.log(admin)
             res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/homepage.html"
    });
        }
    })
//adds a new user to the db array and assigns an id
    server.post("/api/signup/data/admin",(req,res)=>{
        const userdata = {
            "id":db.length > 0 ? `${db.length}`:"0",
            "userData":req.body,
        }
//middleware

        db.push(userdata);
        console.log(db);
        console.log("User Added!!")
        activity.push({
                "message":`User ${userdata.userData.name} at index: ${userdata.id} by Admin Successfully!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
         res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/homepage.html"
    });
    }
); 
//login admin
server.post("/api/login/admin",(req,res)=>{
        if(admin.length>0){
            for(let i=0;i<admin.length;i++){
                if((admin[i].adminData.mail==req.body.mail)&&(admin[i].adminData.password==req.body.password)){
                    console.log(`User ${admin[i].adminData.name} at index: ${admin[i]} exists !!`)
                    console.log(`User ${admin[i].adminData.name} at index: ${admin[i]} is Logged in Successfully!!`)
                    activity.push({
                "message":`User ${admin[i].adminData.name} at index: ${admin[i]} is Logged in Successfully!!`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
                console.log(admin)
                     res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/homepage.html"
    });//admin dashboard
                }else{
                    console.log(`User Doesnt exist!`)
                      activity.push({
                "message":`User doesnt exist`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
                 res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/adminlogin.html"
    });
                }
 
            }
        }else{
             console.log(`User Doesnt exist!`)
                      activity.push({
                "message":`User doesnt exist`,
                "timestamp":`${time.getHours()},${time.getMinutes()},${time.getSeconds()}--${time.getDate()}`
            })
                 res.json({ 
        success: true,
        redirectUrl: "https://snappod.netlify.app/adminsignup.html"
    });
        }
    })

//application history
    server.get("/api/data/history",(req,res)=>{
        res.send(activity)
        console.log(activity)
    });
    server.get("/api/data/admin",(req,res)=>{
        res.send(admin)
        console.log(admin)
    });

server.listen(PORT,()=>console.log("🔥 Server is Running! : http://localhost:"+PORT))