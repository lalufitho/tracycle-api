const express = require('express');

const router = express.Router();
const { body, validationResult } = require('express-validator');
const Feedback = require('../models/feedback.model');
const response = require('../utils/response');

router.get('/', async (req, res) => {
  try {
    const data = await Feedback.find();
    // console.log(data)
    response(200, data, 'GET all feedback data success', res);
  } catch (error) {
    console.error(error);
    response(500, null, 'Error GET all feedback data', res);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Feedback.find({ _id: id });
    response(200, data, `GET feedback data by id ${id} successfully`, res);
  } catch (error) {
    response(500, null, `Error GET feedback data by id ${id}`, res);
  }
});

router.post('/', [
  body('nama').notEmpty().withMessage('Nama is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('message').notEmpty().withMessage('Message is required'),
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response(400, null, errors.array(), res);
      return;
    }
    // Save feedback
    const newFeedback = new Feedback({
      nama: req.body.nama,
      email: req.body.email,
      message: req.body.message,
    });

    const savedFeedback = await newFeedback.save();

    response(200, savedFeedback, 'Feedback created successfully', res);
  } catch (error) {
    response(500, null, 'Error creating data', res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Find the transaction by ID and delete it
    const deletedFeedback = await Feedback.findByIdAndDelete(id);

    if (!deletedFeedback) {
      response(404, null, `Feedback with ID ${id} not found`, res);
      return;
    }

    response(200, deletedFeedback, `Feedback with ID ${id} deleted successfully`, res);
  } catch (error) {
    // console.error(error)
    response(500, null, `Error deleting feedback with ID ${req.params.id}`, res);
  }
});
