const mongoose = require('mongoose')

const identitasSchema = mongoose.Schema(
    {
        nama: {
            type: String,
            required: (true, "Silahkan input nama")
        },
        telepon: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps:true
    }
)

const Identitas = mongoose.model('Identitas', identitasSchema);

module.exports = Identitas;