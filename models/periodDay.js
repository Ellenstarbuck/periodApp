const mongoose = require('mongoose')

const periodDaySchema = new mongoose.Schema({
  periodToday: { type: Boolean, required: true },
  date: { type: Date, default: Date.now, required: true },
  symptoms: [ symptomsSchema ],
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true 
})


const symptomsSchema = new mongoose.Schema({
  bleeding: { type: String, required: false, enum: ['spotting','light', 'medium', 'it\'s like when the lift doors open in The Shining']},
  cramps: { type: String, required: false, enum: ['none', 'a mild twinge', 'distracting', 'the worst - bring on menopause']},
  boobs: { type: String, required: false, enum: ['they\'re okay, thanks for asking', 'so sore!']},
  mood: { type: String, required: false, enum: ['I will fight anyone who disagrees with me', 'I would probably cry over spilt milk', 'normal, whatever that is', 'pretty upbeat']},
  sex: { type: String, required: false, enum: ['not really', 'no more then usual', 'YES!']},
  foodCravings: { type: String, required: false, enum: ['none', 'all the carbs', 'all the chocolate', 'I just want to eat the entire contents of the fridge']},
  energy: { type: String, required: false, enum: ['low', 'average', 'I could party']},
  poops: { type: String, required: false, enum: ['living on the toilet', 'bunged up', 'normal']},
  bloats: { type: String, required: false, enum: ['farty', 'nauseous', 'so bloated I look pregnant', 'normal']},
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true 
})



module.exports = mongoose.model('PeriodDay', periodDaySchema)