const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthModel = require("../modals/Auth");
const bodyParser = require("body-parser");

//  1=> Register the user
exports.Register = async (req, res) => {
  //  Get the username , password and email from the client
  const { username, password: plainText, email } = req.body;

  // set the header
  res.setHeader("Content-Type", "appliction/json");
  // Hash the password and store in the database
  const password = await bcrypt.hash(plainText, 10);
  try {
    const result = await AuthModel.create({
      username,
      password,
      email,
    });

    //  Generate the jwt token and assign id and username to the token
    const token = jwt.sign(
      {
        id: result._id,
        username: result.username,
      },
      process.env.JWT_SECRET
    );
	  return res.json({ status: "ok", User_token: token,data:"Registration has been successfull." });
  } catch (err) {
    // debug
    console.log(err);
    if (err.code === 11000) {
      return res.json({ status: "error", error: "user already exist" });
    }
  }
};



exports.Login = async(req,res)=>{
  res.setHeader('Content-Type','application/json')
  try{
    const {email,password} = req.body ;
     
    const IsUser = await AuthModel.findOne({email});
	  console.log(IsUser);
    
    if (!IsUser){
      return res.status(401).send({error:'Invalid Email/Password'})
    }
    if(IsUser && (await bcrypt.compare(password,IsUser.password))){
      const token = jwt.sign({
        id:IsUser._id,
        username:IsUser.username
      },process.env.JWT_SECRET) ;
	    return res.status(200).send({status:'ok',token,data:"You are Login Successfully."})
    }
    else{
	    return res.status(401).send({status:'error',error:"Invalid Email/password"})
    }
  }catch(err){
    console.log(err)
  }
}
