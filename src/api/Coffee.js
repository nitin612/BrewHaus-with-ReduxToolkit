import api from './api';

export const getCoffeeData = async () => {
  try {
    const response = await api.get('/getCoffee');
    return response.data;
  } catch (error) {
    console.log('Error occured while getting coffee data', error);
  }
};





