import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBeansData } from '../../api/Beans';
import { getCoffeeData } from '../../api/Coffee';

export const fetchBeans = createAsyncThunk('users/fetchBeans', async () => {
  try {
    const data = await getBeansData();
    console.log('Fetched Beans:', data);
    return data;
  } catch (err) {
    console.log('something happend', err);
  }
});
export const fetchCoffee = createAsyncThunk('users/fetchCoffee', async () => {
  try {
    const data = await getCoffeeData();
    console.log('Fetched Beans:', data);
    return data;
  } catch (err) {
    console.log('something happend', err);
  }
});

const beansSlice = createSlice({
  name: 'beans',
  initialState: {
    beansList: [],
    coffeeList:[],
    loading: false,
    error: null,
    searchText: '',
  },
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBeans.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBeans.fulfilled, (state, action) => {
        console.log(action.payload, 'this is action.payload');
        state.loading = false;
        state.beansList = action.payload;
      })
      .addCase(fetchBeans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCoffee.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoffee.fulfilled, (state, action) => {
        console.log(action.payload, 'this is action.payload');
        state.loading = false;
        state.coffeeList = action.payload;
      })
      .addCase(fetchCoffee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSearchText } = beansSlice.actions;
export default beansSlice.reducer;
