import axiosInstance from '../axios';

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
// Fetch All Schemas
export const fetchSchemas = async (bookId) => {
  try {
    const response = await axiosInstance.get(`/DDS/db-schemas/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schemas:", error);
    throw error;
  }
};

export const fetchSchemasbyId = async (schemaId) => {
  try {
    const response = await axiosInstance.get(`/DDS/db-schemas/${schemaId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching schemas:", error);
    throw error;
  }
};


// Update Schema
export const updateSchema = async (bookId, schemaId, updatedSchema) => {
  try {
    const response = await axiosInstance.put(`/DDS/${bookId}/db-schemas/${schemaId}`, updatedSchema, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating schema:", error);
    throw error;
  }
};

// Delete Schema
export const deleteSchema = async (bookId, schemaId) => {
  try {
    const response = await axiosInstance.delete(`/DDS/${bookId}/db-schemas/${schemaId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting schema:", error);
    throw error;
  }
};

// Add Object to Schema
export const addObjectToSchema = async (newObject) => {
  try {
    const response = await axiosInstance.post(`/DDS/object`, newObject, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding object to schema:", error);
    throw error;
  }
};

// Fetch All Objects in Schema
export const fetchObjectsInSchema = async (schemaId) => {
  try {
    const response = await axiosInstance.get(`/DDS/object/schema/${schemaId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching objects in schema:", error);
    throw error;
  }
};

// Update Object in Schema
export const updateObjectInSchema = async (objectId, updatedObject) => {
  try {
    const response = await axiosInstance.put(`/DDS/object/${objectId}`, updatedObject, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating object in schema:", error);
    throw error;
  }
};

// Delete Object in Schema
export const deleteObjectInSchema = async (objectId) => {
  try {
    const response = await axiosInstance.delete(`/DDS/object/${objectId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting object in schema:", error);
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