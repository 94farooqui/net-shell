const mongoose = require('mongoose');

const CredentialSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,

    },
    username: {
        type: String,

    },
    password: {
        type: String,

    },
    key: {
        type: String,

    },
    notes: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

})

// {
//     type: "SSH",
//     name: "",
//     website: "",
//     username: "",
//     password: "",
//     key: "",
//     notes: ""
//   }

module.exports = mongoose.model("Credential", CredentialSchema)