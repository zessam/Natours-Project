const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: '../../config.env' });
const fs = require('fs');
const Tour = require('../../models/tourModel');

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

// Read Json file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data to database
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data is Successfully loaded!');
    
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data is Successfully deleted!');
    
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
