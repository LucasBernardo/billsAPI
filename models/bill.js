const mongoose = require('mongoose')

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    value: {
        type: Number,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    paymentDate: {
        type: Date,
        required: true
    },
    adjustedValue: {
        type: Number
    },
    expiredDays: {
        type: Number
    }
})

module.exports = mongoose.model('Bill', billSchema)

