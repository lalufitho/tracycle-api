const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaksi = new Schema({
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

TransaksiModel = mongoose.model('transaksi', Transaksi)

module.exports = TransaksiModel