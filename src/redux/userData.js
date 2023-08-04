import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    users: [
      {
        id: "8321c2f8-3007-11ee-be56-0242ac120002",
        first: "Kristie",
        last: "Patterson",
        email: "test@gmail.com",
        phone: "7777777777",
        vehicle_subs: [
          {
            make: "Mazda",
            model: "cx5",
            licensePlateNo: "123ABC",
            id: "6794b415-3af9-43f0-ac05-8ae08192cda8",
          },
        ],
        purchase_history: [
          {
            date: new Date().toDateString(),
            amount: 5,
            transactionId: 1,
            note: "car wash",
          },
        ],
      },
      {
        id: "fcb14202-bf8b-4f82-81b1-34491d4402e2",
        first: "John",
        last: "Doe",
        email: "test2@gmail.com",
        phone: "7777777771",
        vehicle_subs: [
          {
            make: "Mazda",
            model: "cx5",
            licensePlateNo: "123ABC",
            id: "d72238af-1d60-4718-b8ec-ae4707440981",
          },
        ],
        purchase_history: [
          {
            date: new Date().toDateString(),
            amount: 5,
            transactionId: 1,
            note: "car wash",
          },
        ],
      },
    ],
  },
  reducers: {
    editUser: (state, action) => {
      let foundIndex = state.users.findIndex((x) => x.id === action.payload.id);
      state.users[foundIndex] = action.payload;
    },
    deleteUser: (state, action) => {
      let foundIndex = state.users.findIndex((x) => x.id === action.payload);
      state.users.splice(foundIndex, 1);
    },
    deleteVehicleSub: (state, action) => {
      let foundIndex = state.users.findIndex(
        (x) => x.id === action.payload.userId
      );
      let subs = state.users[foundIndex].vehicle_subs;
      let foundSubIndex = subs.findIndex(
        (x) => x.id === action.payload.vehicleId
      );
      state.users[foundIndex].vehicle_subs.splice(foundSubIndex, 1);
    },
    addVehicleSub: (state, action) => {
      let foundIndex = state.users.findIndex(
        (x) => x.id === action.payload.userId
      );
      state.users[foundIndex].vehicle_subs.push({
        ...action.payload.newVehicle,
        id: uuidv4(),
      });
    },
    editVehicleSub: (state, { payload }) => {
      let foundIndex = state.users.findIndex((x) => x.id === payload.userId);
      let user = state.users[foundIndex];
      let foundVehicleIndex = user.vehicle_subs.findIndex(
        (x) => x.id === payload.editVehicle.id
      );
      user.vehicle_subs[foundVehicleIndex] = payload.editVehicle;
    },
    deletePurchaseHistory: (state, action) => {
      let foundIndex = state.users.findIndex(
        (x) => x.id === action.payload.userId
      );
      let subs = state.users[foundIndex].purchase_history;
      let foundSubIndex = subs.findIndex(
        (x) => x.transactionId === action.payload.transactionId
      );
      state.users[foundIndex].purchase_history.splice(foundSubIndex, 1);
    },
    editPurchaseHistory: (state, { payload }) => {
      let foundIndex = state.users.findIndex((x) => x.id === payload.userId);
      let user = state.users[foundIndex];
      let foundSubIndex = user.purchase_history.findIndex(
        (x) => x.transactionId === payload.editPurchase.transactionId
      );
      console.log("found", user.purchase_history[foundSubIndex]);
      user.purchase_history[foundSubIndex] = payload.editPurchase;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  editUser,
  deleteUser,
  deleteVehicleSub,
  addVehicleSub,
  editVehicleSub,
  deletePurchaseHistory,
  editPurchaseHistory,
} = userDataSlice.actions;

export default userDataSlice.reducer;
