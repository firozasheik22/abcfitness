const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'abcignite',
  password: '1234', //
  port: 5432,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS classes (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      date DATE NOT NULL,
      start_time TEXT NOT NULL,
      duration INTEGER NOT NULL,
      capacity INTEGER NOT NULL,
      booked INTEGER DEFAULT 0
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      member_name TEXT NOT NULL,
      class_id INTEGER REFERENCES classes(id),
      participation_date DATE NOT NULL
    );
  `);
};

module.exports = { pool, initDB };