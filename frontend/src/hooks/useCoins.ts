import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const fetchCoins = async (sortBy = 'price', order = 'asc') => {
  const response = await axios.get(`${API_URL}/coins`, {
    params: { sortBy, order },
  });
  return response.data;
};

export const createCoin = async (coin: any) => {
  const response = await axios.post(`${API_URL}/coins`, coin);
  return response.data;
};

export const updateCoin = async (id: number, coin: any) => {
  const response = await axios.put(`${API_URL}/coins/${id}`, coin);
  return response.data;
};

export const deleteCoin = async (id: number) => {
  const response = await axios.delete(`${API_URL}/coins/${id}`);
  return response.data;
};

