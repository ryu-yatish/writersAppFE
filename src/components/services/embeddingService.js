const API_BASE_URL = process.env.REACT_APP_BASE_URL ? process.env.REACT_APP_BASE_URL: "http://localhost:8080";

export const analyzeBook = async (bookId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/Embeddings/analyzeBook/${bookId}`, {
            method: 'POST',
            headers: {
              'Accept': '*/*',
            },
            body: '',
        });
        if (response.ok) {
        return await response.json();
        } else {
        throw new Error("Failed to analyze book ");
        }
    } catch (error) {
        console.error("Error saving book:", error);
        throw error;
    }
};