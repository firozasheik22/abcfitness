const express = require('express');
const router = express.Router();
const { createClasses } = require('../controllers/class');
const { createBooking, searchBookings } = require('../controllers/booking');

router.post('/classes', createClasses);
router.post('/bookings', createBooking);
router.get('/bookings', searchBookings);

module.exports = router;