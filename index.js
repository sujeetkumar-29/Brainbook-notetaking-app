const express=require("express");
const app=express();//for server starts
const mongoose=require("mongoose");
const path=require("path");// to join other folder
const dotenv=require("dotenv").config();
// require note.js
const Note=require("./models/note");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user");

const userRouter=require("./routes/user.js");
const noteRouter=require("./routes/note.js");





app.set("views",path.join(__dirname,"views"));//ejs templete
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method")); 
app.engine("ejs",ejsMate);

// const dbUrl='mongodb://127.0.0.1:27017/note';
const atlasUrl=process.env.ATLASDB_URL;
main()
.then(()=>{
    console.log("connected to DB.");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect(atlasUrl);
}

const store=MongoStore.create({
   mongoUrl:atlasUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    // secret:process.env.SECRET,
    touchAfter:24*60*60,
});
store.on("error",function(e){
  console.log("error in session",e);
});
const sessionOntions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};




app.use(session(sessionOntions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currUser = req.user || null; // safe fallback
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    // console.log(req.user);
    next(); 
})

app.use("/",userRouter);
app.use("/notes",noteRouter);


// app.get("/",(req,res)=>{
//     res.send("Root is working.");
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
    
})

app.use((err,req,res,next)=>{
    let{statusCode,message}=err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
    // res.send("Something went wrong!");
    next();
})
app.use((req, res, next) => {
  console.log("req.user:", req.user);
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser  = req.user;
  next();
});

app.use((req, res, next) => {
  res.locals.currUser = req.user||null; // this makes 'currUser' available in all views
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});


app.listen(5500,()=>{
    console.log("Server is listening on port 5500.");
});