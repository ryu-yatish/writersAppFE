import axiosInstance from './axios';

export const addSchemas = async (bookId, newSchema) => {
  try {
    const response = await axiosInstance.post(`/DDS/db-schemas/${bookId}`, newSchema, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error saving schemas:", error);
    throw error;
  }
};

export const askGpt = async (bookId, message) => {
  try {
    const response = await axiosInstance.post(`/Embeddings/askGpt/${bookId}`, message, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting response:", error);
    throw error;
  }
};