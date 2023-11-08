import mongoose from 'mongoose';

export default function connectDB() {
  const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1/online-course';

  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once('open', (_) => {
    console.log('Database connected');
  });

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
