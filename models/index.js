const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL, {
  logging: false
  });

const Place = conn.define('place',{
  address: Sequelize.STRING,
  city: Sequelize.STRING,
  state: Sequelize.STRING,
  phone: Sequelize.STRING,
  location: Sequelize.ARRAY(Sequelize.FLOAT)
});

const Hotel = conn.define('hotel', {
  name: Sequelize.STRING,
  num_stars: Sequelize.FLOAT,
  amenities: Sequelize.STRING
});

const Activity = conn.define('activity', {
  name: Sequelize.STRING,
  age_range: Sequelize.STRING
});

const Restaurant = conn.define('restaurant', {
  name: Sequelize.STRING,
  cuisine: Sequelize.STRING,
  price: Sequelize.INTEGER
});

Hotel.belongsTo(Place);
Activity.belongsTo(Place);
Restaurant.belongsTo(Place);

const sync = ()=> {
  return conn.sync({ force: true });
};

const seed = () => {
  return Place.create({
    state: 'New York',
    location: [12321]
  });
}
module.exports = {
  sync,
  seed,
  models: {
    Place
  }
};
