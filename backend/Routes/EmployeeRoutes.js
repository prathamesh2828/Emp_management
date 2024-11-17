const { createEmployee,getAllEmployees, getEmployeeById, deleteEmpById,updateEmployeeById } = require('../Controllers/EmployeeControllers');

const routes = require('express').Router();

routes.get('/', getAllEmployees) //gets all the employee

routes.post('/',createEmployee)

routes.put('/:id',updateEmployeeById) // creates new emp
 // creates new emp
routes.get('/:id',getEmployeeById)  // gets emp by id

routes.delete('/:id',deleteEmpById) // deletes the emp by id

module.exports = routes;