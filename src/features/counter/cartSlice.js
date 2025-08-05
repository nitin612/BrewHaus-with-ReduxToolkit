import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const cartItems = createAsyncThunk('users/cartItems', async () => {
  try {
    const res = await api.post('/users/cart',
        {
            itemId : item._id,
            itemType : item.type,
        }
    );
    return res;     
  } catch (err) {
    console.log('something happend', err);
  }
});

const beansSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(cartItems.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cartItems.fulfilled, (state, action) => {
        console.log(action.payload, 'this is action.payload');
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(cartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export const { setSearchText } = beansSlice.actions;
export default beansSlice.reducer;
