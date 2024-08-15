import axiosInstance from '../../lib/axiosConfig';

export const getCars = async () => {
  try {
    console.log('Appel à getCars');
    const response = await axiosInstance.get('http://localhost:8000/api/get-all-cars-for-client');
    return response.all_cars;
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures:', error);
    throw error;
  }
};

