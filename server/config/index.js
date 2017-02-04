const env = process.env.NODE_ENV || 'dev';
const config = require(`./${ env }.js`);
const Sequelize = require('sequelize');

const Todolist = new Sequelize(config.mysql, {
  define: {
    // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    timestamps: false,
  },
});

module.exports = {
  Todolist,
};
