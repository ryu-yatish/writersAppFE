const API_BASE_URL = "http://localhost:8080/Chapter";

export const fetchChapterById = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to fetch chapter");
      }
    } catch (error) {
      console.error("Error fetching chapter:", error);
      throw error;
    }
};
  

export const deleteChapterById = async (id) => {
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
  

export const saveChaptercontent = async (id, content) => {
try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "accept": "*/*",
    },
    body: JSON.stringify(content ),
    });
    if (response.ok) {
    return await response.json();
    } else {
    throw new Error("Failed to save chapter content");
    }
} catch (error) {
    console.error("Error saving chapter content:", error);
    throw error;
}
};

