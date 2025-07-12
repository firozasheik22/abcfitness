const moment = require('moment');
const { pool } = require('../helpers/db');
const Joi = require('joi');

const createBookingSchema = Joi.object({
  memberName: Joi.string().required(),
  className: Joi.string().required(),
  participationDate: Joi.date().greater('now').required()
});

const searchBookingSchema = Joi.object({
  memberName: Joi.string().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional()
});

exports.createBooking = async (req, res) => {
  const { error } = createBookingSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { memberName, className, participationDate } = req.body;

  try {
    const { rows } = await pool.query(
      `SELECT * FROM classes WHERE name = $1 AND date = TO_DATE($2, 'MM/DD/YYYY')`,
      [className, participationDate]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Class not found for the given date' });
    }

    const targetClass = rows[0];

    if (targetClass.booked >= targetClass.capacity) {
      return res.status(400).json({ error: 'Class is full' });
    }

    const bookingDate = moment(participationDate, 'MM-DD-YYYY');

    await pool.query(
      'INSERT INTO bookings (member_name, class_id, participation_date) VALUES ($1, $2, $3)',
      [memberName, targetClass.id, bookingDate.format('YYYY-MM-DD')]
    );

    await pool.query(
      'UPDATE classes SET booked = booked + 1 WHERE id = $1',
      [targetClass.id]
    );

    return res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};

exports.searchBookings = async (req, res) => {
  const { error } = searchBookingSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { memberName, startDate, endDate } = req.body;

  try {
    let query = `
      SELECT b.member_name, to_char(b.participation_date, 'MM-DD-YYYY') as booking_date, c.name AS class_name, c.start_time
      FROM bookings b
      JOIN classes c ON b.class_id = c.id
      WHERE 1=1
    `;
    const params = [];

    if (memberName) {
      params.push(memberName);
      query += ` AND LOWER(b.member_name) = LOWER($${params.length})`;
    }

    if (startDate && endDate) {
      params.push(new Date(startDate), new Date(endDate));
      query += ` AND b.participation_date BETWEEN $${params.length - 1} AND $${params.length}`;
    }

    const { rows } = await pool.query(query, params);
    console.log('rows', rows);
    if (!rows.length) return res.status(200).json({ message: 'No Bookings exist with given details'} );
    return res.status(200).json(rows);
  } catch (err) {
    return res.status(500).json({ error: 'Database error', details: err.message });
  }
};
