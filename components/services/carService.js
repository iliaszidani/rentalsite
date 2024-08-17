import axiosInstance from '../../lib/axiosConfig';
 
export const getCars = async () => {
  try {
    console.log("getCars is called");
    const response = await axiosInstance.get('http://localhost:8000/api/get-all-cars-for-client');
    console.log('response fetching :', response);
    return response.all_cars;
} catch (error) {
      console.error('Error fetching cars:', error);

    throw error;
  }
};

