import mongoose from 'mongoose'

const roleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scopes: [String]
},{
    timestamps: true
})

const Role = mongoose.model('Role',roleSchema)

export default Role