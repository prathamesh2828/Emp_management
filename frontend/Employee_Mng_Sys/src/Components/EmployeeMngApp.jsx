
import React, { useEffect ,useState} from 'react'
import EmpTable from './EmpTable'
import { GetAllEmployees } from '../api';
import AddEmp from './AddEmp';
import { ToastContainer } from 'react-toastify';

function EmployeeMngApp() {

  const [showModal, setShowModal] = useState(false);

  const [employeeData, setEmployeeData]=useState({
    "employees":[],
    "pagination": {
      "totalEmployess": 0,
      "currentPage": 1,
      "totalPages": 1,
      "pageSize": 5
    }
  });
  const fetchEmployees = async (search='',page=1,limit=5)=>{
      try{
          const { data} = await GetAllEmployees(search,page,limit);
          
          // console.log(data);
          setEmployeeData(data);
          
      }catch(err){
        console.log('Error',err);
      }
  }

  
useEffect(()=>{
  fetchEmployees();
},[])

const handleAddEmp = ()=>{
  setShowModal(true)
}
  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center w-100 p-3'>
      <h1>Employee Management System</h1>
     <div className='w-100 d-flex justify-content-center'>
       <div className='w-80 border bg-light p3' style={{width:'80%'}}>
        <div className='d-flex justify-content-center mb-3'>
          <button className='btn btn-primary' 
          onClick={()=> handleAddEmp()}
          >Add New Emp 
          </button>

          {/* <input
              type="text" 
              placeholder='Search '
              className='form-control w-50'/> */}
        </div>

        <EmpTable
        fetchEmployees={fetchEmployees}
        employees= {employeeData.employees}
        pagination= {employeeData.pagination}
        />

        <AddEmp
        showModal={showModal}
        setShowModal={setShowModal}
        />
      </div>
     </div>

      <ToastContainer
          position='top-left'
          autoClose={4000}
          hideProgressBar={false}/>

    </div>
    </>
  )
}


export default EmployeeMngApp