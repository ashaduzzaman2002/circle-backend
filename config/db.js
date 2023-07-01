const mongoose = require('mongoose');

exports.connectDB = () => {
    mongoose
  .connect('mongodb://localhost:27017/swiggy_clone')
  .then(() => console.log('DB connected successfully'))
  .catch((err) => console.log(err));
}
