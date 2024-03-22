const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'first name must be provided'],
  },
  lastname: {
    type: String,
    required: [true, 'last name must be provided'],
  },
  email: {
    type: String,
    unique: [true, "user already exists"],
    required: [true, 'email must be provided'],
  },
  survey_number: {
    type: String,
    default: ""

  },
  verification_type:{
    type: String
  },
  surveyor_name: {
    type: String,
    default: ""

  },
  cof_number: {
    type: String,
    default: ""
  },
  document: {
    type: Array,
    default: []
  },
  images: {
    type: Array,
    default: []
  },
  verified_status:{
    type: Boolean,
    default: false,
  },
  phone_number:{
    type: Number,
    default: 0,
  },
  payment_status:{
    type: String,
    default: "pending",
    enum:{
      values: ["pending", "failed", "paid"],
      message: '{VALUE} is not supported',
    }
  },
  
})

module.exports = mongoose.model('User', UserSchema)
