# abcfitness
FIROZA - ABCFitness - Coding Exercise - Team Ignite

A RESTful API built using Node.js, Express, and PostgreSQL to manage workout classes and member bookings for gyms/clubs.

🚀 Features
-------------

Create a class with start and end dates, capacity, duration, start time

Book a class by specifying member name and date

Enforce class capacity limit

Search bookings by member and date range

Input validation using Joi

------------------------------------------------------------------

🧱 Tech Stack
---------------

Node.js

Express.js

PostgreSQL

Joi (validation)

pg (PostgreSQL client)

-------------------------------------------------------------------

📁 Folder Structure
-----------------------

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

-----------------------------------------------------------------

🛠 Setup Instructions
----------------------

✅ Requirements
----------------

Node.js (v16 or later)

Install Express - npm install express

Install pg - npm install pg

Install moment - npm install moment

Install Joi - npm install joi

PostgreSQL installed locally

---------------------------------------------------------------------

🔧 Database Setup
--------------------

Create PostgreSQL DB: CREATE DATABASE abcignite;

Ensure user and password are configured in helpers/db.js:

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'abcignite',
  password: 'your_password',
  port: 5432,
});

-------------------------------------------------------------------------------------

🚀 Start Server
-----------------

node index.js

Server runs at: http://localhost:3000

🗄️ Database Schema
--------------------

classes Table
-------------
id SERIAL PRIMARY KEY,

name TEXT NOT NULL,

start_date DATE NOT NULL,

end_date DATE NOT NULL,

start_time TEXT NOT NULL,

duration INTEGER NOT NULL,

capacity INTEGER NOT NULL

-----------------------------

bookings Table
--------------

id SERIAL PRIMARY KEY,

member_name TEXT NOT NULL,

class_id INTEGER REFERENCES classes(id),

participation_date DATE NOT NULL

-------------------------------------------------------------

📌 API Endpoints
---------------------

🔹 Create Classes

POST /api/classes

Body:

{
  "name": "Pilates",
  "startDate": "12-09-2025",
  "endDate": "12-19-2025",
  "startTime": "14:00",
  "duration": 60,
  "capacity": 10
}

Logic:

Joi validation ensures:

--name is required

--startDate and endDate are valid

--endDate is in future

--capacity is ≥ 1

The controller Inserts a single record into the classes table.

🔹 Book a Class

POST /api/bookings

Body:

{
  "memberName": "John Doe",
  "className": "Pilates",
  "participationDate": "12-14-2025"
}

Logic:

Joi validation checks:

--memberName is present

--className is present

--participationDate is a future date

Finds the class by name and participationDate is within the class's start/end range 

Validates:

Count of existing bookings for that date does not exceed capacity

If valid:

Inserts new record into bookings

🔹 Search Bookings

GET /api/bookings

{
  "memberName": "John Doe", //optional
  "startDate": "12-14-2025", //optional
  "endDate": "12-15-2025", //optional
}

Logic:

Joi validation checks:

--memberName is optional

--start and end dates range is optional

Dynamically builds a query using passed filters

Returns array of: member name, class name, booking date, start time

----------------------------------------------------------------------------

✅ Validation Rules
---------------------

capacity must be at least 1

endDate must be a future date

participationDate must be in the future

A class can't be overbooked

----------------------------------------------------------------------------

🧪 Testing
----------------

Use Postman or curl to test endpoints.

Example CURL -

curl -X POST http://localhost:3000/api/bookings \
  -H "Content-Type: application/json" \
  -d '{
    "memberName": "Alice",
    "className": "Pilates",
    "participationDate": "12-15-2025"
  }'


