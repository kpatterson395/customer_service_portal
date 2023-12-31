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
import Tooltip from "@mui/material/Tooltip";
import DeleteConfirm from "./DeleteConfirm";
import EditableForm from "./EditableForm";
import AddFormRow from "./AddFormRow";
import { capitalizeFirst } from "./helpers";

const PurchaseHistory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userData);
  let user = users.find((x) => x.id === id);

  const [showAdd, setShowAdd] = useState(false);
  const [newAmount, setNewAmount] = useState(0);
  const [newNote, setNewNote] = useState("");
  const [newDate, setNewDate] = useState("2023-08-01");
  const [newStatus, setNewStatus] = useState("pending");
  const [editPurchase, setEditPurchase] = useState({});
  const [deleteId, setDeleteId] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = () => {
    dispatch(
      deletePurchaseHistory({
        userId: id,
        id: deleteId,
      })
    );
    setDeleteId();
  };

  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleSubmit = () => {
    dispatch(
      addPurchase({
        userId: id,
        newPurchase: {
          date: new Date(newDate).toDateString(),
          amount: newAmount,
          status: newStatus,
          note: newNote,
        },
      })
    );
    handleCancelAdd();
  };

  const handleSubmitChanges = () => {
    if (editPurchase.amount && editPurchase.note && editPurchase.date) {
      dispatch(editPurchaseHistory({ userId: id, editPurchase }));
      setEditPurchase({});
    }
  };

  const handleCancelAdd = () => {
    setShowAdd(false);
    setNewAmount(0);
    setNewNote("");
    setNewDate("");
    setNewStatus("pending");
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Payment Status</TableCell>
              <TableCell align="right">Payment Note</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.purchase_history &&
              user.purchase_history.map((p) => {
                if (p.id === editPurchase.id) {
                  return (
                    <EditableForm
                      key={p.id}
                      editItems={editPurchase}
                      setEditItems={setEditPurchase}
                      handleSubmitChanges={handleSubmitChanges}
                    />
                  );
                }
                return (
                  <TableRow key={p.id}>
                    <TableCell>{p.date}</TableCell>
                    <TableCell align="right">{p.amount}</TableCell>
                    <TableCell align="right">
                      {p.status === "pending" ? (
                        <em className="statusPending">
                          {capitalizeFirst(p.status)}
                        </em>
                      ) : (
                        <span className="statusPaid">
                          {capitalizeFirst(p.status)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="right">{p.note}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <EditIcon
                          className="clickable"
                          onClick={() => setEditPurchase(p)}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <DeleteIcon
                          className="clickable"
                          onClick={() => {
                            setDeleteId(p.id);
                            handleDeleteOpen();
                          }}
                        />
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {/* Show form to add purchase */}
            {showAdd && (
              <AddFormRow
                formType="Purchase"
                items={{
                  date: { value: newDate, fn: setNewDate },
                  amount: { value: newAmount, fn: setNewAmount },
                  status: { value: newStatus, fn: setNewStatus },
                  note: { value: newNote, fn: setNewNote },
                }}
                handleSubmit={handleSubmit}
                handleCancelAdd={handleCancelAdd}
              />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* show form to add purchase */}
      {!showAdd && (
        <div className="addItemButton" onClick={() => setShowAdd(true)}>
          <p>Add Purchase</p>
          <AddCircleOutlineIcon />
        </div>
      )}
      <DeleteConfirm
        open={deleteOpen}
        onClose={handleDeleteClose}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PurchaseHistory;
