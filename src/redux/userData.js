import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { updateBalance, addToBalance } from "../helpers";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    users: [
      {
        id: "fcb14202-bf8b-4f82-81b1-34491d4402e2",
        first: "John",
        last: "Doe",
        email: "test2@gmail.com",
        phone: "777-777-7771",
        balance: 0,
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
            id: 1,
            note: "car wash",
            status: "paid",
          },
        ],
      },
      {
        id: "8321c2f8-3007-11ee-be56-0242ac120002",
        first: "Jane",
        last: "Smith",
        email: "test@gmail.com",
        phone: "777-777-7777",
        balance: 5,
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
            id: 1,
            note: "car wash",
            status: "pending",
          },
        ],
      },
    ],
  },
  reducers: {
    editUser: (state, action) => {
      // find user and update account information - vehicles and purchases won't update here
      let foundIndex = state.users.findIndex((x) => x.id === action.payload.id);
      let currentUser = state.users[foundIndex];
      state.users[foundIndex] = {
        ...action.payload,
        vehicle_subs: currentUser.vehicle_subs,
        purchase_history: currentUser.purchase_history,
      };
    },
    addUser: (state, action) => {
      let users = state.users;
      // add new user to users arr - initialize with empty purchases and vehicles
      users.push({
        ...action.payload,
        id: uuidv4(),
        purchase_history: [],
        vehicle_subs: [],
      });
      // sort in alphabetical order for ease of display
      users.sort((a, b) => {
        if (a.last.toLowerCase() < b.last.toLowerCase()) {
          return -1;
        }
        if (a.last.toLowerCase() > b.last.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      state.users = users;
    },
    deleteUser: (state, action) => {
      // delete entire user
      let foundIndex = state.users.findIndex((x) => x.id === action.payload);
      state.users.splice(foundIndex, 1);
    },
    deleteVehicleSub: (state, action) => {
      //delete vehicile from a users vehicle arr
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
      //add vehicle to given user's vehicle arr
      let foundIndex = state.users.findIndex(
        (x) => x.id === action.payload.userId
      );
      if (state.users[foundIndex].vehicle_subs) {
        state.users[foundIndex].vehicle_subs.push({
          ...action.payload.newVehicle,
          id: uuidv4(),
        });
      } else {
        state.users[foundIndex].vehicle_subs = [
          { ...action.payload.newVehicle, id: uuidv4() },
        ];
      }
    },
    editVehicleSub: (state, { payload }) => {
      //edit a vehicle sub for a given user
      let foundIndex = state.users.findIndex((x) => x.id === payload.userId);
      let user = state.users[foundIndex];
      let foundVehicleIndex = user.vehicle_subs.findIndex(
        (x) => x.id === payload.editVehicle.id
      );
      user.vehicle_subs[foundVehicleIndex] = payload.editVehicle;
    },
    deletePurchaseHistory: (state, action) => {
      //delete a purchase from user's purchase arr
      let foundIndex = state.users.findIndex(
        (x) => x.id === action.payload.userId
      );
      let foundUser = state.users[foundIndex];
      let subs = state.users[foundIndex].purchase_history;
      let foundSubIndex = subs.findIndex((x) => x.id === action.payload.id);
      let foundPurchase = subs[foundSubIndex];

      //if balance pending was removed, take out of overall balance
      if (foundPurchase.status === "pending") {
        foundUser.balance =
          Number(foundUser.balance) - Number(foundPurchase.amount);
      }

      state.users[foundIndex].purchase_history.splice(foundSubIndex, 1);
    },
    editPurchaseHistory: (state, { payload }) => {
      //edit purchase item for given user
      let foundIndex = state.users.findIndex((x) => x.id === payload.userId);
      let user = state.users[foundIndex];
      let foundSubIndex = user.purchase_history.findIndex(
        (x) => x.id === payload.editPurchase.id
      );
      //update balance based on status changes
      let newBalance = updateBalance(
        payload.editPurchase,
        user.purchase_history[foundSubIndex],
        user.balance
      );
      user.balance = newBalance;
      user.purchase_history[foundSubIndex] = payload.editPurchase;
    },
    addPurchase: (state, action) => {
      let foundIndex = state.users.findIndex(
        (x) => x.id === action.payload.userId
      );
      //add new purchase to user
      if (state.users[foundIndex].purchase_history) {
        state.users[foundIndex].purchase_history.push({
          ...action.payload.newPurchase,
          id: uuidv4(),
        });
      } else {
        state.users[foundIndex].purchase_history = [
          {
            ...action.payload.newPurchase,
            id: uuidv4(),
          },
        ];
      }
      //update the balance with new payment if there is a pending charge
      if (action.payload.newPurchase.status === "pending") {
        let newBalance = addToBalance(
          action.payload.newPurchase,
          state.users[foundIndex].balance
        );
        state.users[foundIndex].balance = newBalance;
      }
    },
    transferVehicleSub: ({ users }, { payload }) => {
      //transfer a vehicle from one user to a different user
      const { currentUser, transferUser, vehicleId } = payload;
      let currentUserIndex = users.findIndex((x) => x.id === currentUser);
      let vehicleIndex = users[currentUserIndex].vehicle_subs.findIndex(
        (x) => x.id === vehicleId
      );
      let vehicle = users[currentUserIndex].vehicle_subs[vehicleIndex];
      users[currentUserIndex].vehicle_subs.splice(vehicleIndex, 1);
      let transferUserIndex = users.findIndex((x) => x.id === transferUser);
      if (users[transferUserIndex].vehicle_subs) {
        users[transferUserIndex].vehicle_subs.push(vehicle);
      } else {
        users[transferUserIndex].vehicle_subs = [vehicle];
      }
    },
  },
});

export const {
  editUser,
  deleteUser,
  deleteVehicleSub,
  addVehicleSub,
  editVehicleSub,
  deletePurchaseHistory,
  editPurchaseHistory,
  addPurchase,
  addUser,
  transferVehicleSub,
} = userDataSlice.actions;

export default userDataSlice.reducer;
