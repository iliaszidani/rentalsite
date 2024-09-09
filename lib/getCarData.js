// lib/getCarData.js
export async function getCarData(id) {
    try {
      const response = await fetch(`http://localhost:8000/api/show-car-for-client/${id}`, { cache: 'no-store' });
      const data = await response.json();
      return data.car;
    } catch (error) {
      console.error('Error fetching cars:', error);
      throw error;
    }
  }
  