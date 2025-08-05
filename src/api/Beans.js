import api from './api';

export const getBeansData = async () => {
  try {
    const response = await api.get('/getBeans');
    return response.data;
  } catch (error) {
    console.log('Error occured while getting coffee data', error);
  }
};
