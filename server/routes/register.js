const express = require('express');
const router = express.Router();
const { addStudent } = require('../db/queries/studentQueries');

router.post('/', async (req, res) => {
  const { first_name, last_name, email } = req.query;
    try {
      const student = await addStudent(first_name, last_name, email);
      res.json(student);
    } catch(e) {
      res.status(500).json({ error: e.message });
    }
});

module.exports = router;