import mongoose, { mongo } from "mongoose";

const CredentialSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    host: {
        type: String,
        required: true
    },
    notes: {
        type: String
    }

})

module.exports = mongoose.model("Credential", CredentialSchema)