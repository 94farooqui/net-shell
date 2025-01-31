const mongoose = require("mongoose");

const connectDB = async () => {
  try{
    await mongoose.connect(process.env.MONGODB_URL).then( () => console.log("Database Connected")).catch(error => console.log("Error", error))
  }
  catch(error){

  }
}

module.exports = connectDB