const express = require('express');
const app = express();
const bodyParser= require('body-parser');

require('dotenv').config();
const PORT = process.env.PORT || 8080;
require('./Models/db'); //goes to db.js and connect the database.

const EmployeeRouter = require('./Routes/EmployeeRoutes')

app.use(bodyParser.json());

app.get('/',(req,res)=>{
  res.send(`Employee mhm server is running`);
})

app.use('/api/employees',EmployeeRouter)
app.listen(PORT, () => {
 console.log(`server is running on the port ${PORT}`);
})