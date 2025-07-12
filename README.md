# abcfitness
FIROZA - ABCFitness - Coding Exercise - Team Ignite

A RESTful API built using Node.js, Express, and PostgreSQL to manage workout classes and member bookings for gyms/clubs.

🚀 Features

Create classes with start and end dates, capacity, duration, start time

Book a class by specifying member name and date

Enforce class capacity limit

Search bookings by member and date range

Input validation using Joi

------------------------------------------------------------------

🧱 Tech Stack

Node.js

Express.js

PostgreSQL

Joi (validation)

pg (PostgreSQL client)

-------------------------------------------------------------------

📁 Folder Structure

abc-ignite-api/
├── controllers/         # Request logic
│   ├── booking.js
│   └── class.js
├── routes/              # API route definitions
│   ├── index.js
├── helpers/             # DB connection and utils
│   ├── db.js
│   └── utils.js
├── index.js             # App entry point
└── package.json

🛠 Setup Instructions

✅ Requirements

Node.js (v16 or later)

Install Express - npm install express
Install pg - npm install pg
Install moment - npm install moment
Install Joi - npm install joi

PostgreSQL installed locally

🔧 Database Setup

Create PostgreSQL DB: CREATE DATABASE abcignite;

Ensure user and password are configured in helpers/db.js:

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'abcignite',
  password: 'your_password',
  port: 5432,
});

📦 Install Dependencies

npm install

🚀 Start Server

node index.js

Server runs at: http://localhost:3000

📌 API Endpoints

🔹 Create Classes

POST /api/classes

Body:

{
  "name": "Pilates",
  "startDate": "2025-08-01",
  "endDate": "2025-08-10",
  "startTime": "14:00",
  "duration": 60,
  "capacity": 10
}

🔹 Book a Class

POST /api/bookings

Body:

{
  "memberName": "John Doe",
  "className": "Pilates",
  "participationDate": "2025-08-03"
}

🔹 Search Bookings

GET /api/bookings

{
  "memberName": "John Doe", //optional
  "startDate": "2025-08-08", //optional
  "endDate": "2025-08-10", //optional
}


✅ Validation Rules

capacity must be at least 1

endDate must be a future date

participationDate must be in the future

A class can't be overbooked

🧪 Testing

Use Postman or curl to test endpoints.


