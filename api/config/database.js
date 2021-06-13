import mongoose from 'mongoose';

//Import MongoUI
import { MONGO_UI } from './keys';

mongoose.connect(MONGO_UI, {
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//Check for errors
connection.on('error', (err) => {
  if (err) console.log(err);
});

//Check for connection
connection.once('open', () => console.log(`connecting to mongodb...`));

export default connection;
