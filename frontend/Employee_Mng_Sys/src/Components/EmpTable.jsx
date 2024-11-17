import React from 'react'
import { Link } from 'react-router-dom';
function EmpTable() {
  const headers= ['Name', 'Email', 'Phone', 'Position','Salary','Actions']

  const TableRow = (employee)=> {
    return <tr>
      <td>
        <Link to ={'/employee/id'} className= 'text-decoration-none'>
        {"prathamesh"}
        </Link>
      </td>
      <td>{"prathamesh@gmail.com"}</td>
      <td>{"9890500792"}</td>
      <td>{"Hr Manger"}</td>
      <td>{"100000"}</td>
      <td>

         <i 
             className='bi bi-pencil-fill text-warning md-4'
            role= 'button'
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={()=>{ }}>
         </i> 


         <i 
             className='bi bi-trash-fill text-danger md-4'
            role= 'button'
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            onClick={()=>{ }}>
         </i>       
      </td>


    </tr>
  }
  return (

    <>
       <table className='table table-strped'>
        <thead>
          <tr>
              {
                headers.map((header, i) => (
                  <th key={i}>{header}</th>
                ))
              }
          </tr>
        </thead>

        <tbody>
        <TableRow />
        </tbody>


       </table>
    </>
   
  )
}

export default EmpTable