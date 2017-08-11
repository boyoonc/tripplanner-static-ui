const Sequelize = require('sequelize');

const conn = new Sequelize({url:process.env.DATABASE_URL, dialect: 'postgres'});

const Foo = conn.define('foo', {});

const sync = ()=> {
  return conn.sync({ force: true });
};

module.exports = {
  sync,
  models: {
    Foo
  }
};
