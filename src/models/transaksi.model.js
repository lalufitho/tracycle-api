import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

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
  },
});

const Transaksi = model('transaksi', TransaksiSchema);

export default Transaksi;
