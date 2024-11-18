import React, { useEffect, useState } from 'react';
import { CreateEmployee, UpdateEmpById } from '../api'; // Import updated function
import { notify } from '../utils';

function AddEmp({ showModal, setShowModal, updateEmpObj }) {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    salary: '',
  });

  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    if (updateEmpObj) {
      setUpdateMode(true);
      setEmployee(updateEmpObj);
    } else {
      setUpdateMode(false);
      resetEmpStates();
    }
  }, [updateEmpObj]);

  const handleClose = () => {
    setShowModal(false);
    setUpdateMode(false);
  };

  const resetEmpStates = () => {
    setEmployee({ name: '', email: '', phone: '', position: '', salary: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { success, message } = updateMode
        ? await UpdateEmpById(employee) // Call update API
        : await CreateEmployee(employee); // Call create API

      if (success) {
        notify(message, 'success');
      } else {
        notify(message, 'error');
      }
    } catch (err) {
      notify('Failed to process request, try again later', 'error');
    }
    setShowModal(false);
    resetEmpStates();
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
            <h5>{updateMode ? 'Update Employee' : 'Add New Employee Details'}</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
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
                {updateMode ? 'Update' : 'Add'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmp;
