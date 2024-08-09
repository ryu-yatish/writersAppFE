import axiosInstance from '../axios';

// Fetch a book by ID
export const fetchBookById = async (id) => {
  try {
    const response = await axiosInstance.get(`/Book/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

// Fetch all books
export const fetchBooks = async () => {
  try {
    const response = await axiosInstance.get('/Book/all');
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Delete a book by ID
export const deleteBookById = async (id) => {
  try {
    const response = await axiosInstance.delete(`/Book/${id}`);
    return response;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

// Update a book by ID
export const updateBook = async (id, updatedBookData) => {
  try {
    const response = await axiosInstance.put(`/Book/${id}`, updatedBookData, {
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

// Add a new book
export const addBookApi = async (formData) => {
  try {
    const response = await axiosInstance.post('/Book/add', formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};
