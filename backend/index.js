const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
require('./Models/db'); // Connect to the database

const EmployeeRouter = require('./Routes/EmployeeRoutes');

// Enable CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add all relevant origins
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));


app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Employee server is running');
});

app.use('/api/employees', EmployeeRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
