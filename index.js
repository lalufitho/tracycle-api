const bodyParser = require('body-parser');
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();
const router = express.Router();
const port = 3000;
const Transaksi = require('./model/transaksi');
const response = require('./config/response');
const ObjectId = require('mongodb').ObjectId;
const serverless = require("serverless-http");
require('./config/db');

router.use(bodyParser.json());

router.get('/transaksi', async(req, res) => {
    try {
        const data = await Transaksi.find();
        // console.log(data);
        response(200, data, "GET all transaction data success", res);
    } catch (error) {
        // console.error(error);
        response(500, null, "Error GET all transaction data", res);
    }
});

router.get('/transaksi/:id', async(req, res) => {
    try {
        const id = req.params.id
        const data = await Transaksi.find({ _id: new ObjectId(`${id}`) });
        response(200, data, `GET transaction data by id ${id} successfully`, res);
    } catch (error) {
        response(500, null, `Error GET transaction data by id ${id}`, res);
    }
});

router.post('/transaksi', [
    body('nama').notEmpty().withMessage('Nama is required'),
    body('alamat').notEmpty().withMessage('Alamat is required'),
    body('email').notEmpty().withMessage('Email is required'),
    body('nohp').notEmpty().withMessage('No HP is required'),
    body('jenis_sampah').notEmpty().withMessage('Jenis sampah is required'),
    body('berat_sampah').notEmpty().withMessage('Berat sampah is required'),
], async(req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            response(400, null, errors.array(), res);
            return;
        }

        // Calculate total_harga
        const beratSampah = req.body.berat_sampah;
        const totalHarga = beratSampah * 2000;

        // Save the transaction
        const newTransaksi = new Transaksi({
            nama: req.body.nama,
            alamat: req.body.alamat,
            email: req.body.email,
            nohp: req.body.nohp,
            jenisSampah: req.body.jenis_sampah,
            beratSampah: beratSampah,
            totalHarga: totalHarga,
        });

        const savedTransaksi = await newTransaksi.save();

        response(200, savedTransaksi, "Transaction created successfully", res);
    } catch (error) {
        // console.error(error);
        response(500, null, "Error creating data", res);
    }
});

router.delete('/transaksi/:id', async(req, res) => {
    try {
        const id = req.params.id;

        // Find the transaction by ID and delete it
        const deletedTransaksi = await Transaksi.findByIdAndDelete(id);

        if (!deletedTransaksi) {
            response(404, null, `Transaction with ID ${id} not found`, res);
            return;
        }

        response(200, deletedTransaksi, `Transaction with ID ${id} deleted successfully`, res);
    } catch (error) {
        // console.error(error);
        response(500, null, `Error deleting transaction with ID ${req.params.id}`, res);
    }
});

router.get('/hello', (req, res) => res.send('Hello World!'));

app.use('/api/', router);

module.exports = app;
module.exports.handler = serverless(app);

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });