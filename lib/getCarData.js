import axiosInstance from "./axiosConfig";

// lib/getCarData.js
export async function getCarData(id) {
    try {
      const response = await axiosInstance.get(`/api/show-car-for-client/${id}`, { cache: 'no-store' }); //removed : http://localhost/car-rental-api/public
      // console.info("errro ",response)
      return response.data;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }
  