const AuthModal =require('../modals/Auth')
const bcrypt = require('bcrypt')
exports.PasswordChange = async(req,res)=>{
    const UserId = req.user.id ;
    const csrf_token = "002393db86855dbe46598d16cce3c52b0c5d44bc";
    const main_token = "002393db86855dbe46598d16cce3c52b0c5d44bc" ;
    const {email,currentPassword,newPassword} = req.body ;
    try{
        const IsEmail = await AuthModal.find({email}) ;
        console.log(IsEmail)
        if(IsEmail.length > 1 (await bcrypt.compare(currentPassword,IsEmail[0].password))){
            // if(csrf_token === main_token){
            //     res.status(200).send({data:'well'})
            // }
            // else{
            //     res.status(401)
            // }
            res.status(200).send({data:'user invalid'})
        }else{
            res.status(200).send({data:'user valid'})
        }
    }catch(err){
        console.log(err)
    }
}
