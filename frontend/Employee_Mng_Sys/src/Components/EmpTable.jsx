import React from 'react';
import { Link } from 'react-router-dom';

function EmpTable({ employees = [], pagination, fetchEmployees,handleUpdateEmp ,handleDeleteEmp}) {
  const headers = ['Name', 'Email', 'Phone', 'Position', 'Salary', 'Actions'];
  const { currentPage, totalPages } = pagination;

  // Render a single table row
  const TableRow = ({ employee }) => (
    <tr className="align-middle">
      <td>
        <Link to={`/employee/${employee._id}`} className="text-decoration-none text-primary">
          {employee.name}
        </Link>
      </td>
      <td>{employee.email}</td>
      <td>{employee.phone}</td>
      <td>{employee.position}</td>
      <td>{employee.salary}</td>
      <td>
        <button
          className="btn btn-sm btn-warning me-2"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Edit"
          onClick={() => {
            handleUpdateEmp(employee);
          }}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
  className="btn btn-sm btn-danger"
  data-bs-toggle="tooltip"
  data-bs-placement="top"
  title="Delete"
  onClick={() => handleDeleteEmp(employee)} // Pass entire employee object
>
  <i className="bi bi-trash-fill"></i>
</button>

      </td>
    </tr>
  );

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchEmployees('', currentPage + 1, 5);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchEmployees('', currentPage - 1, 5);
    }
  };

  const handlePagination = (page) => {
    fetchEmployees('', page, 5);
  };

  return (
    <>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="text-center">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp) => <TableRow key={emp._id} employee={emp} />)
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center text-muted">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="badge bg-info text-dark py-2 px-3">
          Page {currentPage} of {totalPages}
        </div>

        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary me-3"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i> Previous
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`btn btn-outline-primary me-2 ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePagination(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="btn btn-outline-secondary ms-3"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default EmpTable;
