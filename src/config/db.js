const mongoose = require('mongoose');

const uri = 'mongodb+srv://lalufitho:PVdjMBJebwuOBI8v@tracycle.mmqrdpc.mongodb.net/tracycle';

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

connect();
// const transaksi1 = new Transaksi({
//     nama: 'Alfitra',
//     alamat: 'Gerung',
//     nohp: '081920234827',
//     jenis_sampah: 'Besi',
//     berat: 50,
// });

// transaksi1.save().then((transaksi) => console.log(transaksi));
