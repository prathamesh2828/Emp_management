import React, { useEffect } from 'react'
import EmpTable from './EmpTable'



function EmpMngApp() {
  const [employeeData, setEmployeeData]=useState({
    "employees":[],
    "pagination": {
      "totalEmployess": 5,
      "currentPage": 1,
      "totalPages": 1,
      "pageSize": 10
    }
  });
  const fetchEmployees = async (search='',page=1,limit=5)=>{
      try{
          const data = await GetAllEmployees(search,page,limit);
      }catch(err){
        console.log('Error',err);
      }
  }

useEffect(()=>{
  fetchEmployees();
},[])


  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
      <h1>Employee Management System</h1>
     <div className='w-100 d-flex justify-content-center'>
       <div className='w-80 border bg-light p3' style={{width:'80%'}}>
        <div className='d-flex justify-content-center mb-3'>
          <button className='btn btn-primary'>Add New Emp 
          </button>

          {/* <input
              type="text" 
              placeholder='Search '
              className='form-control w-50'/> */}
        </div>

        <EmpTable/>


      </div>
     </div>

    </div>
    </>
  )
}


export default EmpMngApp