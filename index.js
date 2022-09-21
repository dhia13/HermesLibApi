const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const AuthRoute = require('./Routes/AuthRoute')
const BookRoute = require('./Routes/BooksRoute')
const AuthorsRoute = require('./Routes/AuthersRoute')
const ReviewRoute = require('./Routes/ReviewRoute')

dotenv.config();

const app = express();


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/api/v1/auth', AuthRoute)
app.use('/api/v1/books', BookRoute)
app.use('/api/v1/authors', AuthorsRoute)
app.use('/api/v1/reviews', ReviewRoute)



const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 8000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`server is running on port http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));