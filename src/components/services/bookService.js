// bookService.js
const API_BASE_URL = "http://localhost:8080/Book";

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/getById/${id}`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch book");
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    throw error;
  }
};

export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/all`, {
      method: "GET",
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch books");
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const deleteBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
        console.error("Error deleting book:");
    }
    return response
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
};

export const updateBook = async (id, updatedBookData) => {
  try {
    await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
      body: JSON.stringify(updatedBookData),
    });
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};
