import React, { useState } from "react";
import { addSchemas } from "./services/miscService";
import "../App.css";

const AddSchema = ({ bookId, onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    properties: [],
  });

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
          type: "",
          regex: "",
          required: false,
          defaultValue: "",
          description: "",
          minLength: 0,
          maxLength: 0,
          minValue: 0,
          maxValue: 0,
          allowedValues: [],
          customAttributes: {},
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
    e.preventDefault(); // Prevent default form submission behavior

    const propertiesMap = formData.properties.reduce((acc, property) => {
      acc[property.propertyName] = {
        type: property.type,
        regex: property.regex,
        required: property.required,
        defaultValue: property.defaultValue,
        description: property.description,
        minLength: property.minLength,
        maxLength: property.maxLength,
        minValue: property.minValue,
        maxValue: property.maxValue,
        allowedValues: property.allowedValues,
        customAttributes: property.customAttributes,
      };
      return acc;
    }, {});

    const newSchema = {
      name: formData.name,
      icon: formData.icon,
      propertiesMap: propertiesMap,
    };

    try {
      const response = await addSchemas(bookId,newSchema)

      if (!response.ok) {
        throw new Error("Failed to add schema");
      }

      const schemaData = await response.json();
      onAdd(schemaData); // Use the onAdd prop to update the parent component's state
      onClose(); // Close the popup
    } catch (error) {
      console.error("Error adding schema:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Add New Database Schema</h2>
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
          <div className="form-group">
            <label>Icon:</label>
            <input
              type="text"
              name="icon"
              required
              value={formData.icon}
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
                <label>Type:</label>
                <input
                  type="text"
                  name="type"
                  required
                  value={property.type}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Regex:</label>
                <input
                  type="text"
                  name="regex"
                  value={property.regex}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Required:</label>
                <input
                  type="checkbox"
                  name="required"
                  checked={property.required}
                  onChange={(e) => handlePropertyChange(index, { target: { name: "required", value: e.target.checked } })}
                />
                <label>Default Value:</label>
                <input
                  type="text"
                  name="defaultValue"
                  value={property.defaultValue}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Description:</label>
                <input
                  type="text"
                  name="description"
                  value={property.description}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Min Length:</label>
                <input
                  type="number"
                  name="minLength"
                  value={property.minLength}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Max Length:</label>
                <input
                  type="number"
                  name="maxLength"
                  value={property.maxLength}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Min Value:</label>
                <input
                  type="number"
                  name="minValue"
                  value={property.minValue}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Max Value:</label>
                <input
                  type="number"
                  name="maxValue"
                  value={property.maxValue}
                  onChange={(e) => handlePropertyChange(index, e)}
                />
                <label>Allowed Values:</label>
                <input
                  type="text"
                  name="allowedValues"
                  value={property.allowedValues.join(", ")}
                  onChange={(e) => handlePropertyChange(index, { target: { name: "allowedValues", value: e.target.value.split(", ") } })}
                />
                <button type="button" onClick={() => handleRemoveProperty(index)}>Remove Property</button>
              </div>
            ))}
            <button type="button" onClick={handleAddProperty}>Add Property</button>
          </div>

          <div className="button-group">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchema;
