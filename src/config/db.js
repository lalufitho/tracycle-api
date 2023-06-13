const mongoose = require('mongoose')

const uri = 'mongodb+srv://lalufitho:PVdjMBJebwuOBI8v@tracycle.mmqrdpc.mongodb.net/tracycle'

const tes = mongoose.connect(uri)

// const transaksi1 = new Transaksi({
//     nama: 'Alfitra',
//     alamat: 'Gerung',
//     nohp: '081920234827',
//     jenis_sampah: 'Besi',
//     berat: 50,
// });

// transaksi1.save().then((transaksi) => console.log(transaksi));