// Redux slices
import { configureStore } from '@reduxjs/toolkit';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define transactions slice
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    addTransaction: (state, action) => {
      state.push(action.payload);
    },
    editTransaction: (state, action) => {
      const index = state.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteTransaction: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    }
  }
});
export const { addTransaction, editTransaction, deleteTransaction } = transactionsSlice.actions;

// Define categories slice
const categoriesSlice = createSlice({
  name: 'categories',
  initialState: ['Food', 'Rent', 'Entertainment', 'Utilities', 'Others'],
  reducers: {}
});

// Define budget slice
const budgetSlice = createSlice({
  name: 'budget',
  initialState: { monthlyBudget: 0, spent: 0 },
  reducers: {
    setBudget: (state, action) => {
      state.monthlyBudget = action.payload;
    },
    updateSpent: (state, action) => {
      state.spent = action.payload;
    }
  }
});
export const {setBudget,updateSpent}=budgetSlice.actions;

// Create the async thunk for fetching exchange rates
export const fetchExchangeRates = createAsyncThunk(
  'exchangeRates/fetch',
  async () => {
    const response = await axios.get('https://v6.exchangerate-api.com/v6/bc369b23c05070926d7dcad1/latest/USD');
    return response.data;
  }
);

// Define exchange rates slice
const exchangeRatesSlice = createSlice({
  name: 'exchangeRates',
  initialState: { rates: {}, status: 'idle', error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExchangeRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rates = action.payload.conversion_rates;
      })
      .addCase(fetchExchangeRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Create and export the Redux store
export  const store = configureStore({
  reducer: {
    transactions: transactionsSlice.reducer,
    categories: categoriesSlice.reducer,
    budget: budgetSlice.reducer,
    exchangeRates: exchangeRatesSlice.reducer
  }
});
