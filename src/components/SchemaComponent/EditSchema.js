import React, { useState, useEffect } from "react";
import { updateSchema } from "../services/miscService";
import "../../App.css";

const EditSchema = ({ bookId, schema, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: schema?.name || "",
    properties: [],
  });

  // Load existing properties from schema when the component mounts
  useEffect(() => {
    if (schema && schema.propertiesMap) {
      const properties = Object.keys(schema.propertiesMap).map((key) => ({
        propertyName: key,
        ...schema.propertiesMap[key],
      }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        properties,
      }));
    }
  }, [schema]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handlePropertyChange = (index, e) => {
    const { name, value } = e.target;
    const newProperties = [...formData.properties];
    newProperties[index] = { ...newProperties[index], [name]: value };
    setFormData((prevFormData) => ({ ...prevFormData, properties: newProperties }));
  };

  const handleAddProperty = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: [
        ...prevFormData.properties,
        {
          propertyName: "",
          type: "String",
          required: false,
          description: ""
        },
      ],
    }));
  };

  const handleRemoveProperty = (index) => {
    const newProperties = [...formData.properties];
    newProperties.splice(index, 1);
    setFormData((prevFormData) => ({ ...prevFormData, properties: newProperties }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const propertiesMap = formData.properties.reduce((acc, property) => {
      acc[property.propertyName] = {
        required: property.required,
        description: property.description,
      };
      return acc;
    }, {});

    const updatedSchema = {
      id:schema.id,
      name: formData.name,
      propertiesMap: propertiesMap,
    };

    try {
      const response = await updateSchema(bookId, schema.id, updatedSchema);
      onSave(updatedSchema); // Call the onUpdate prop to notify the parent component
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error updating schema:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Edit Database Schema</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group properties-group">
            <label>Properties:</label>
            {formData.properties.map((property, index) => (
              <div key={index} className="property-group">
                <label>Property Name:</label>
                <input
                  type="text"
                  name="propertyName"
                  required
                  value={property.propertyName}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label style={{ display: "inline-block", marginRight: "8px" }}>Required:</label>
                <input
                  type="checkbox"
                  name="required"
                  checked={property.required}
                  onChange={(e) => handlePropertyChange(index, { target: { name: "required", value: e.target.checked } })}
                />
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={property.description}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <button type="button" onClick={() => handleRemoveProperty(index)}>
                  Remove Property
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddProperty}>Add Property</button>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSchema;
