const mongoose =require('mongoose')

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
  .then(()=>{
    console.log("mongoDB is connected Successfully..");
  }).catch((err)=>{
    console.log('Error in MongoDB connection...' ,err);
  })
  