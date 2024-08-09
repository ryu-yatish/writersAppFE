const API_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL: "https://localhost:8080";

export const addSchemas = async (bookId,newSchema) => {
    try {
        const response = await fetch(`${API_BASE_URL}/DDS/db-schemas/${bookId}`, {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSchema),
          });
        if (response.ok) {
        return await response.json();
        } else {
        throw new Error("Failed to get schemas ");
        }
    } catch (error) {
        console.error("Error saving schemas:", error);
        throw error;
    }
};

export const askGpt = async (bookId,message) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Embeddings/askGpt/${bookId}`, {
            method: 'POST',
            headers: {
              'Accept': '*/*',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
          });
        debugger
        if (response.ok) {
        return await response.body();
        } else {
        throw new Error("Failed to get response ");
        }
    } catch (error) {
        throw error;
    }
};

