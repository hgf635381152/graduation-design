const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  userId: {
    type: Number,
    unique: true,
    require: true
  },
  username: {
    type: String
  },
  password: {
    type: Number
  },
  email: {
    type: String
  },
  taste: {
    type: String
  }
}, { collection: 'user', versionKey: false });

module.exports = mongoose.model('user', UserSchema);