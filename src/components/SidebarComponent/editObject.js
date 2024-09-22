import React, { useState, useEffect } from 'react';
import { updateObjectInSchema } from '../services/miscService'; // Adjust the import path

const EditObjectPopup = ({ schema, object, onClose, onSave }) => {
  const initialFormData = Object.keys(schema.propertiesMap).reduce((acc, key) => {
    acc[key] = object.data[key] || ''; // Pre-populate with existing data
    return acc;
  }, {});

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const schemaId = schema.id;
  const objectId = object.id; // Assuming object contains the object's id

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const updatedObject = {
      schemaId,
      data: formData,
    };

    try {
      await updateObjectInSchema(objectId, updatedObject);
      onSave(); // Pass the updated object back to the parent
      onClose(); // Close the popup
    } catch (error) {
      setError('Failed to update object. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Edit Object</h2>
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
              {loading ? 'Updating...' : 'Update Object'}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditObjectPopup;
