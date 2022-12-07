const express = require('express');
const router = express.Router();
const { getClasses, getClassesById, getClassesByClassType, createClass, deleteClass } = require('../db/queries/classQueries');
const { getAllStudentsPerClass, registerStudent, cancelRegistration } = require('../db/queries/classStudentsQueries');
const { getStudentList, getClassTypeList, getSpotsRemaining } = require('../helpers/classHelpers');

// Get a list of all classes
router.get('/', async (req, res) => {
  try {
    const classesInc = await getClasses();
    const classesCom = await getClassTypeList(classesInc);
    const classes = await getSpotsRemaining(classesCom);
    res.json(classes.sort(c => -c.start_datetime));
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get a single class by its id
router.get('/:id', async (req, res) => {
  try {
    const classesInc = await getClassesById(Number(req.params.id));
    const classesCom = await getClassTypeList(classesInc);
    res.json(classesCom);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get a list of classes by the type
router.get('/type/:id', async (req, res) => {
  try {
    const classes = await getClassesByClassType(Number(req.params.id));
    const classesInc = await getClassTypeList(classes);
    const classesCom = await getSpotsRemaining(classesInc);
    res.json(classesCom.sort(c => -c.start_datetime));
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Get a list of students that are registered in a class
router.get('/:id/students', async (req, res) => {
  try {
    const studentIds = await getAllStudentsPerClass(Number(req.params.id)); // Get list of student ids
    const students = await getStudentList(studentIds); // Get student objects based on ids
    res.json(students);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const classObj = await createClass(req.query);
    const classCom = await getClassTypeList([classObj]);
    res.json(classCom);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Register the logged in user for a class
router.post('/:class_id/register', async (req, res) => {
  try {
    const classStudent = await registerStudent(Number(req.params.class_id), Number(req.query.student_id));
    res.json(classStudent);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

// Unregister a user for a class
router.delete('/:class_id/register', async (req, res) => {
  try {
    const classStudent = await cancelRegistration(Number(req.params.class_id), Number(req.query.student_id));
    res.json(classStudent);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:class_id', async (req, res) => {
  try {
    const data = await deleteClass(Number(req.params.class_id));
    res.json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
