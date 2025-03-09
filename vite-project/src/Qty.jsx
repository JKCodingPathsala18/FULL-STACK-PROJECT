import axios from "axios";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Qty() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [size, setSize] = useState("");
  const [updateData, setUpdateData] = useState({ qid: null, size: "" });
  const [data, setData] = useState([]);

  // Fetch data from API
  const fetchData = () => {
    axios.get("http://localhost:3000/qty")
      .then((response) => {
        console.log("Fetched Data:", response.data);
        setData(response.data.qty || []);
      })
      .catch(error => console.error("Fetch Error:", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open/Close Dialog Handlers
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenUpdate = (item) => {
    setUpdateData(item);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  // Add Size Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = JSON.stringify({ size });

    axios.post("http://localhost:3000/qty", dt, {
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
      console.log("Add Response:", response);
      if (response.status === 200) {
        alert("Added Successfully!");
        fetchData();
        handleCloseAdd();
      }
    })
    .catch(error => {
      console.error("Error adding:", error);
      alert("Failed to Add");
    });
  };

  // Update Size Handler
  const handleUpdate = (e) => {
    e.preventDefault();
    const dt = JSON.stringify({ qid: updateData.qid, size: updateData.size });

    axios.put("http://localhost:3000/updateqty", dt, {
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
      console.log("Update Response:", response);
      if (response.status === 200) {
        alert("Updated Successfully!");
        fetchData();
        handleCloseUpdate();
      }
    })
    .catch(error => {
      console.error("Update Error:", error);
      alert("Update Failed");
    });
  };

  // Delete Size Handler
  const handleDelete = (id) => {
    axios.delete("http://localhost:3000/delqtyById", {
      data: { qid: id },
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => {
      console.log("Delete Response:", response);
      if (response.status === 200) {
        alert("Deleted Successfully!");
        fetchData();
      }
    })
    .catch(error => {
      console.error("Delete Error:", error);
      alert("Delete Failed");
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button variant="contained" color="primary" onClick={handleOpenAdd}>
        Add Size
      </Button>

      {/* Add Size Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Size</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Size Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Size</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Size"
            value={updateData.size}
            onChange={(e) =>
              setUpdateData({ ...updateData, size: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table for Sizes */}
      <TableContainer component={Paper} sx={{ maxWidth: "60%", margin: "20px auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>QID</strong></TableCell>
              <TableCell><strong>Size</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.qid}>
                <TableCell>{item.qid}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" sx={{ marginRight: "10px" }} onClick={() => handleOpenUpdate(item)}>
                    Update
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(item.qid)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Qty;
