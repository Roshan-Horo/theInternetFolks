import mongoose from 'mongoose'

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const School = mongoose.model('School',schoolSchema)

export default School