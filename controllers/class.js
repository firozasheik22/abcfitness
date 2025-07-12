const moment = require('moment');
const { pool } = require('../helpers/db');
const { generateDatesBetween } = require('../helpers/utils');

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
  const classDates = generateDatesBetween(startDate, endDate);

  try {
    for (const date of classDates) {
      await pool.query(
        'INSERT INTO classes (name, date, start_time, duration, capacity) VALUES ($1, $2, $3, $4, $5)',
        [name, date.split('T')[0], startTime, duration, capacity]
      );
    }
    return res.status(201).json({ message: `${classDates.length} classes created` });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};
