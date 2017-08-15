const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
  });

const Foo = conn.define('foo', {
  name: Sequelize.STRING
});

const sync = ()=> {
  return conn.sync({ force: true });
};

const seed = () => {
  return Foo.create({
    name: 'Jon'
  });
}
module.exports = {
  sync,
  seed,
  models: {
    Foo
  }
};
