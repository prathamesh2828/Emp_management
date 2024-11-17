import React, { useState } from 'react';
import { CreateEmployee } from '../api';
import { notify } from '../utils';

function AddEmp({ showModal, setShowModal }) {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
  });

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };
   const resetEmpStates= ()=>{
    setEmployee({name: '', email: '', phone: '', position: '', salary: ''})
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(employee); 
    try {
      const {success, message}= await CreateEmployee(employee);
      console.log(success, message);
      if (success){
        notify(message,'success')
      }else{
        notify(message,'error')
      }
    } catch (err) {
      notify('failed to create empoyee, try again later','error')
    }
    setShowModal(false);
    resetEmpStates(); // Close the modal after submission
  };

  return (
    <div
      className={`modal ${showModal ? 'd-block' : ''}`}
      tabIndex={-1}
      role="dialog"
      style={{ display: showModal ? 'block' : 'none' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5>Add New Employee Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={employee.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={employee.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone No</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={employee.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  className="form-control"
                  name="position"
                  value={employee.position}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input
                  type="text"
                  className="form-control"
                  name="salary"
                  value={employee.salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmp;
