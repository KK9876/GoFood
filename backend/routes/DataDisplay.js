const express = require("express");
const router = express.Router();

router.post('/gofooddata' , (req,res)=>{
    try{
        console.log(global.gofood)
        //fetching both data from db.js
        res.send([global.gofood , global.foodcategory])
    }catch(error){
        console.log(error.message);
        res.send("server error");
    }
})

module.exports = router;