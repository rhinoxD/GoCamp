const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '615ecd088ff92d3c5f7c3a8b',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis natus, facere id vero dolores in aspernatur libero quidem fugit. Ullam nesciunt tenetur obcaecati explicabo quidem repellat iure incidunt eius animi.
      Dignissimos, quia praesentium recusandae quasi autem temporibus hic quisquam, reprehenderit, magni dolor nam. Similique repudiandae molestias iste recusandae minima nulla ad, quaerat perferendis enim quod obcaecati consectetur quos harum laudantium.`,
      price,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: 'https://res.cloudinary.com/dhzwvpowz/image/upload/v1633697722/YelpCamp/cla3lle89plvpodhzlzj.jpg',
          filename: 'YelpCamp/cla3lle89plvpodhzlzj',
        },
        {
          url: 'https://res.cloudinary.com/dhzwvpowz/image/upload/v1633697723/YelpCamp/mqzvmwmjq4qcxhkc45sf.jpg',
          filename: 'YelpCamp/mqzvmwmjq4qcxhkc45sf',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
