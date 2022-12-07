const db = require('../index');

const getClassTypes = async () => {
  const data = await db.query('SELECT * FROM class_types;');
  return data.rows;
};

const getClassTypeById = async (class_type_id) => {
  const queryDef = {
    text: 'SELECT * FROM class_types WHERE class_type_id = $1;',
    values: [class_type_id]
  };

  const data = await db.query(queryDef);
  return data.rows;
};

const createClassType = async ({ name, description }) => {
  const queryDef = {
    text: 'INSERT INTO class_types (name, description) VALUES ($1, $2) RETURNING *;',
    values: [name, description]
  };

  const data = await db.query(queryDef);
  return data.rows[0];
};

module.exports = {
  getClassTypes,
  getClassTypeById,
  createClassType
};
