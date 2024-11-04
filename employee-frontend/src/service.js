import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/employees';

export const getEmployees = async () => {
    try { 
    const response = await axios.get(API_BASE_URL); 
    return response.data; 
    } catch (error) { 
        console.error('Network Error:', error); throw error; 
    }
 
};

export const getEmployeeById = async (id) => {
    try { 
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
} catch (error) { 
    console.error('Network Error:', error); throw error; 
}

};

export const addEmployee = async (employee) => {
    try { 
  const response = await axios.post(API_BASE_URL, employee);
  return response.data;
} catch (error) { 
    console.error('Network Error:', error); throw error; 
}

};

export const updateEmployee = async (id, employee) => {
    try { 
  const response = await axios.put(`${API_BASE_URL}/${id}`, employee);
  return response.data;
} catch (error) { 
    console.error('Network Error:', error); throw error; 
}
};

export const deleteEmployee = async (id) => {
    try { 
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
} catch (error) { 
    console.error('Network Error:', error); throw error; 
}
};
