 const express=require("express");
 const router=express.Router();
 const User=require("../models/user");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const { saveRedirectUrl} = require("../middleware");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password}=req.body;
       let newUser= new User({username,email,password});
       const registeredUser= await User.register(newUser,password);
       console.log(registeredUser);
       req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to the BrainBook "+registeredUser.username);
       res.redirect("/notes");
       })
       
   
    }
    catch(e){
         req.flash("error",e.message);
        res.redirect("/signup");
    }

        
}));

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(async(req,res)=>{
    req.flash("success","Welcome back "+req.user.username);
   res.redirect("/notes");
}));

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/notes");
    })
})

 module.exports=router;
