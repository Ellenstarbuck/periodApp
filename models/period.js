const mongoose = require ('mongoose')


const periodSchema = new mongoose.Schema({
  dateOfPeriod: { type: Date, required: true },
  daysOfPeriod: { type: Number, min: 1, max: 10, required: true },
  cycleLength: { type: Number, min: 21, max: 45, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true 
})

//make virtual fields here

periodSchema
.virtual ('nextPeriod')
.get(function() {
  let dateOne = this.dateOfPeriod
  let result = new Date()
  result.setDate(dateOne.getDate() + (this.cycleLength +1))
  return result.toDateString()
})

periodSchema
.set('toJSON', {
  virtuals: true,
  transform(doc, json) {
    delete json.dateOfPeriod
    delete json.daysOfPeriod
    delete json.cycleLength
    return json
  }
})



module.exports = mongoose.model('Period', periodSchema)