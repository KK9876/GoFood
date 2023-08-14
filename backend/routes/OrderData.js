const express = require("express");
const router = express.Router();
const Order = require('../models/Orders')

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });


  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  // console.log(eId);

//first ever order for that user
  if (eId === null) {
    try {
    //   console.log(data);
    //   console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.status({ success: true });
      });
    } 
    catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } 
    //Not first order for that user  
  else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        //this will basically append the data to the existing cart data
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});


router.post("/myordersData", async (req, res) => {
  try{
    let mydata = await Order.findOne({'email':req.body.email});
    res.json({OrderData : mydata});
  
  }
  catch(error){
    res.send("server error" , error.message);
  }
});


module.exports = router;