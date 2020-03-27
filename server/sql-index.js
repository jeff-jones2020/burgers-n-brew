// const express = require('express');
const { Pool } = require('pg');
// const app = express();
// app.use(express.json());

const db = new Pool({
  // connectionString: 'postgres://dev:lfz@localhost/studentGradeTable'
  connectionString: process.env.DATABASE_URL
});

db.query(res => {
  // console.log('connect');
});

module.exports = db;
