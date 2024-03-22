require("dotenv").config();
const nodemailer = require('nodemailer'); 
const connectDB = require('./db/connect');
const UserRouter = require('./routes/Users')

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true , limit: '50mb'}))
// app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.get('/test', (req, res) => {
    res.send('API is Up and active');
});
app.use('/api', UserRouter)

const start = async () => {
    try {
      // connectDB
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
      console.log(error);
    }
  };
  
  start();