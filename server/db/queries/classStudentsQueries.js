const db = require('../index');

const getAllClassesPerStudent = async (student_id) => {
  const queryDef = {
    text: 'SELECT class_id FROM class_students WHERE student_id = $1;',
    values: [student_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const getAllStudentsPerClass = async (class_id) => {
  const queryDef = {
    text: 'SELECT student_id FROM class_students WHERE class_id = $1;',
    values: [class_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const registerStudent = async (class_id, student_id) => {
  const queryDef = {
    text: 'INSERT INTO class_students (class_id, student_id) VALUES ($1, $2) RETURNING *;',
    values: [class_id, student_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const cancelRegistration = async (class_id, student_id) => {
  const queryDef = {
    text: 'DELETE FROM class_students WHERE class_id = $1 AND student_id = $2 RETURNING *;',
    values: [class_id, student_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

module.exports = {
  getAllClassesPerStudent,
  getAllStudentsPerClass,
  registerStudent,
  cancelRegistration
};
