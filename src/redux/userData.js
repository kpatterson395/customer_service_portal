import { createSlice } from "@reduxjs/toolkit";

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
          },
        ],
        purchase_history: [
          {
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
          },
        ],
        purchase_history: [
          {
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
      let found = state.users.findIndex((x) => x.id === action.payload.id);
      state.users[found] = action.payload;
    },
    deleteUser: (state, action) => {
      let found = state.users.findIndex((x) => x.id === action.payload);
      state.users.splice(found, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { editUser, deleteUser } = userDataSlice.actions;

export default userDataSlice.reducer;
