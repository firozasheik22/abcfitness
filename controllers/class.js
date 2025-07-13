const moment = require('moment');
const { pool } = require('../helpers/db');

const Joi = require('joi');

const classSchema = Joi.object({
  name: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater('now').required(),
  startTime: Joi.string().required(),
  duration: Joi.number().integer().positive().required(),
  capacity: Joi.number().integer().min(1).required()
});

exports.createClasses = async (req, res) => {
  const { error } = classSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { name, startDate, endDate, startTime, duration, capacity } = req.body;

  const startingDate = moment(startDate, 'MM-DD-YYYY').format('YYYY-MM-DD');
  const endingDate = moment(endDate, 'MM-DD-YYYY').format('YYYY-MM-DD')

  try {
      await pool.query(
        'INSERT INTO classes (name, start_date, end_date, start_time, duration, capacity) VALUES ($1, $2, $3, $4, $5, $6)',
        [name, startingDate, endingDate, startTime, duration, capacity]
      );
    return res.status(201).json({ message: `Class created successfully` });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};
