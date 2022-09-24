const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const jobRoutes = require('./routes/jobs-api');
const connectDB = require('./db/connect');
const authUser = require('./middleware/auth-API');

require('dotenv').config();

// middleware
app.use(express.json());

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', authUser, jobRoutes);

// not found route
app.get('*', (req, res) => {
  res.status(404).send('route does not exists');
});

// server code
const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('connected to the db....');
    app.listen(5000, () => {
      console.log(`server is running on port ${port}..`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
