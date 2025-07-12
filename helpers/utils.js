const moment = require('moment');
function generateDatesBetween(s, e) {
  const startDate = moment(s, 'MM-DD-YYYY');
  const endDate = moment(e, 'MM-DD-YYYY');
  const dates = [];
  const current = startDate.clone();
  while (current.isSameOrBefore(endDate)) {
    const formatted = current.format('YYYY-MM-DD'); // Store in DB format
    dates.push(formatted);
    current.add(1, 'day');
  }

  return dates;
}

module.exports = { generateDatesBetween };
