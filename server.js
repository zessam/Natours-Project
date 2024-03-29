const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  //.connect(process.env.DATABASE_LOCAL), {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(conn => {
    //console.log(conn.connections);
    console.log('DB connection successful!');
  });

// const testTour = new tourModel({
//   name: 'The Forest Hiker',
//   rating: 4.7,
//   price: 50
// });
// testTour.save().then(doc => {
//   console.log(doc)
// }).catch(err => {
//   if (err.code === 11000) {
//     console.log('Duplicate key error. A tour with the same name already exists.');
//   } else {
//     console.log('Error:', err);
//   }
// });

//console.log(app.get('env'));
//console.log(process.env)

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
