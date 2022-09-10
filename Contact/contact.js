const res = require("express/lib/response");
const ContactModel = require("../modals/Contact");

exports.CreateContact = async (req, res) => {
  const { mobile, firstname, lastname, email, address, zip, city, state } =
    req.body;
  res.setHeader("Content-Type", "appliction/json");
  try {
    const userId = req.user.id; // get the user id from token by user

    // save the notes of the user in the database
    const result = await ContactModel.create({
      mobile,
      firstname,
      lastname,
      email,
      address,
      zip,
      city,
      state,
      user: userId,
    });

    // send the message to the user
    return res.json({
      status: "ok",
      data: "Your Contact details has been submitted successfully.",
    });
  } catch (err) {
    console.log(err);
    if (err.code ===  11000) {
      res.status(401).send({ status: "error", error: "Duplicate key value" });
    }
    return res.status(200).send({ status: "error", error: err });
  }
};

exports.FetchContact = async (req, res) => {
  const userId = req.user.id;
  try {
    const IsContact = await ContactModel.find({ 'user': userId });
    if (IsContact.length < 1){
    	return res.status(200).json({status:'error',error:'You have not add any contact info yet . Add your contact info and then try again.'})
    }
    else{
    	if(IsContact[0].user.toString()== userId){
           
              const result = await ContactModel.find({'user':userId}) ;
              
              
              return res.status(200).json({status:'ok',data:result})
          }
          else{
            return res.status(401).json({status:'error', error:'unauthorized'})
          }
    }
    
  } catch (err) {
    if (err) throw err;
    res.json({ status: "error", error: err });
  }
};

exports.DeleteContact = async (req, res) => {
  try {
    const user = req.user.id;
    const IsContact = await ContactModel.findById(req.params.id);
    if (IsContact) {
     
      if (IsContact.user.toString() == user) {
        console.log(IsContact.user.toString());
        const data = await ContactModel.findByIdAndDelete(req.params.id);
        res.status(200);
        res.json({ status: "ok", result: data });
      } else {
        return res.status(401).json({ state: "error", data: "unauthorized" });
      }
    } else {
      return res.status(501).json({ error: "some error has been occured" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: "error", error: err });
  }
};



exports.UpdateContact = async (req, res) => {
  try {
    const user = req.user.id;  // getting userId 
    const IsContact = await ContactModel.findById(req.params.id);  
    
    // if any data found and user id is matched then update the items , if not throw error 
      if (IsContact && IsContact.user.toString() == user) {
      
        const finalContact = await ContactModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        return res.status(200).json({ status: "ok", data: "Data has been updated successfully."});
      }
       else{
       // send error 
        return res.status(401).json({ state: "error", data: "unauthorized" });
      }
    
  } catch (error) {
    console.log(error);
  }
};
