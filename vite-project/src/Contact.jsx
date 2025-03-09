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

function Contact() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");
  const [fid, setFid] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  // Fetch data from API
  function cntapi() {
    axios
      .get("http://localhost:3000/food_cat")
      .then((response) => {
        let ar = response.data.foodcat;
        setData(ar);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    cntapi(); // Fetch data on component mount
  }, []);

  // Open/Close handlers
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setFid("");
    setCategory("");
    setOpenAdd(false);
  };

  const handleOpenUpdate = (res) => {
    setFid(res.fid);
    setCategory(res.category);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  // Delete Function
  const del = (fid) => {
    axios
      .delete(`http://localhost:3000/delfoodcatById`, { data: { fid } }) // Sending `fid` in request body
      .then((response) => {
        if (response.status === 200) {
          alert("Deleted Successfully!");
          cntapi();
        }
      })
      .catch((error) => console.error("Error deleting record:", error));
  };

  // Add Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = { fid: fid, category: category };

    axios.post("http://localhost:3000/addfoodcat", dt).then((response) => {
      if (response.status === 200) {
        alert("Added Successfully!");
        cntapi();
        handleCloseAdd();
      } else {
        alert("Failed to Add");
      }
    });
  };

  // Update Function
  const handleUpdate = (e) => {
    e.preventDefault();
    const udt = { fid: fid, category: category };

    axios.put("http://localhost:3000/updatefoodcat", udt).then((response) => {
      if (response.status === 200) {
        alert("Updated Successfully!");
        cntapi();
        handleCloseUpdate();
      } else {
        alert("Update Failed");
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button variant="contained" color="primary" onClick={handleOpenAdd}>
        Add Category
      </Button>

      {/* Add Category Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Food Category</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="FID" type="number" value={fid} onChange={(e) => setFid(e.target.value)} />
          <TextField fullWidth margin="dense" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Update Category Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Food Category</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="FID" type="number" value={fid} disabled />
          <TextField fullWidth margin="dense" label="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Food Category Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "20px auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>FID</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((res) => (
              <TableRow key={res.fid}>
                <TableCell>{res.fid}</TableCell>
                <TableCell>{res.category}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" sx={{ marginRight: "10px" }} onClick={() => handleOpenUpdate(res)}>Update</Button>
                  <Button variant="contained" color="error" onClick={() => del(res.fid)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Contact;
