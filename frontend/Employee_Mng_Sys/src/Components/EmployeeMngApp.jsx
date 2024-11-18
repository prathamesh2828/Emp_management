import React, { useEffect, useState } from 'react';
import EmpTable from './EmpTable';
import { GetAllEmployees } from '../api';
import AddEmp from './AddEmp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../utils'; // Make sure to import toast styles
import { DeleteEmpById } from '../api'; // Adjust the path as needed


function EmployeeMngApp() {
  const [showModal, setShowModal] = useState(false);
  const [updateEmpObj,setUpdateEmpObj] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    employees: [],
    pagination: {
      totalEmployees: 0,
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    },
  });

  const fetchEmployees = async (search = '', page = 1, limit = 5) => {
    try {
      const { data } = await GetAllEmployees(search, page, limit);
      setEmployeeData(data);
    } catch (err) {
      console.log('Error', err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmp = () => {
    setShowModal(true);
  };

  const handleUpdateEmp = (empObj)=>{
    console.log("update obj",empObj);
    setUpdateEmpObj(empObj);
    setShowModal(true)
  }

  const handleDeleteEmp = async (emp) => {
    try {
      console.log('Deleting Employee with ID:', emp._id); // Debug log
      const { success, message } = await DeleteEmpById(emp._id); // Pass emp._id
      if (success) {
        notify(message, 'success'); // Notify success
        fetchEmployees(); // Refresh the list
      } else {
        notify(message, 'error'); // Notify error from backend
      }
    } catch (err) {
      console.error('Error:', err); // Log error
      notify('Failed to delete employee', 'error');
    }
  };
  
  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center p-4">
        <h1 className="mb-4 text-center text-primary">Employee Management System</h1>
        <div className="w-100">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <button
              className="btn btn-lg btn-success"
              onClick={handleAddEmp}
            >
              <i className="bi bi-person-plus"></i> Add New Employee
            </button>

            {/* Search input (optional) */}
            {/* <input
              type="text"
              placeholder="Search"
              className="form-control w-50"
            /> */}
          </div>

          <div className="table-container" style={{ overflowX: 'auto' }}>
            <EmpTable
              fetchEmployees={fetchEmployees}
              employees={employeeData.employees}
              pagination={employeeData.pagination}
              handleUpdateEmp={handleUpdateEmp}
              handleDeleteEmp={handleDeleteEmp}
              
            />
          </div>

          <AddEmp
            
            updateEmpObj={updateEmpObj}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={4000}
        hideProgressBar={false}
      />
    </>
  );
}

export default EmployeeMngApp;
