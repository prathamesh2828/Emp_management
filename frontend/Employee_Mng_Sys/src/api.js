const BASE_URL = 'http://localhost:8080';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
  const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
  try {
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const result = await fetch(url, options);
    const data = await result.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const CreateEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employees`;

  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empObj),
    };

    const result = await fetch(url, options);
    const data = await result.json();

    return data;
  } catch (err) {
    console.error('Error creating employee:', err);
    return err;
  }
};

export const UpdateEmpById = async (empObj) => {
  const url = `${BASE_URL}/api/employees/${empObj._id}`; 

  try {
    const options = {
      method: 'PUT', // Use PUT for update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empObj),
    };

    const result = await fetch(url, options);
    const data = await result.json();

    return data;
  } catch (err) {
    console.error('Error updating employee:', err);
    return err;
  }
};


export const DeleteEmpById = async (empId) => {
  const url = `${BASE_URL}/api/employees/${empId}`; // Use empId directly

  try {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result = await fetch(url, options);
    const data = await result.json();
    return data; // API should return a success flag and message
  } catch (err) {
    console.error('Error deleting employee:', err);
    return { success: false, message: 'Error deleting employee' };
  }
};

