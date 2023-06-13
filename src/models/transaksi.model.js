const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransaksiSchema = new Schema({
    nama: {
        type: String,
        required: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    nohp: {
        type: String,
        required: true,
    },
    jenisSampah: {
        type: String,
        required: true,
    },
    beratSampah: {
        type: Number,
        required: true,
    },
    totalHarga: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

Transaksi = mongoose.model('transaksi', TransaksiSchema)

module.exports = Transaksi