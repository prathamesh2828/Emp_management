const BASE_URL ='http://localhost:8080'

export const GetAllEmployees =async (search ='', page =1, limit =5)=>{
  const url= `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`
  try {
    const options ={
      method: "GET",
      'Content-Type' : "application/json"
    }
    const result =  await fetch(url,options);
    const data= await  result.json();

    return data;
  } catch (err) {

    return err;
  }
}

export const CreateEmployee = async (empObj) => {
  const url = `${BASE_URL}/api/employees`;

  try {
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON
      },
      body: JSON.stringify(empObj), // Convert empObj to JSON string
    };

    const result = await fetch(url, options);
    const data = await result.json(); // Parse the response as JSON

    return data;
  } catch (err) {
    console.error("Error creating employee:", err);
    return err;
  }
};