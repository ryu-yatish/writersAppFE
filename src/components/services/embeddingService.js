import axiosInstance from './axios';

export const analyzeBook = async (bookId) => {
  try {
    const response = await axiosInstance.post(`/Embeddings/analyzeBook/${bookId}`, '', {
      headers: {
        'Accept': '*/*',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error analyzing book:", error);
    throw error;
  }
};
