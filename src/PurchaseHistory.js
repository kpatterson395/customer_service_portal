import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deletePurchaseHistory, editPurchaseHistory } from "./redux/userData";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
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

  //  const handleSubmit = () => {
  //    dispatch(
  //      addVehicleSub({
  //        userId: id,
  //        newVehicle: {
  //          make: newMake,
  //          model: newModel,
  //          licensePlateNo: newLicense,
  //        },
  //      })
  //    );
  //    setShowAdd(false);
  //    setNewMake("");
  //    setNewModel("");
  //    setNewLicense("");
  //  };

  const handleSubmitChanges = () => {
    dispatch(editPurchaseHistory({ userId: id, editPurchase }));
    setEditPurchase({});
  };

  const returnEditable = () => {
    return (
      <TableRow key={editPurchase.transactionId}>
        <TableCell>{editPurchase.transactionId}</TableCell>
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
            {user.purchase_history.map((p) => {
              if (p.transactionId === editPurchase.transactionId) {
                return returnEditable();
              }
              return (
                <TableRow key={p.transactionId}>
                  <TableCell>{p.transactionId}</TableCell>
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
                            purchaseID: p.transactionId,
                          })
                        )
                      }
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            {/* {showAdd && (
              <TableRow>
                <TableCell>
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Car make"
                    value={newMake}
                    onChange={(e) => setNewMake(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Car Model"
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                  />
                </TableCell>
                <TableCell align="right">
                  <TextField
                    required
                    size="small"
                    id="outlined-required"
                    label="Car License"
                    value={newLicense}
                    onChange={(e) => setNewLicense(e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={handleSubmit}>Add Vehicle</Button>
                  <Button color="error" onClick={() => setShowAdd(!showAdd)}>
                    Exit
                  </Button>
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PurchaseHistory;
