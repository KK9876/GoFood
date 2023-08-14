const express = require("express")
const router = express.Router()
const User = require('../models/User.js')
const {body , validationResult} = require('express-validator')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const jwtsecret = "aaaabbbb";

router.post(
  "/createuser",
  //express validator for minimum length requirements in data
  [
    //example for name -> if its length 5 is true then ok , else name incorrect ..... output
    body("email", "please enter again").isEmail(),
    body("name", "name incorrect length please enter again").isLength({ min: 5 }),
    body("password", "password incorrect length please enter again").isLength({ min: 5,}),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser",
  [
  body("email", "please enter again").isEmail(),
  body("password", "password incorrect length please enter again").isLength({min: 5,})
  ],

  async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try{
        let userdata = await User.findOne({ email });
        console.log(userdata)

        if(!userdata){
        return res.status(400).json({errors : "Incorrect email"});
        }
        
        //compare because userdata.password is encrypted , so used bcrypt for both
        const pwdcompare = await bcrypt.compare(req.body.password , userdata.password)
        if (!pwdcompare) {
          return res.status(400).json({ errors: "incorrect password" });
        }

        const data = {
            user:{
                id:userdata.id
            }}

        const authToken = jwt.sign(data,jwtsecret)
        res.json({ success: true , authToken:authToken });
    }
    catch(error){
        console.log(error);
        res.json({ success: false });
    }
}
);

module.exports = router;