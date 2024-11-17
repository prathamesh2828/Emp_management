import React from 'react';
import { Link } from 'react-router-dom';

function EmpTable({ employees = [], pagination, fetchEmployees }) {
  const headers = ['Name', 'Email', 'Phone', 'Position', 'Salary', 'Actions'];
  const { currentPage, totalPages } = pagination;

  // Render a single table row
  const TableRow = ({ employee }) => (
    <tr>
      <td>
        <Link to={`/employee/${employee._id}`} className="text-decoration-none">
          {employee.name}
        </Link>
      </td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.position}</td>
      <td>{employee.salary}</td>
      <td>
        <i
          className="bi bi-pencil-fill text-warning me-4"
          role="button"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Edit"
          onClick={() => {
            console.log(`Edit Employee: ${employee._id}`);
          }}
        ></i>

        <i
          className="bi bi-trash-fill text-danger"
          role="button"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Delete"
          onClick={() => {
            console.log(`Delete Employee: ${employee._id}`);
          }}
        ></i>
      </td>
    </tr>
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchEmployees('', currentPage + 1, 5);
    }
  };

  const handlePreviousPage =()=>{
    if(currentPage > 1){
        handlePagination(currentPage - 1);
    }
  }

  const handlePagination = (page) => {
    fetchEmployees('', page, 5);
  };

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((emp) => <TableRow key={emp._id} employee={emp} />)
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center">
                No employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center my-3">
        <span className="badge bg-primary">
          Page {currentPage} of {totalPages}
        </span>

        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-outline-primary me-1 ${
                currentPage === page ? 'active' : ''
              }`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-outline-primary ms-2"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default EmpTable;
