const express=require("express");
const router=express.Router();
const Note=require("../models/note");
const {isLoggedIn, isOwner}=require("../middleware.js");

const wrapAsync = require("../utils/wrapAsync.js");
//Index route
router.get("/",isLoggedIn,wrapAsync(async(req,res)=>{
    res.locals.currUser=req.user;

    let notes= await Note.find({owner:req.user._id}).populate("owner");
        

    if(!Note){
        req.flash("error","Note not existed!");
        res.redirect("/notes");
    }
 //    console.log(notes);
    res.render("index.ejs",{notes});
 }));
 
 //New route
 router.get("/new",isLoggedIn,wrapAsync((req,res)=>{
    
     res.render("new.ejs");
 }));
 
 //Create route
 router.post("/",isLoggedIn,wrapAsync((req,res)=>{
     let {title,description}=req.body;
     let newNote=new Note({
         title:title,
         description:description,
         created_at:new Date(),
     });
     // console.log(newNote);
     newNote.owner=req.user._id;
     newNote.save()
     .then((res)=>{
         console.log("chat was saved.")
     })
     .catch((err)=>{
         console.log(err);
     })
     req.flash("success","New Note Created.");
     res.redirect("/notes");
 
 }));
 
 // Edit route
 router.get("/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let note=await Note.findById(id); 
     if(!Note){
        req.flash("error","Note not existed!");
        res.redirect("/notes");
    }
     res.render("edit.ejs",{note});
 }));
 
 //update route
 router.put("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let {title:newTitle,description:newDescription}=req.body;
     let updatedNote=await  Note.findByIdAndUpdate(id,{title:newTitle,description:newDescription,created_at:Date()},{runValidators:true,new:true});
     // console.log(updatedNote);
     req.flash("success"," Note updated.");
     res.redirect("/notes");
 }));
 // Destroy route
 router.delete("/:id",isLoggedIn,wrapAsync(async(req,res)=>{
     let {id}=req.params;
     let deletedNote=await Note.findByIdAndDelete(id);
     req.flash("success"," Note Deleted.");
     console.log(deletedNote);
     res.redirect("/notes");
 }));

 module.exports=router;