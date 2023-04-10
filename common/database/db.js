const mongoose = require('mongoose');


const url = 'mongodb+srv://faroukfdr:151236@ecom-cluster.umqrp3q.mongodb.net/?authSource=ecom-cluster&authMechanism=SCRAM-SHA-1';


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err.message));






