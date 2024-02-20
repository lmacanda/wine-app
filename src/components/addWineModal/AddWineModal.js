// components/AddWineModal.js
import React, { useState } from "react";
import { Modal, Button, Box, Typography, TextField } from "@mui/material";
import { useWineContext } from "../../context/WineContext";

const AddWineModal = ({ isOpen, onClose }) => {
  const { addWine } = useWineContext();
  const [newWine, setNewWine] = useState({
    name: "",
    producer: "",
    year: "",
    region: "",
    grapes: "",
    color: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWine((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddWine = async () => {
    console.log(newWine);
    // Check if all required fields are filled
    if (
      newWine.name &&
      newWine.producer &&
      newWine.year &&
      newWine.region &&
      newWine.grapes &&
      newWine.color
    ) {
      // Call addWine function to add the new wine
      addWine(newWine);

      // Close the modal
      onClose();
    } else {
      // Handle validation or display an error message
      console.error("Please fill in all required fields");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6">Add New Wine</Typography>
        <TextField
          label="Name"
          name="name"
          value={newWine.name}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Producer"
          name="producer"
          value={newWine.producer}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Year"
          name="year"
          value={newWine.year}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Region"
          name="region"
          value={newWine.region}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Grapes"
          name="grapes"
          value={newWine.grapes}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Color"
          name="color"
          value={newWine.color}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />

        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddWine} color="primary">
          Add Wine
        </Button>
      </Box>
    </Modal>
  );
};

export default AddWineModal;
