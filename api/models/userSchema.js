import mongoose from "mongoose";
const Schema = mongoose.Schema;

let userSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },

  name: {
    type: String,
    match: /^[a-zA-Z ]{2,30}$/,
    required: [true, 'name is required...!']
  },

  email: {
    type: String,
    match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    unique: true,
    lowercase: true,
    required: [true, 'email is required...!']
  },

  username: {
    type: String,
    match: /^[a-zA-Z0-9]+$/,
    unique: true,
    required: [true, 'username is required...!']
  },

  password: {
    type: String,
    required: [true, 'password is required...!']
  },

  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Users', userSchema);