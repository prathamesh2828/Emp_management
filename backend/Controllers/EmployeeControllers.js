const EmployeeModel = require('../Models/EmployeeModel');
const createEmployee = async (req, res) => {
  try {
    const { name, email, phone, position, salary } = req.body;
    // Validate required fields
    if (!name || !email || !phone || !position || !salary) {
      return res.status(400).json({
        message: 'All fields are required.',
        success: false,
      });
    }
    // Create new employee
    const emp = new EmployeeModel({ name, email, phone, position, salary });
    await emp.save();
    res.status(201).json({
      message: 'Employee created successfully',
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};

const getAllEmployees= async (req,res)=>{
  try{
    let {page, limit, search} = req.query;
    page= parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const skip = (page-1)*limit;

    let searchCriteria = {};
    if(search){
      searchCriteria = {
        name:{
          $regex: search,
          $options: 'i'  // for taking case insensetive
        }
      }
    } 

    const totalEmployess = await EmployeeModel.countDocuments(searchCriteria);
    const emps = await EmployeeModel.find(searchCriteria)
        .skip(skip)
        .limit(limit)
        .sort({updatedAt: -1});


const totalPages= Math.ceil(totalEmployess / limit);
    res.status(200)
    .json({
      message:"All Employees",
      success: true,
      data:{
        employees: emps,
        pagination:{
          totalEmployess,
          currentPage: page,
          totalPages,
          pageSize:limit
        }  // pagination logic 
       
      }
    })
  } catch(err){
    console.log(err);
    res.status(500).json({
      message:'internal server error',
      success:false,
      error:err
    })
  }
}

const getEmployeeById= async (req,res)=>{
  try{
    const {id} = req.params;
    const emps = await EmployeeModel.findOne({_id:id});
    res.status(200)
    .json({
      message:"Get Employees Details",
      success: true,
      data:emps
    })
  } catch(err){
    res.status(500).json({
      message:'internal server error',
      success:false,
      error:err
    })
  }
}

const deleteEmpById = async (req,res)=>{
  try{
    const {id} = req.params;
    const emps = await EmployeeModel.findByIdAndDelete({_id:id});
    res.status(200)
    .json({
      message:"Employee Deleted",
      success: true,
      data:emps
    })
  } catch(err){
    res.status(500).json({
      message:'internal server error',
      success:false,
      error:err
    })
  }
}

const updateEmployeeById = async (req, res) => {
  try {
    const { id } = req.params; // Extract id from request parameters
    const { name, email, phone, position, salary } = req.body; // Extract fields from request body

    // Validate required fields
    if (!name || !email || !phone || !position || !salary) {
      return res.status(400).json({
        message: 'All fields are required.',
        success: false,
      });
    }

    // Update the employee in the database
    const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
      id,
      { name, email, phone, position, salary, updateAt:new Date() },
      { new: true, runValidators: true } // Return the updated document and run schema validations
    );

    // If no employee is found by Id
    if (!updatedEmployee) {
      return res.status(404).json({
        message: 'Employee not found.',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Employee updated successfully',
      success: true,
      data: updatedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      error: error.message,
    });
  }
};




module.exports = {
  createEmployee,getAllEmployees,getEmployeeById,deleteEmpById,updateEmployeeById
};
