import axiosInstance from '../../lib/axiosConfig';
 
export const getCars = async () => {
  try {
    // console.log("getCars is called");
    const response = await axiosInstance.get('/api/get-all-cars-for-client'); //rmoved : http://localhost/car-rental-api/public
    // console.log('response fetching :', response);
    return response.all_cars;
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures:', error);
    throw error;
  }
};

