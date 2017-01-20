const Sequelize = require('sequelize');

const Todolist = new Sequelize('mysql://root@localhost/todos', {
  define: {
     // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    timestamps: false,
  },
});

module.exports = {
  Todolist,
}
