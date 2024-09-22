import React, { useState } from 'react';
import { addObjectToSchema } from '../services/miscService'; // Adjust the import path

const AddObjectPopup = ({ schema, onClose, onAdd }) => {
  // Initialize form data with empty values for each property
  const initialFormData = Object.keys(schema.propertiesMap).reduce((acc, key) => {
    acc[key] = ''; // Set each property to an empty string initially
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const schemaId = schema.id;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const newObject = {
      schemaId,
      data: formData,
    };

    try {
      const response = await addObjectToSchema(newObject);
      onAdd(response); // Pass the new object back to the parent
      onClose(); // Close the popup
    } catch (error) {
      setError('Failed to add object. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Add New Object</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {Object.entries(schema.propertiesMap).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label>{value.description || key}:</label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required={value.required}
              />
            </div>
          ))}
          <div className="button-group">
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add Object'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddObjectPopup;
