// lib/getCarData.js
export async function getCarData(id) {
    try {
      const response = await fetch(`http://localhost/car-rental-api/public/api/show-car-for-client/${id}`, { cache: 'no-store' });
      const data = await response.json();
      return data.car;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }
  