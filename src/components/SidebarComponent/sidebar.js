import React, { useEffect, useState } from 'react';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddSchema from '../SchemaComponent/AddSchema'; // Adjust the import path
import EditSchema from '../SchemaComponent/EditSchema'; // Adjust the import path
import AddObjectPopup from './addObjectPopup'; // Adjust the import path
import { fetchBookById } from "../services/bookService"; // Adjust the import path
import { fetchObjectsInSchema, updateSchema, deleteSchema, updateObjectInSchema, deleteObjectInSchema } from "../services/miscService"; // Adjust the import path
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "./sidebar.css";
import EditObjectPopup from './editObject';

const Sidebar = ({ bookId }) => {
  const [showAddSchemaPopup, setShowAddSchemaPopup] = useState(false);
  const [showEditSchemaPopup, setShowEditSchemaPopup] = useState(false);
  const [showEditObjectPopup, setShowEditObjectPopup] = useState(false); 
  const [schemaToEdit, setSchemaToEdit] = useState(null); 
  const [objectToEdit, setObjectToEdit] = useState(null);
  const [showAddObjectPopup, setShowAddObjectPopup] = useState(false);
  const [book, setBook] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [schemaObjects, setSchemaObjects] = useState([]);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteType, setDeleteType] = useState(''); // 'schema' or 'object'

  // Fetch book details when the component mounts or when the bookId changes
  const fetchBook = async () => {
    try {
      const data = await fetchBookById(bookId);
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
    }
  };

  const handleAddObject = (newObject) => {
    setSchemaObjects((prev) => [...prev, newObject]);
  };

  useEffect(() => {
    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  // Handle adding a new schema to the book's schema list
  const handleAddSchema = (newSchema) => {
    setBook((prevBook) => ({
      ...prevBook,
      dynamicDbSchemaList: [
        ...(prevBook.dynamicDbSchemaList || []),
        newSchema,
      ],
    }));
  };

  // Handle schema update after editing
  const handleEditSchema = (updatedSchema) => {
    try {
      setBook((prevBook) => ({
        ...prevBook,
        dynamicDbSchemaList: prevBook.dynamicDbSchemaList.map(schema =>
          schema.id === updatedSchema.id ? updatedSchema : schema
        ),
      }));
      setShowEditSchemaPopup(false);
      setSchemaToEdit(null);
    } catch (error) {
      console.error("Error updating schema:", error);
    }
  };

  const handleEditObject = () => {
    try {
      handleSchemaClick(selectedSchema)
      setShowEditObjectPopup(false);
      setObjectToEdit(null);
    } catch (error) {
      console.error("Error updating schema:", error);
    }
  };

  // Fetch objects inside the selected schema
  const fetchSchemaObjects = async (schemaId) => {
    try {
      const objects = await fetchObjectsInSchema(schemaId);
      setSchemaObjects(objects);
    } catch (error) {
      console.error("Error fetching objects in schema:", error);
    }
  };

  // Handle schema click to fetch and show objects inside the schema
  const handleSchemaClick = (schema) => {
    setSelectedSchema(schema);
    fetchSchemaObjects(schema.id);
  };

  // Handle back button click to go back to schema list
  const handleBackClick = () => {
    setSelectedSchema(null);
    setSchemaObjects([]);
  };

  // Open confirm dialog
  const handleOpenConfirmDialog = (type, targetId) => {
    setDeleteType(type);
    setDeleteTarget(targetId);
    setConfirmDialogOpen(true);
  };

  // Close confirm dialog
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setDeleteTarget(null);
    setDeleteType('');
  };

  // Handle delete confirmed
  const handleConfirmDelete = async () => {
    if (deleteType === 'schema') {
      try {
        await deleteSchema(bookId, deleteTarget);
        setBook((prevBook) => ({
          ...prevBook,
          dynamicDbSchemaList: prevBook.dynamicDbSchemaList.filter(schema => schema.id !== deleteTarget),
        }));
      } catch (error) {
        console.error("Error deleting schema:", error);
      }
    } else if (deleteType === 'object') {
      try {
        await deleteObjectInSchema(deleteTarget);
        setSchemaObjects((prevObjects) => prevObjects.filter(object => object.id !== deleteTarget));
      } catch (error) {
        console.error("Error deleting object:", error);
      }
    }
    handleCloseConfirmDialog();
  };

  return (
    <div className="sidebar">
      {showAddSchemaPopup && (
        <AddSchema
          bookId={bookId}
          onAdd={handleAddSchema}
          onClose={() => setShowAddSchemaPopup(false)}
        />
      )}

      {showEditSchemaPopup && schemaToEdit && (
        <EditSchema
          bookId={bookId}
          schema={schemaToEdit}
          onSave={handleEditSchema}
          onClose={() => setShowEditSchemaPopup(false)}
        />
      )}
      {showEditObjectPopup && objectToEdit && (
        <EditObjectPopup
          schema={selectedSchema}
          object = {objectToEdit}
          onSave={handleEditObject}
          onClose={() => setShowEditObjectPopup(false)}
        />
      )}

      {showAddObjectPopup && (
        <AddObjectPopup
          schema={selectedSchema}
          onAdd={handleAddObject}
          onClose={() => setShowAddObjectPopup(false)}
        />
      )}

      <div className="vertical-icons">
        <div className="db-schema-heading">
          {selectedSchema ? (
            <>
              <IconButton style={{ align: "left" }} onClick={handleBackClick}>
                <ArrowBackIcon />
              </IconButton>
              {selectedSchema.name}
            </>
          ) : (
            "Databases"
          )}
        </div>

        {!selectedSchema && (
          <>
            <IconButton onClick={() => setShowAddSchemaPopup(true)} style={{ color: "#257ce0" }}>
            <AddIcon /> New Database
          </IconButton>


            {book && book.dynamicDbSchemaList && book.dynamicDbSchemaList.map((dbSchema, index) => (
              <div key={index} className="db-schema-item" onClick={() => handleSchemaClick(dbSchema)}>
                <span>{dbSchema.name}</span>
                <div className="schema-buttons">
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      setSchemaToEdit(dbSchema);
                      setShowEditSchemaPopup(true);
                    }}
                    aria-label="edit"
                    size="large"
                    sx={{ color: 'green' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenConfirmDialog('schema', dbSchema.id);
                    }}
                    aria-label="delete"
                    color="error"
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </>
        )}

        {selectedSchema && (
          <>
            <IconButton onClick={() => setShowAddObjectPopup(true)}>
              <AddIcon /> Add Object
            </IconButton>

            {schemaObjects.map((object) => (
              <div key={object.id} className="schema-object-item">
                <div>
                  {Object.entries(object.data).map(([key, value]) => (
                    <p key={key}><strong>{key}:</strong> {value}</p>
                  ))}
                </div>
                <div className="schema-buttons">
                  <IconButton
                    onClick={() =>{
                      setObjectToEdit(object);
                      setShowEditObjectPopup(true);
                    }}
                    aria-label="edit"
                    size="large"
                    sx={{ color: 'green' }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleOpenConfirmDialog('object', object.id)}
                    aria-label="delete"
                    color="error"
                    size="large"
                  >
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {deleteType === 'schema'
              ? "Are you sure you want to delete this schema?"
              : "Are you sure you want to delete this object?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Sidebar;
