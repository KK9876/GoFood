const mongoose = require("mongoose");
let MONGOURI= "mongodb+srv://gofood:gofood123@cluster0.fwifcip.mongodb.net/gofood?retryWrites=true&w=majority";
const mongoURI = MONGOURI;

const mongoDB = async () =>{
    await mongoose.connect(mongoURI, {useNewUrlParser:true} , async (error) => {
        if(error){
            console.log("error")
        }
        else{
        console.log("mongodb connected to mongoose successfully");
        //fetched data from mongodb collection
        const fetched_data = await mongoose.connection.db.collection("gofood");
        // converted data to Array and returned 
        fetched_data.find({}).toArray( async function(err,data){
            const foodcategory = await mongoose.connection.db.collection("foodcategory");
            foodcategory.find({}).toArray( async function(err,catdata){
              if(err){
                  console.log(error);
              }
              else{
                global.gofood = data;
                global.foodcategory = catdata;
              }
            })
        })}
});}

module.exports = mongoDB;
