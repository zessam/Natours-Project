const fs = require('fs');
const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // BUILD THE QUERY
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);
    const query = Tour.find(queryObj);

    // EXECUTE THE QUERY
    const tours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      requestedAt: req.requestTime,
      message: err
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({})
    // newTour.save()

    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      requestedAt: req.requestTime,
      message: err
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      requestedAt: req.requestTime,
      message: err
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      requestedAt: req.requestTime,
      message: err
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: null
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      requestedAt: req.requestTime,
      message: err
    });
  }
};
