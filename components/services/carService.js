import axiosInstance from '../../lib/axiosConfig';
import axios from 'axios';
export const getCars = async () => {
  try {
  
    const response = await axios.get('http://localhost:8000/api/get-all-cars-for-client');
    console.log('response fetching :', response);
    return response.all_cars;
} catch (error) {
      console.error('Error fetching cars:', error);

    throw error;
  }
};

