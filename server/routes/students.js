const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const cron = require('node-cron');


require('dotenv').config();

const { getStudents, getStudentByEmail, getStudentById, getStudentCodeById, updateStudent } = require('../db/queries/studentQueries');
const { getAllClassesPerStudent } = require('../db/queries/classStudentsQueries');
const { getClassList, getClassTypeList } = require('../helpers/classHelpers');

// Get a list of all students in database
router.get('/', async (req, res) => {
  try {
    const students = await getStudents();
    res.json(students);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('../../');
});

// Get a student by their email
router.get('/email/:email', async (req, res) => {
  try {
    const student = await getStudentByEmail(req.params.email);
    res.json(student);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get a student by their id
router.get('/:id', async (req, res) => {
  try {
    const student = await getStudentById(Number(req.params.id));
    res.json(student);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get student code by id
router.get('/code/:id', async (req, res) => {
  try {
    const code = await getStudentCodeById(Number(req.params.id));
    res.json(code);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Send code email to student's email
router.get('/send/:email', async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"EasyFit " <dachuy@zohomail.com>',
      to: 'dachuy87@gmail.com',
      subject: 'Hello',
      html: `<html>
      <h3>EasyFit</h3>
      <p>Hello, thank you for visiting our website. Here is login code from EasyFit: ${req.query.unique_code}</p>
      </html>`
    });

    res.json(info);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/send/:email/receipt/:credits/:subtotal', async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"EasyFit " <dachuy@zohomail.com>',
      to: 'dachuy87@gmail.com',
      subject: 'Receipt for Recent Purchase',
      html: `<html>
      <h3>EasyFit</h3>
      <p>Thank you for your purchase! You have bought ${req.params.credits} credits for a total of $${req.params.subtotal} CAD</p>
      </html>`,
    });

    res.json(info);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Send reminder email to student's email about upcoming class
router.get('/send/:email/reminder/:month/:day/:hours/:minutes', async (req, res) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let task = cron.schedule(`${req.params.minutes} ${req.params.hours} ${req.params.day} ${req.params.month} 2`, async () => {
      let info = await transporter.sendMail({
        from: '"EasyFit " <dachuy@zohomail.com>',
        to: 'dachuy87@gmail.com',
        subject: 'Reminder',
        html: `<html>
        <h3>EasyFit</h3>
        <p>Just a friendly reminder about your upcoming class in ${req.params.hours} hours!</p>
        </html>`,
      });

      res.json(info);
    });

    setTimeout(() => {
      task.stop();
    }, 1000 * 60 * 60 * 24 + 5);

  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Update a student's information
router.put('/:id', async (req, res) => {
  try {
    const student = await updateStudent(Number(req.params.id), req.query);
    res.json(student);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all class ids that a student is registered for
router.get('/:id/classes/id', async (req, res) => {
  try {
    const classIds = await getAllClassesPerStudent(Number(req.params.id)); // Get all class ids
    res.json(classIds);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all classes that a student is registered for
router.get('/:id/classes', async (req, res) => {
  try {
    const classIds = await getAllClassesPerStudent(Number(req.params.id)); // Get all class ids
    const classesInc = await getClassList(classIds); // Get all class objects
    const classesCom = await getClassTypeList(classesInc); // Append all class type data onto class objects
    res.json(classesCom.sort(c => -c.start_datetime));
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
