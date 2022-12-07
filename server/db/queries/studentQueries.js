const db = require('../index');

const generateUniqueCode = () => {
  return Math.random().toString(36).slice(2, 8);
};

const getStudents = async () => {
  const data = await db.query('SELECT first_name, last_name, email, credits FROM students;');
  return data.rows;
};

const getStudentByEmail = async (email) => {
  const queryDef = {
    text: 'SELECT student_id, first_name, last_name, email, credits FROM students WHERE email = $1;',
    values: [email]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const getStudentById = async (id) => {
  const queryDef = {
    text: 'SELECT student_id, first_name, last_name, email, credits FROM students WHERE student_id = $1;',
    values: [id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const getStudentCodeById = async (id) => {
  const queryDef = {
    text: 'SELECT unique_code FROM students WHERE student_id = $1;',
    values: [id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const updateStudent = async (student_id, studentInfo) => {

  const setColumns = Object.keys(studentInfo).map((property, index) => `${property}=$${index + 2}`).join(', ');

  const queryDef = {
    text: `UPDATE students SET ${setColumns} WHERE student_id = $1 RETURNING *;`,
    values: [student_id, ...Object.values(studentInfo)]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const addStudent = async (first_name, last_name, email) => {
  const unique_code = generateUniqueCode()
  const queryDef = {
    text: `INSERT INTO students (first_name, last_name, email, unique_code, credits) VALUES ($1, $2, $3, $4, $5) RETURNING student_id;`,
    values: [first_name, last_name, email, unique_code, 0]
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};

module.exports = {
  getStudents,
  getStudentByEmail,
  getStudentById,
  getStudentCodeById,
  updateStudent,
  addStudent
};
