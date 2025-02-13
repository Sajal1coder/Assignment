import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  totalIncome: 0,
  totalExpenses: 0,
  savings: 0,
  transactions: [],
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      const { type, amount, category } = action.payload;
      const transaction = { id: nanoid(), type, amount, category };

      state.transactions.push(transaction);

      if (type === "income") {
        state.totalIncome += amount;
      } else if (type === "expense") {
        state.totalExpenses += amount;
      }

      state.savings = state.totalIncome - state.totalExpenses;
    },

    editTransaction: (state, action) => {
      const { id, newAmount, newCategory } = action.payload;
      const transaction = state.transactions.find((t) => t.id === id);

      if (transaction) {
        // Adjust total values before updating
        if (transaction.type === "income") {
          state.totalIncome -= transaction.amount;
          state.totalIncome += newAmount;
        } else if (transaction.type === "expense") {
          state.totalExpenses -= transaction.amount;
          state.totalExpenses += newAmount;
        }

        // Update transaction
        transaction.amount = newAmount;
        transaction.category = newCategory;

        // Recalculate savings
        state.savings = state.totalIncome - state.totalExpenses;
      }
    },

    deleteTransaction: (state, action) => {
      const id = action.payload;
      const transaction = state.transactions.find((t) => t.id === id);

      if (transaction) {
        if (transaction.type === "income") {
          state.totalIncome -= transaction.amount;
        } else if (transaction.type === "expense") {
          state.totalExpenses -= transaction.amount;
        }

        state.transactions = state.transactions.filter((t) => t.id !== id);
        state.savings = state.totalIncome - state.totalExpenses;
      }
    },
  },
});

export const { addTransaction, editTransaction, deleteTransaction } = financeSlice.actions;
export default financeSlice.reducer;
