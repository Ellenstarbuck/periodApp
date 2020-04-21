const mongoose = require ('mongoose')


const periodSchema = new mongoose.Schema({
  dateOfPeriod: { type: Date, default: Date.now, required: true },
  daysOfPeriod: { type: Number, min: 1, max: 10, required: true },
  cycleLength: { type: Number, min: 21, max: 45, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true 
})

//make virtual fields here




module.exports = mongoose.model('Period', periodSchema)