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

function Menu() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [mnm, setMn] = useState("");
  const [prz, setPrz] = useState(0);
  const [fid, setFid] = useState(0);
  const [qid, setQid] = useState(0);
  const [mid, setMid] = useState(null);
  const [data, setData] = useState([]);

  // Open/Close handlers
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const handleOpenUpdate = (res) => {
    setMid(res.mid);
    setMn(res.mname);
    setPrz(res.price);
    setFid(res.fid);
    setQid(res.qid);
    setOpenUpdate(true);
  };
  const handleCloseUpdate = () => setOpenUpdate(false);

  function cntapi() {
    axios.get("http://localhost:3000/menu").then((response) => {
      let ar = response.data.menu;
      setData(ar);
    });
  }

  useEffect(() => {
    cntapi();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = { mname: mnm, price: prz, fid: fid, qid: qid };

    axios.post("http://localhost:3000/addmenu", dt).then((response) => {
      if (response.status === 200) {
        alert("Added Successfully!");
        cntapi();
        handleCloseAdd();
      } else {
        alert("Failed to Add");
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const udt = { mid: mid, mname: mnm, price: prz, fid: fid, qid: qid };

    axios.put("http://localhost:3000/updatemenu", udt).then((response) => {
      if (response.status === 200) {
        alert("Updated Successfully!");
        cntapi();
        handleCloseUpdate();
      } else {
        alert("Update Failed");
      }
    });
  };

  const del = (id) => {
    axios.delete(`http://localhost:3000/delmenuById/${id}`).then((response) => {
      if (response.status === 200) {
        alert("Deleted Successfully!");
        cntapi();
      }
    });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button variant="contained" color="primary" onClick={handleOpenAdd}>
        Add Menu
      </Button>

      {/* Add Menu Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add Menu Item</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Menu Name" value={mnm} onChange={(e) => setMn(e.target.value)} />
          <TextField fullWidth margin="dense" label="Price" type="number" value={prz} onChange={(e) => setPrz(e.target.value)} />
          <TextField fullWidth margin="dense" label="Fid" type="number" value={fid} onChange={(e) => setFid(e.target.value)} />
          <TextField fullWidth margin="dense" label="Qid" type="number" value={qid} onChange={(e) => setQid(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="secondary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Update Menu Dialog */}
      <Dialog open={openUpdate} onClose={handleCloseUpdate}>
        <DialogTitle>Update Menu Item</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Menu Name" value={mnm} onChange={(e) => setMn(e.target.value)} />
          <TextField fullWidth margin="dense" label="Price" type="number" value={prz} onChange={(e) => setPrz(e.target.value)} />
          <TextField fullWidth margin="dense" label="Fid" type="number" value={fid} onChange={(e) => setFid(e.target.value)} />
          <TextField fullWidth margin="dense" label="Qid" type="number" value={qid} onChange={(e) => setQid(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate} color="secondary">Cancel</Button>
          <Button onClick={handleUpdate} color="primary" variant="contained">Update</Button>
        </DialogActions>
      </Dialog>

      {/* Menu Table */}
      <TableContainer component={Paper} sx={{ maxWidth: "80%", margin: "20px auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Mid</strong></TableCell>
              <TableCell><strong>Menu Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Fid</strong></TableCell>
              <TableCell><strong>Qid</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((res) => (
              <TableRow key={res.mid}>
                <TableCell>{res.mid}</TableCell>
                <TableCell>{res.mname}</TableCell>
                <TableCell>${res.price}</TableCell>
                <TableCell>{res.fid}</TableCell>
                <TableCell>{res.qid}</TableCell>
                <TableCell>
                  <Button variant="contained" color="warning" sx={{ marginRight: "10px" }} onClick={() => handleOpenUpdate(res)}>Update</Button>
                  <Button variant="contained" color="error" onClick={() => del(res.mid)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Menu;
