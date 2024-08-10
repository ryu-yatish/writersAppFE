import axiosInstance from './axios';

export const fetchChapterById = async (id) => {
  try {
    const response = await axiosInstance.get(`/Chapter/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chapter:", error);
    throw error;
  }
};

export const deleteChapterById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Chapter/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting chapter:", error);
    throw error;
  }
};

export const saveChapterContent = async (id, content) => {
  try {
    const response = await axiosInstance.put(`/Chapter/${id}`, content);
    return response.data;
  } catch (error) {
    console.error("Error saving chapter content:", error);
    throw error;
  }
};

export const addChapterApi = async (bookId, formData) => {
  try {
    const response = await axiosInstance.post(`/Chapter/add/${bookId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding chapter:", error);
    throw error;
  }
};
