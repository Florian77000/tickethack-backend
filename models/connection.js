const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://marionrdx:X2JzBkzzAPzQ1q1Y@clustermarionradix.o5wu8g3.mongodb.net/tickethack';

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))

  .catch(error => console.error(error));