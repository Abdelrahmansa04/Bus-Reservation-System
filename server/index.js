const express = require("express")
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const cors = require("cors")
const session = require('express-session')
const MonogoStore = require("connect-mongo")
const userModel = require('./models/users')
require('dotenv').config();
const busRoutes = require('./routes/busRoutes');
const bookingRoutes = require('./routes/bookingRouter')
const SeatSelection = require('./routes/SeatSelection')
const contactRoutes = require('./routes/contactRoutes'); // Assuming the contact routes are in the routes folder


port = 3001
const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000", // Adjust this to match your frontend URL
    credentials: true,  // Allow cookies to be sent with requests
}));
app.use('/buses', busRoutes);
// app.use('/api', bookingRoutes);
app.use('/seatselection',SeatSelection);


// Contact routes
app.use('/contact', contactRoutes);

//MongoDB connection 
mongoose
.connect("mongodb://127.0.0.1:27017/bus-system")
.then( ()=> console.log("MongoDB connected"))
.catch((err)=> console.error(err));

//Routes
// app.get("/api/buses", require('./routes/busRoutes'))


//backend of the login and signup and session
app.use(session({
    secret: "ARandomStringThatIsHardToGuess12345",
    resave: false,
    saveUninitialized: false,
    store: MonogoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/bus-system"}),
    cookie: {
        httpOnly: true,
        maxAge: 36000000,
        secure: false,
    }
}))


app.post('/login', async  (req,res)=> {
    // const {email,password} = req.body;
    // userModel.findOne({email:email})
    // .then(user => {
    //     if (!user){
    //         return res.status(404).json("This email does not exist");
    //     }
    //     const isPasswordValid = bcrypt.compare(password, user.password);
    //     if(!isPasswordValid){
    //         return res.status(401).json("The password is incorrect");
    //     }
    //     req.session.userId =user._id;
    //     res.status(200).json("login successful");
    // })
    // .catch (err => res.status(500).json("Internal server error"))
    const { email, password } = req.body;

    
    try {
        const user = await userModel.findOne({ email });
        console.log(user)
        if (!user) {
            return res.status(404).json("This email does not exist");
        }

        // Check password validity
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid)
        if (!isPasswordValid) {
            return res.status(401).json("The password is incorrect");
        }

        // Set session ID
        const sessionID = req.sessionID;
        // req.session.authenticated = true;   
        req.session.userId = user._id;
        // res.send(sessionID)

        res.status(200).json({"message":"Login successful", "userId":req.session.userId, "sessionID": sessionID});
    } catch (err) {
        res.status(500).json("Internal server error");
    }
})

app.post('/register', async (req , res) => {
    // const {email,password} = req.body;
    // userModel.findOne({email})
    // .then(userExist => {
    //     if(userExist){
    //         res.json("email already exists")
    //     }else{ 
    //         userModel.create(req.body)
    //         .then(userNew => res.json(userNew))
    //         .catch(err => res.json(err))
    //         res.json("succsse")
    //     }
    
    // })
    // .catch(err => res.json(err))

    const { email, password } = req.body;

    try {
        const userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.json("Email already exists");
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await userModel.create({email,password: hashedPassword});

        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json("Internal server error");
    }
})

app.post("/logout",(req, res) => {
    console.log("before: ", req.session)
    req.session.destroy(err => {
        if(err){
            return res.status(500).json("failed to logout");
        }
        res.clearCookie("connect.sid");
        res.status(200).json({"message":"logout successfuly", "session": req.session});
        console.log("after: ", req.session)

    })
})

app.get("/auth" , (req,res)=>{
    // console.log(req.session.userId)
    console.log(req.session.userId)
    if(req.session.userId){
        res.status(200).json({authenticated: true, "session": req.session.userId});
    }else{
        res.status(401).json({authenticated: false, "session": req.session.userId});
    }
})

app.listen(3001 , () =>{
    console.log("sever is running")
})
