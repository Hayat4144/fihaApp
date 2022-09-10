// Initialize all the required modules and files
const express = require("express");
var router = express.Router();
const fetchuser = require("../middlewear/fetchuser");
const Notes = require("../modals/Note");
const mongoose = require("mongoose");
const {CreateNote, FetchNotes, DeleteNotes, UpdateNotes} = require("../Note/note");
const { Register, Login } = require("../Authentication/auth");
const {Isvalidation, Isrequired } = require("../middlewear/Validation");
const {CreateContact,FetchContact,DeleteContact, UpdateContact} = require('../Contact/contact');
const { contvalidation, validError } = require("../middlewear/ContactValid");
const { PasswordChange } = require("../Authentication/PasswordChange");
const { Csrf,csrftoken, name } = require("../Authentication/CsrfGen");


// console.log(name)

//  1=> Register the user into the database
router.post("/register",  Isvalidation,Isrequired ,Register)

// 2=> Login the user 
router.post("/login", Login)

// 3=> Store the notes of the user in the database
router.post('/User_notes' , fetchuser, CreateNote)

router.post('/changepassword', fetchuser, PasswordChange)

//  4=> fetch user
router.post("/fetchUser", fetchuser, async (req, res) => {  //  fetchuser is the middlewear which is used to fetch user id from the from the user
  // fetch the user 
  try {
    userId = req.user.id; // get user id from the token
    const user = await AuthModel.findById(userId).select("-password"); // get the all data except the password
    res.json({ status: "ok", data: user }); // send the data to the user
  } catch (err) {
    console.log(err);
  }
});

//  5=> fetch the user notes 
router.get("/fetchNotes", fetchuser, FetchNotes)

// delete the notes
router.post("/deleteNotes/:id",fetchuser,DeleteNotes )

// update notes
router.post("/UpdateNotes/:id", fetchuser, UpdateNotes);

// starting of Contact 
router.post('/CreateContact', contvalidation, validError, fetchuser,CreateContact)


router.get('/FetchContact', fetchuser,FetchContact)

router.delete('/deleteContact/:id', fetchuser,DeleteContact)


router.post('/updateContact/:id', fetchuser,UpdateContact)

router.get('/getToken', fetchuser,Csrf)
router.get('/hello', (req,res)=>{
	res.status(200).send('Hello users');
})
module.exports = router;
