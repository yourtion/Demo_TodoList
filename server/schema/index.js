const fs = require('fs');
const path = require('path');

const db = {};
const schema = [];

const dirPath = path.resolve(__dirname, './');
const list = fs.readdirSync(dirPath);
for (const file of list) {
  if (file !== 'index.js') {
    const name = path.parse(file).name;
    schema[name] = path.resolve(__dirname, file);
    db[name] = require('./' + file);
  }
}

module.exports = {
  db,
  schema,
};
