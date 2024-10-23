const mongoose = require('mongoose')

const ApptSchema = new mongoose.Schema({
    ApptDate: Date,
    Place: String,
    Patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    ApptType: String,
    Details: String,
    Advice: String,
    Fees: String,
    Comment: String
})

const Appt = mongoose.model('Appt', ApptSchema)

module.exports = Appt