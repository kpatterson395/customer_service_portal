import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  deletePurchaseHistory,
  editPurchaseHistory,
  addPurchase,
} from "./redux/userData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const PurchaseHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [showAdd, setShowAdd] = useState(false);
  const [newAmount, setNewAmount] = useState(0);
  const [newNote, setNewNote] = useState("");
  const [newDate, setNewDate] = useState("");
  const [editPurchase, setEditPurchase] = useState({});

  const handleSubmit = () => {
    dispatch(
      addPurchase({
        userId: id,
        newPurchase: {
          amount: newAmount,
          note: newNote,
          date: new Date(newDate).toDateString(),
        },
      })
    );
    setShowAdd(false);
    setNewAmount(0);
    setNewNote("");
    setNewDate("");
  };

  const handleSubmitChanges = () => {
    dispatch(editPurchaseHistory({ userId: id, editPurchase }));
    setEditPurchase({});
  };

  const returnEditable = () => {
    return (
      <TableRow key={editPurchase.id}>
        <TableCell>{editPurchase.id}</TableCell>
        <TableCell>
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Date"
            value={editPurchase.date}
            onChange={(e) =>
              setEditPurchase({ ...editPurchase, make: e.target.value })
            }
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Amount"
            type="number"
            value={editPurchase.amount}
            onChange={(e) =>
              setEditPurchase({ ...editPurchase, model: e.target.value })
            }
          />
        </TableCell>
        <TableCell align="right">
          <TextField
            required
            size="small"
            id="outlined-required"
            label="Purchase Note"
            value={editPurchase.note}
            onChange={(e) =>
              setEditPurchase({
                ...editPurchase,
                note: e.target.value,
              })
            }
          />
        </TableCell>
        <TableCell>
          <Button onClick={handleSubmitChanges}>Submit Changes</Button>
          <Button color="error" onClick={() => setEditPurchase({})}>
            Cancel
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Payment Note</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.purchase_history &&
              user.purchase_history.map((p) => {
                if (p.id === editPurchase.id) {
                  return returnEditable();
                }
                return (
                  <TableRow key={p.id}>
                    <TableCell>{p.id}</TableCell>
                    <TableCell align="right">{p.date}</TableCell>
                    <TableCell align="right">{p.amount}</TableCell>
                    <TableCell align="right">{p.note}</TableCell>
                    <TableCell>
                      <EditIcon
                        className="clickable"
                        onClick={() => setEditPurchase(p)}
                      />
                      <DeleteIcon
                        className="clickable"
                        onClick={() =>
                          dispatch(
                            deletePurchaseHistory({
                              userId: id,
                              id: p.id,
                            })
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            {showAdd && (
              <TableRow>
                <TableCell>{""}</TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    type="date"
                    size="small"
                    id="outlined-required"
                    label=""
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    size="small"
                    type="number"
                    id="outlined-required"
                    label="Amount"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Purchase Note"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={handleSubmit}>Add transaction</Button>
                  <Button color="error" onClick={() => setShowAdd(!showAdd)}>
                    Exit
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="clickable plus">
        {!showAdd && (
          <AddCircleOutlineIcon onClick={() => setShowAdd(!showAdd)} />
        )}
      </div>
    </div>
  );
};

export default PurchaseHistory;
