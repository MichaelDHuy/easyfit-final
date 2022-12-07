const db = require('../index');

const getClasses = async () => {
  const data = await db.query('SELECT * FROM classes;');
  return data.rows;
};

const getClassesById = async (class_id) => {
  const queryDef = {
    text: 'SELECT *, start_datetime - NOW() AS difference FROM classes WHERE class_id = $1;',
    values: [class_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const getClassesByClassType = async (class_type_id) => {
  const queryDef = {
    text: 'SELECT * FROM classes WHERE class_type_id = $1;',
    values: [class_type_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const createClass = async ({ class_type_id, start_datetime, end_datetime, credit_cost, max_students }) => {
  const queryDef = {
    text: `INSERT INTO classes (class_type_id, start_datetime, end_datetime, credit_cost, max_students) VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    values: [class_type_id, start_datetime, end_datetime, credit_cost, max_students]
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};

const deleteClass = async (class_id) => {
  const queryDef = {
    text: 'DELETE FROM classes WHERE class_id = $1 RETURNING *;',
    values: [class_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

module.exports = {
  getClasses,
  getClassesById,
  getClassesByClassType,
  createClass,
  deleteClass
};
