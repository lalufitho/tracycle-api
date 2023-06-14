const express = require('express');
const path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const Transaksi = require('../models/transaksi.model');
const response = require('../utils/response');

router.get('/', async (req, res) => {
  try {
    const data = await Transaksi.find();
    // console.log(data)
    response(200, data, 'GET all transaction data success', res);
  } catch (error) {
    console.error(error);
    response(500, null, 'Error GET all transaction data', res);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Transaksi.find({ _id: id });
    response(200, data, `GET transaction data by id ${id} successfully`, res);
  } catch (error) {
    response(500, null, `Error GET transaction data by id ${id}`, res);
  }
});

router.get('/pdf/:id', async (req, res) => {
  const { id } = req.params;
  const data = await Transaksi.find({ _id: id });

  res.render('invoice', { data: data[0] });
});

router.post('/', [
  body('nama').notEmpty().withMessage('Nama is required'),
  body('alamat').notEmpty().withMessage('Alamat is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('nohp').notEmpty().withMessage('No HP is required'),
  body('jenisSampah').notEmpty().withMessage('Jenis sampah is required'),
  body('beratSampah').notEmpty().withMessage('Berat sampah is required'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response(400, null, errors.array(), res);
      return;
    }

    // Define hargaSampah
    const SAMPAH = {
      plastik: 1000,
      kertas: 1500,
      logam: 2000,
      kaca: 2500,
      kaleng: 3000,
      kardus: 3500,
    };

    // Calculate total_harga
    const { jenisSampah } = req.body;
    const { beratSampah } = req.body;
    const totalHarga = beratSampah * SAMPAH[jenisSampah];

    // Save the transaction
    const newTransaksi = new Transaksi({
      nama: req.body.nama,
      alamat: req.body.alamat,
      email: req.body.email,
      nohp: req.body.nohp,
      jenisSampah: req.body.jenisSampah,
      beratSampah,
      totalHarga,
    });

    const savedTransaksi = await newTransaksi.save();

    response(200, savedTransaksi, 'Transaction created successfully', res);
  } catch (error) {
    response(500, null, 'Error creating data', res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the transaction by ID and delete it
    const deletedTransaksi = await Transaksi.findByIdAndDelete(id);

    if (!deletedTransaksi) {
      response(404, null, `Transaction with ID ${id} not found`, res);
      return;
    }

    response(200, deletedTransaksi, `Transaction with ID ${id} deleted successfully`, res);
  } catch (error) {
    // console.error(error)
    response(500, null, `Error deleting transaction with ID ${req.params.id}`, res);
  }
});

module.exports = router;
