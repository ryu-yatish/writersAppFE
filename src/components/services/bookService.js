const API_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL: "http://localhost:8080";
const API_BASE_URL_BODY = API_BASE_URL+"/Book"

export const fetchBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL_BODY}/getById/${id}`, {
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
    const response = await fetch(`${API_BASE_URL_BODY}/all`, {
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
    const response = await fetch(`${API_BASE_URL_BODY}/${id}`, {
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
    await fetch(`${API_BASE_URL_BODY}/${id}`, {
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

export const addBookApi = async (formData) => {
  try {
    await fetch(`${API_BASE_URL_BODY}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });  
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
};

